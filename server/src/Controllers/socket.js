const { verifyToken } = require("../Utils/jwtUtil")

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
			console.error(`Failed to add User ${data._id} to activeUser list due to failed authorization.`)
			callback({ success: false })
		}
	})

	socket.on("chat", (payload, callback) => {
		const receiverSock = acitveUsers.get(payload.receiver)
		if (receiverSock !== undefined) {
			delete payload.receiver
			socket.to(receiverSock).emit("chat", payload)
			console.log(`Message forwared to User ${payload.receiver}.`)
			callback({ status: "delivered" })
		}
		console.log(`User ${payload._id} is offline.`)
		callback({ status: "sent" })
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

module.exports = { onConnectionHandler }
