import io, { Socket } from "socket.io-client"
import * as liveActions from "./actions/live"

const socket = io("/", {
    path: "/windersock/",
	autoConnect: false,
	withCredentials: true,
})

export function wsMiddleware() {
	return next => action => {
		if (action.type === "CONNECT") {
			socket.connect()
			// console.log(socket.id)
		}
		return next(action)
	}
}

export default function (store) {
	// if (socket.disconnected)
	socket.on("chat", data => {
		// console.log("Chat Received")
		// console.log("Data", data)
		store.dispatch(liveActions.chatUpdate(data))
	})
	socket.on("notification", data => {
		console.log("Notification Received")
		console.log("Data", data)
		store.dispatch(liveActions.notiUpdate(data))
	})
}
