import { NOTI_UPDATE, CHAT_UPDATE, FETCH_CHAT } from "../actions/types"

const initialState = {
	noti: 0,
	chat: 0,
	chatList: [],
	notiList: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CHAT_UPDATE: {
			// console.log("Chat update received")
			return {
				...state,
				chat: state.chat + 1,
			}
		}
		case NOTI_UPDATE: {
			console.log("Notification update received")
			return {
				...state,
				noti: state.noti + 1,
				notiList: [...state.noti, payload.data],
			}
		}
		case FETCH_CHAT: {
			return { ...state, chatList: action.payload }
		}
		default: {
			return state
		}
	}
}
