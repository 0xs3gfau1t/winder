import axios from "axios"
import { EXPLORE_NEXT, EXPLORE_LOAD } from "./types"
import { displayAlert } from "./misc"
import { EXPLORE_URL, ACCEPT_URL } from "../urls"

export const loadExplore = () => dispatch => {
	axios
		.get(EXPLORE_URL, { withCredentials: true })
		.then(res => {
			dispatch({
				type: EXPLORE_LOAD,
				payload: res.data.userList,
			})
		})
		.catch(err => {
			dispatch(
				displayAlert(
					err.response?.data.error || "Something went wrong.",
					"danger"
				)
			)
		})
}

export const sendLike = userid => dispatch => {
	axios
		.post(ACCEPT_URL, { whom: userid }, { withCredentials: true })
		.then(res => {
			if (res.data.matched)
				dispatch(displayAlert("It's a match.", "success", true))
			else dispatch(displayAlert("Match request sent.", "success"))
			dispatch(nextUser())
		})
		.catch(err => {
			dispatch(displayAlert(err.response?.data.error, "danger"))
			dispatch(nextUser())
		})
}

export const ignoreUnliked = () => (dispatch, getState) => {
	dispatch(nextUser())
}

export const nextUser = () => (dispatch, getState) => {
	let {
		explore: { amount, current },
	} = getState()

	// If only 2 users are left fetch new list of users
	if (amount - current <= 2) dispatch(loadExplore())

	dispatch({ type: EXPLORE_NEXT })
}
