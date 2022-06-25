import { EXPLORE_LOAD, EXPLORE_ACCEPT } from "../actions/types"

const initialState = { isLoading: true, current: 0, users: [] }

export default function (state = initialState, action) {
	switch (action.type) {
		case EXPLORE_LOAD:
			return {
				...state,
				users: action.payload,
			}
		case EXPLORE_ACCEPT:
			return { ...state }
		default:
			return state
	}
}
