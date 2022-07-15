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
			console.log("Something went wrong")
			console.log(err)
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
			console.log(res.data)
			if (res.data.matched)
				dispatch(displayAlert("It's a match.", "success", true))
			else dispatch(displayAlert("Match request sent.", "success"))
			dispatch({ type: EXPLORE_NEXT })
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response?.data.error, "danger"))
			dispatch({ type: EXPLORE_NEXT })
		})
}
