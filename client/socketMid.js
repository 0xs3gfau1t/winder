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
		}
		return next(action)
	}
}

export default function (store) {
	socket.on("chat", data => {
		store.dispatch(liveActions.chatUpdate(data))
	})
	socket.on("notification", data => {
		store.dispatch(liveActions.notiUpdate(data))
	})
}
