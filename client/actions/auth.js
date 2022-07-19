import axios from "axios"
import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	CLEAR_ALERT,
} from "./types"
import { displayAlert } from "./misc"

import { LOGIN_URL, REGISTER_URL } from "../urls"

export const register = user_data => dispatch => {
	let data = JSON.parse(JSON.stringify(user_data))
	delete data["password2"]
	delete data["isMember"]
	console.log(data)
	axios
		.post(REGISTER_URL, data, { withCredentials: true })
		.then(res => {
			dispatch(
				displayAlert("Account created! Proceeding to login.", "success")
			)
			setTimeout(
				() =>
					dispatch({
						type: REGISTER_SUCCESS,
						payload: res,
					}),
				5000
			)
			window.location.reload()
		})
		.catch(err => {
			dispatch(displayAlert(err.response.data.error, "danger"))
			dispatch({
				type: REGISTER_FAILED,
			})
		})
}

export const login =
	({ email, password }) =>
	dispatch => {
		const user_data = { email: email, password: password }
		// console.log(user_data);
		axios
			.post(LOGIN_URL, user_data, { withCredentials: true })
			.then(res => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				})
			})
			.catch(err => {
				dispatch(displayAlert(err.response.data.error, "danger"))
				dispatch({
					type: LOGIN_FAILED,
				})
			})
	}

export const logout = () => dispatch => {
	axios.delete(url + "/auth/logout", { withCredentials: true }).then(res => {
		console.log(res)
		dispatch({
			type: CLEAR_ALERT,
		})
		dispatch({
			type: LOGOUT,
		})
		window.location = "/login"
	})
}
