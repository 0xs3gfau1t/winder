import io, { Socket } from "socket.io-client"
import * as Actions from "./actions/socket"

const socket = io(process.env.URL, {
	autoConnect: false,
	withCredentials: true,
})

export function wsMiddleware() {
	return next => action => {
		if (action.type === "CONNECT") {
			socket.connect()
			console.log(socket.id)
		}
		return next(action)
	}
}

export default function (store) {
	// if (socket.disconnected)
	socket.on("chat", data => {
		console.log("Chat Received")
		// store.dispatch(Actions.apiGotData(data))
	})
}
