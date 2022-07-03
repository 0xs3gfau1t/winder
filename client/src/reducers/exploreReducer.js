import { EXPLORE_LOAD, EXPLORE_NEXT } from "../actions/types"

const initialState = { isLoading: true, current: 0, users: [] }

export default function (state = initialState, action) {
	switch (action.type) {
		case EXPLORE_LOAD:
			return {
				...state,
				users: action.payload,
			}
		case EXPLORE_NEXT:
			return {
				...state,
				current: state.current + 1,
			}
		default:
			return state
	}
}
