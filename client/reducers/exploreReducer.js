import { EXPLORE_LOAD, EXPLORE_NEXT } from "../actions/types"

const initialState = { isLoading: true, current: -1, amount: 0, users: [] }

export default function (state = initialState, action) {
	switch (action.type) {
		case EXPLORE_LOAD:
			// Clear previous users
			let users = state.users.filter((_, idx) => {
				return idx >= state.current
			})

			// Append new fetched users
			users = users.concat(action.payload)
			return {
				...state,
				current: 0,
				users: users,
				amount: users.length,
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
