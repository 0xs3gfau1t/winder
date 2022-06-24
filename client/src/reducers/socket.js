import { NOTI_UPDATE, CHAT_UPDATE } from "../actions/types"

const initialState = {
	noti: 0,
	chat: 0,
	chatList: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CHAT_UPDATE: {
			return {
				...state,
				chat: state.chat + 1,
			}
		}
		case NOTI_UPDATE: {
			return {
				...state,
				noti: state.noti + 1,
			}
		}
		default: {
			return state
		}
	}
}
