const { verifyToken } = require("../Utils/jwtUtil")
const { io } = require("../Config/app")

// Map with keys as user_id and values as socket_id
var acitveUsers = new Map()

const onConnectionHandler = socket => {
	console.log(`New client connected with socket id: ${socket.id}`)

	socket.on("addUser", (payload, callback) => {
		const token = payload.token
		const { data, expired } = verifyToken(token)
		if (!expired && data) {
			acitveUsers.set(data._id, socket.id)
			console.log(`User ${data._id} added to activeUsers list.`)
			callback({ success: true })
		} else {
			console.error(
				`Failed to add User ${data._id} to activeUser list due to failed authorization.`
			)
			callback({ success: false })
		}
	})

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

const emitChat = (receiverId, _id, content, createdAt) => {
	const receiverSocketId = acitveUsers[receiverId.toString()]
	if (receiverSocketId) {
		io.to(receiverSocketId).emit("chat", {
			_id,
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
