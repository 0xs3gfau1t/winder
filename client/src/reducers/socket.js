import { NOTI_UPDATE, CHAT_UPDATE } from "../actions/types"

const initialState = {
	noti: 0,
	chat: 0,
	chatList: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case "CONNECT": {
			console.log("Socket connected ")
			return {
				...state,
			}
		}
		default: {
			return state
		}
	}
}
