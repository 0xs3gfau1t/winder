import {
	NOTI_UPDATE,
	CHAT_UPDATE,
	FETCH_CHAT,
	FETCH_ACTIVE_CHAT,
	SEND_MESSAGE,
	SET_LOADING,
	SET_LIVE_COUNT,
} from "../actions/types"

const initialState = {
	noti: 0,
	chat: 0,
	chatList: {},
	activeChat: { data: [], loading: false, more: "", live: false },
	notiList: {},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case CHAT_UPDATE: {
			console.log("Chat update received") //
			return {
				...state,
				chat: window.location.pathname !== "/chat" ? state.chat + 1 : 0,
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
		case FETCH_ACTIVE_CHAT: {
			let update = state.chatList
			if (action.id) {
				update[action.id].unreadCount = 0
			}
			return {
				...state,
				live: action.live,
				chatList: { ...update },
				activeChat: {
					live: action.live ? true : false,
					loading: false,
					id: action.id,
					more: action.more,
					data: action.live
						? [
								...state.activeChat.data,
								...action.payload.reverse(),
						  ]
						: [
								...action.payload.reverse(),
								...state.activeChat.data,
						  ],
				},
				chat: action.live ? state.chat - 1 : state.chat,
			}
		}
		case SEND_MESSAGE: {
			return {
				...state,
				activeChat: {
					...state.activeChat,
					live: true,
					data: [...state.activeChat.data, action.payload],
				},
			}
		}
		case SET_LOADING: {
			return {
				...state,
				activeChat: { ...state.activeChat, loading: true },
			}
		}
		case SET_LIVE_COUNT: {
			return {
				...state,
				chat:
					"chat" in action.payload ? action.payload.chat : state.chat,
				noti: action.payload.noti ? action.payload.noti : state.noti,
			}
		}
		default: {
			return state
		}
	}
}
