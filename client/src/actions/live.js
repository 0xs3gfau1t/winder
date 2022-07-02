import axios from "axios"
import {
	FETCH_CHAT,
	CHAT_UPDATE,
	NOTI_UPDATE,
	FETCH_ACTIVE_CHAT,
	SEND_MESSAGE,
	SET_LOADING,
	SET_LIVE_COUNT,
} from "./types"
const URL = process.env.URL

export function connect() {
	return { type: "CONNECT" }
}

export const chatUpdate = data => (dispatch, getState) => {
	// console.log("Chat update action")
	dispatch({ type: CHAT_UPDATE, payload: data })
	const activeChat = getState().live.activeChat.id

	if (data.senderId === activeChat) {
		dispatch({
			type: FETCH_ACTIVE_CHAT,
			payload: [data],
			id: data.senderId,
			live: true,
		})
	}
}

export const notiUpdate = data => dispatch => {
	console.log("Notification update.")
	dispatch({ type: NOTI_UPDATE, payload: data })
}

export const fetchChats = () => dispatch => {
	axios
		.get(URL + "/messages", { withCredentials: true })
		.then(res => {
			dispatch({ type: SET_LIVE_COUNT, payload: { chat: 0 } })
			dispatch({
				type: FETCH_CHAT,
				payload: res.data.data,
			})
		})
		.catch(err => {
			dispatch(console.log(err))
		})
}

export const fetchActiveChat =
	(id, cur = "") =>
	dispatch => {
		// console.log(id, cur)
		dispatch({ type: SET_LOADING })
		axios
			.get(URL + "/messages" + `/${id}?cursor=${cur}`, {
				withCredentials: true,
			})
			.then(res => {
				console.log("Next Cursor: ", res.data.nextCursor)
				dispatch({
					type: FETCH_ACTIVE_CHAT,
					payload: res.data.data,
					id: id,
					more: res.data.nextCursor ? res.data.nextCursor : "",
				})
			})
			.catch(err => {
				dispatch(console.log(err))
			})
	}

export const sendMessage = (text, id) => dispatch => {
	axios
		.post(
			URL + `/messages/${id}`,
			{ content: text },
			{ withCredentials: true }
		)
		.then(res => {
			const data = { content: text, sender: true, createdAt: Date.now() }
			dispatch({
				type: SEND_MESSAGE,
				payload: data,
			})
		})
		.catch(err => {
			dispatch(console.log(err))
		})
}
