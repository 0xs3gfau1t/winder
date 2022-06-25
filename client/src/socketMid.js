import io, { Socket } from "socket.io-client"
import * as Actions from "./actions/socket"

let socket = null

export function wsMiddleware() {
	return next => action => {
		if (!socket && action.type === "CONNECT") {
			socket = Socket ? Socket : io.connect(process.env.URL)
		}
		return next(action)
	}
}

export default function (store) {
	socket = socket ? socket : io.connect(process.env.URL)
	console.log("Listening")
	socket.on("chat", data => {
		console.log("Chat Received")
		// store.dispatch(Actions.apiGotData(data))
	})
}
