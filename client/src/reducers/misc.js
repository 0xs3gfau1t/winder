import { DISPLAY_ALERT, CLEAR_ALERT, LOAD_OPTIONS } from "../actions/types"

const initialState = {
	showAlert: false,
	alertMsg: "",
	alertType: "",
	options: {},
	isLoading: false,
	flag: "",
}

export default function (state = initialState, action) {
	switch (action.type) {
		case DISPLAY_ALERT:
			return {
				...state,
				...action.payload,
				showAlert: true,
			}
		case CLEAR_ALERT:
			return {
				...state,
				showAlert: false,
				alertMsg: "",
			}
		case LOAD_OPTIONS:
			return {
				...state,
				options: action.payload,
			}
		default:
			return state
	}
}
