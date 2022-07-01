import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGOUT,
	LOAD_USER,
	DELETE_PIC,
} from "../actions/types"

const initialState = {
	isAuthenticated: false,
	user: { preference: {} },
	flag: false,
}

export default function (state = initialState, action) {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: false,
				flag: true,
			}
		case REGISTER_FAILED:
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				flag: true,
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				flag: false,
			}
		case LOAD_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			}
		case DELETE_PIC:
			console.log(action)
			return {
				...state,
				user: {
					...state.user,
					images: state.user.images.filter(
						img => img != action.payload
					),
				},
			}
		default:
			return state
	}
}
