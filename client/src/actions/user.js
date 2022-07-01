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

const url = process.env.URL

export const loadUser = () => dispatch => {
	axios
		.get(url + "/settings", { withCredentials: true })
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
		.post(url + "/settings/verifyemail", {}, { withCredentials: true })
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
		.post(url + `/settings/verifyemail/${token.token}`, {})
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
	if (update.hasOwnProperty("ageL") && update.hasOwnProperty("ageH")) {
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
		.patch(url + `/settings`, update, { withCredentials: true })
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
			.post(url + `/image`, formData, config)
			.then(res => {
				dispatch(displayAlert("Profile Updated...", "success", true))
				setTimeout(() => window.location.reload(), 1000)
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
		.delete(url + `/image/${id}`, { withCredentials: true })
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
