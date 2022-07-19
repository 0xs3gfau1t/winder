import axios from "axios"
import {
	DELETE_PIC,
	SET_LIVE_COUNT,
	LOAD_USER,
	LOGOUT,
	VERIFY_MAIL,
	ADD_PIC,
} from "./types"
import { displayAlert } from "./misc"
import { logout } from "./auth"
import { connect } from "./live"

import {
	CHANGE_PW_URL,
	FORGOT_PW_URL,
	IMAGE_URL,
	SETTINGS_URL,
	VERIFY_MAIL_URL,
} from "../urls"

export const loadUser = () => dispatch => {
	axios
		.get(SETTINGS_URL, { withCredentials: true })
		.then(res => {
			let data = res.data.user
			dispatch({
				type: SET_LIVE_COUNT,
				payload: {
					chat: res.data.user.msgUnreadCount,
					noti: res.data.user.notiUnreadCount,
				},
			})
			delete data["msgUnreadCount"]
			delete data["notiUnreadCount"]
			dispatch({
				type: LOAD_USER,
				payload: res.data.user,
			})
			dispatch(connect())
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert("Session Expired! Logging Out...", "danger"))
			dispatch({
				type: LOGOUT,
			})
			setTimeout(() => (window.location = "/"), 2000)
		})
}

export const emailVerifyRequest = () => dispatch => {
	axios
		.post(VERIFY_MAIL_URL, {}, { withCredentials: true })
		.then(res => {
			console.log(res)
			dispatch(
				displayAlert(
					"Please check you mail box to complete verification",
					"success"
				)
			)
		})
		.catch(err => {
			dispatch(
				displayAlert(
					"Failed to sent verification mail. Please try again later",
					"danger",
					true
				)
			)
		})
}

export const verifyEmail = token => dispatch => {
	axios
		.post(`${VERIFY_MAIL_URL}/${token.token}`, {})
		.then(res => {
			dispatch(
				displayAlert(
					"Your email is verified now. Your journey to meet your soulmate begins now...",
					"success",
					true
				)
			)
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger", true))
		})
}

export const updateProfile = data => dispatch => {
	let update = JSON.parse(JSON.stringify(data))
	delete update["file"]
	delete update["images"]
	delete update["changed"]
	delete update["preview"]
	delete update["preview2"]
	if (update.ageL && update.ageH) {
		update["agePreference"] = [update.ageL, update.ageH]
		delete update["ageL"]
		delete update["ageH"]
	} else {
		delete update["ageL"]
		delete update["ageH"]
	}
	if ("passion" in update && update.passion.length < 3) {
		dispatch(displayAlert("Atleast three passions are required!", "danger"))
		return
	}
	if (data.bio.length == 0) delete update["bio"]
	axios
		.patch(SETTINGS_URL, update, { withCredentials: true })
		.then(res => {
			dispatch(loadUser())
			dispatch(displayAlert("Profile Updated...", "success"))
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger"))
		})
	if (data.hasOwnProperty("file")) {
		const formData = new FormData()
		formData.append("file", data.file)
		if (data.isDP) formData.append("isDP", true)
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		}
		axios
			.post(IMAGE_URL, formData, config)
			.then(res => {
				dispatch(displayAlert("Profile Updated...", "success", true))
				// setTimeout(() => window.location.reload(), 1000)
			})
			.catch(err => {
				console.log(err)
				dispatch(
					displayAlert(err.response.data.message, "danger", true)
				)
			})
	}
}

export const removeDp = id => dispatch => {
	console.log("called")
	axios
		.delete(`${IMAGE_URL}/${id}`, { withCredentials: true })
		.then(
			console.log("Deleted"),
			dispatch({
				type: DELETE_PIC,
				payload: id,
			})
			// setTimeout(() => window.location.reload(), 1000)
		)
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger", true))
		})
}

export const changePass = (oldPass, new1) => dispatch => {
	console.log(oldPass, new1)
	axios
		.patch(
			CHANGE_PW_URL,
			{ oldPassword: oldPass, newPassword: new1 },
			{ withCredentials: true }
		)
		.then(res => {
			dispatch(displayAlert("Password Changed", "success"))
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger"))
		})
}

export const forgotPassword = email => dispatch => {
	axios
		.post(FORGOT_PW_URL, { email: email })
		.then(res => {
			dispatch(
				displayAlert(
					"Password Reset Requested, please check your mail",
					"success"
				)
			)
		})
		.catch(err => {
			// console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger"))
		})
}

export const resetPassword = (password, token) => dispatch => {
	console.log(password, token)
	axios
		.post(`${FORGOT_PW_URL}/${token}`, { password: password })
		.then(res => {
			dispatch(
				displayAlert(
					"Password Changed, redirecting to login",
					"success"
				)
			)
			setTimeout(() => {
				window.location = "/login"
			}, 3000)
		})
		.catch(err => {
			// console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger"))
		})
}
