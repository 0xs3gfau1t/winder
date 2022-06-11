const { messagesModel, relationModel } = require("../Models/relationModel")

const getConvoList = async (req, res) => {
	try {
		const convoList = await relationModel.find(
			{ users: req.userdata._id },
			{ users: 1, stat: 1, unreadCount: 1 }
		)
		res.json({ success: true, data: convoList })
	} catch (err) {
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
}

const getMessages = async (req, res) => {
	const { id } = req.params
	try {
		const relation = await relationModel
			.findOne(
				{ users: { $all: [req.userdata._id, id], stat: 0 } },
				{ messages: 1, unreadCount: 1 }
			)
			.populate("messages")
		res.json({ success: true, data: relation.messages })
	} catch (err) {
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
}

const sendMessage = async (req, res) => {
	const { id } = req.params
	const { content } = req.body
	try {
		var relation = await relationModel.findOne({
			users: { $all: [req.userdata._id, id], stat: 0 },
		})
		const msg = new messagesModel({ content, sender: req.userdata._id })
		await msg.save()
		relation.messages.push(msg._id)
		await relation.save()
	} catch (err) {
		res.status(500).json({ success: false, error: "Internal Server Error" })
	}
	res.json({ success: true, id })
}

module.exports = { getConvoList, getMessages, sendMessage }
