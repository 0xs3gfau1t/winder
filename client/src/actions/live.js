import axios from "axios"
import { FETCH_CHAT, CHAT_UPDATE, NOTI_UPDATE } from "./types"
const URL = process.env.URL

export function connect() {
	return { type: "CONNECT" }
}

export const chatUpdate = data => dispatch => {
	console.log("Chat update action")
	dispatch({ type: CHAT_UPDATE, payload: data })
}

export const notiUpdate = data => dispatch => {
	console.log("Notification update.")
	dispatch({ type: NOTI_UPDATE, payload: data })
}

export const fetchChats = () => dispatch => {
	axios
		.get(URL + "/messages", { withCredentials: true })
		.then(res => {
			console.log("Chat data: ")
			dispatch({
				type: FETCH_CHAT,
				payload: res.data.data,
			})
		})
		.catch(err => {
			dispatch(console.log(err))
		})
}
