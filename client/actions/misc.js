import axios from "axios"
import { DISPLAY_ALERT, CLEAR_ALERT, LOAD_OPTIONS } from "./types"
import { OPTIONS_URL } from "../urls"

export const displayAlert =
	(message, alertType, persist = false) =>
	dispatch => {
		// console.log("called displayAlert");
		const data = {
			alertMsg: message,
			alertType: alertType,
		}
		dispatch({
			type: DISPLAY_ALERT,
			payload: data,
		})
		if (!persist) {
			setTimeout(() => {
				// console.log("Cleared");
				dispatch({
					type: CLEAR_ALERT,
				})
			}, 3000)
		}
	}

export const loadOptions = () => dispatch => {
	axios
		.get(OPTIONS_URL, { withCredentials: true })
		.then(res => {
			dispatch({
				type: LOAD_OPTIONS,
				payload: res.data,
			})
		})
		.catch(err => {
			dispatch(displayAlert("Failed to laod data", "danger"))
		})
}
