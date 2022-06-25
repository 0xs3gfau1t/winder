import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGOUT,
	LOAD_USER,
	DELETE_DP,
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
		case DELETE_DP:
			let imageUp = state.user.images
			return {
				...state,
				image: imageUp.shift(),
			}
		default:
			return state
	}
}
