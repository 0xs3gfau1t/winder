const { messagesModel, relationModel } = require("../Models/relationModel")
const { userModel } = require("../Models/userModel")
const { emitChat } = require("./socket")

const getConvoList = async (req, res) => {
	try {
		const convoList = await relationModel.find(
			{ users: req.userdata._id, stat: true },
			{ users: 1, unreadCount: 1 }
		)

		const data = {}
		for (let convo of convoList) {
			const userIdx =
				req.userdata._id === convo.users[0].toString() ? 1 : 0

			const user = await userModel.findOne(
				{ _id: convo.users[userIdx] },
				["firstName", "lastName", "images"]
			)

			// DONOT REMOVE THIS
			// if (convo.unreadCount > 0) {
			// 	unreadCount =
			// 		userIdx === 1 ? -convo.unreadCount : convo.unreadCount
			// } else if (convo.unreadCount < 0) {
			// 	unreadCount =
			// 		userIdx === 0 ? convo.unreadCount : -convo.unreadCount
			// } else {
			// 	unreadCount = 0
			// }
			const unreadCount =
				(convo.unreadCount > 0 && userIdx === 1) ||
				(convo.unreadCount < 0 && userIdx === 1)
					? -convo.unreadCount
					: convo.unreadCount

			data[convo._id.toString()] = {
				userId: convo.users[userIdx].toString(),
				userDp: user.images[0],
				userName: user.firstName + " " + user.lastName,
				unreadCount,
			}
		}

		res.json({
			success: true,
			data,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
}

const getMessages = async (req, res) => {
	const { id } = req.params // Relation id
	var { cursor } = req.query

	if (cursor) {
		cursor = new Date(cursor)
		// https://stackoverflow.com/a/1353711/13001607
		// Bhagwan tumara bhala karega if you could simplify this expression
		// Probably (!(cursor instance of Date) || isNan(cursor))
		if (!(cursor instanceof Date && !isNaN(cursor)))
			return res
				.status(400)
				.json({ success: false, error: "Invalid cursor." })
	}

	const paginationMatch = cursor ? { createdAt: { $lte: cursor } } : {}

	try {
		var relation = await relationModel
			.findOne(
				{ _id: id, stat: true, users: req.userdata._id },
				{ messages: 1, users: 1, unreadCount: 1 }
			)
			.populate({
				path: "messages",
				select: ["content", "sender", "createdAt"],
				match: paginationMatch,
				options: { limit: 11, sort: { createdAt: -1 } },
			})

		if (!relation) {
			return res.status(400).json({
				success: false,
				error: "No such relation found.",
			})
		}

		// Updating the unreadCount
		const userIdx =
			req.userdata._id === relation.users[1].toString() ? 1 : 0
		if (
			(userIdx === 0 && relation.unreadCount < 0) || // if there is unread msg sent by user[1] and user[0] read them
			(userIdx === 1 && relation.unreadCount > 0) // if there is unread msg sent by user[0] and user[1] read them
		)
			await relation.updateOne({ unreadCount: 0 })

		// Setting next pagination token
		const more = relation.messages.length === 11
		const nextCursor = more ? relation.messages[10].createdAt : undefined
		more && relation.messages.pop()

		res.json({
			success: true,
			nextCursor,
			data: relation.messages.map(msg => ({
				...msg._doc, // Document is stored in this property
				sender: userIdx == msg._doc.sender,
			})),
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
}

const sendMessage = async (req, res) => {
	const { id } = req.params // relation id
	const { content } = req.body
	try {
		var relation = await relationModel.findOne({ _id: id, stat: true }, [
			"messages",
			"users",
			"unreadCount",
		])

		if (!relation) {
			return res.status(500).json({
				success: false,
				error: "No relation exists with this user.",
			})
		}
		// Create new message document and insert into the relation.messages list
		const sender = relation.users[1].toString() === req.userdata._id
		const msg = new messagesModel({ content, sender })
		await msg.save()
		relation.messages.push(msg._id)

		// Send the message to the receiver through socket
		const status = emitChat(
			relation.users[0].toString(),
			msg._id,
			req.userdata._id,
			content,
			msg.createdAt
		)

		// Update the unreadCount
		const userIdx =
			req.userdata._id === relation.users[1].toString() ? 1 : 0
		if (userIdx === 0 && relation.unreadCount >= 0)
			// if user[1] still has some unread message from user[0]
			relation.unreadCount += 1
		else if (userIdx === 1 && relation.unreadCount <= 0)
			// if user[0] still has some unread message from user[1]
			relation.unreadCount -= 1

		await relation.save()
		res.json({ success: true, id: msg._id, status })
	} catch (err) {
		console.log(err)
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
}

module.exports = { getConvoList, getMessages, sendMessage }
