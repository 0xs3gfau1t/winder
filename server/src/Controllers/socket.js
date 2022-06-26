const { verifyToken } = require("../Utils/jwtUtil")
const { io } = require("../Config/app")

// Map with keys as user_id and values as socket_id
var acitveUsers = new Map()

const onConnectionHandler = socket => {
	console.log(`New client connected with socket id: ${socket.id}`)
	const cookie = `; ${socket.handshake.headers.cookie}`
	const token = cookie.split("; accessToken=").pop().split(";").shift()
	const { data, expired } = verifyToken(token)
	if (!expired && data) {
		acitveUsers.set(data._id, socket.id)
		console.log(`User ${data._id} added to activeUsers list.`)
	} else {
		console.error(
			`Failed to add User to activeUser list due to failed authorization.`
		)
		socket.disconnect(true)
	}

	socket.on("disconnect", payload => {
		try {
			var uid = null
			for (let [key, value] of acitveUsers) {
				if (value === socket.id) {
					uid = key
					break
				}
			}
			acitveUsers.delete(uid)
			console.log(`User ${uid} removed from activeUsers list`)
		} catch (err) {
			console.log(`Failed to remove User ${uid} from activeUsers list`)
			console.log(err.message)
		}
	})
}

const emitChat = (receiverId, msgId, senderId, content, createdAt) => {
	const receiverSocketId = acitveUsers.get(receiverId.toString())
	console.log("Receiver user id", receiverId)
	console.log("Receiver socket id", receiverSocketId)
	if (receiverSocketId) {
		io.to(receiverSocketId).emit("chat", {
			msgId,
			senderId,
			content,
			createdAt,
		})
	}
}

const emitNoti = (receiverId, _id, title, type) => {
	const receiverSocketId = acitveUsers[receiverId.toString()]
	if (receiverSocketId) {
		io.to(receiverSocketId).emit("notification", {
			_id,
			title,
			type,
		})
		return "Delivered"
	}
	return "Sent"
}

module.exports = { onConnectionHandler, acitveUsers, emitChat, emitNoti }
