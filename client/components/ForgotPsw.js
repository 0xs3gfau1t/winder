import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { displayAlert } from "../actions/misc"
import { Alert } from "../components"
import { forgotPassword } from "../actions/user"

const ForgotPsw = () => {
	const dispatch = useDispatch()
	const misc = useSelector(state => state.misc)
	const [email, setEmail] = useState("")

	const onChange = () => {
		console.log("Changed")
	}
	const forgotPass = e => {
		e.preventDefault()
		if (email.trim() === "") {
			dispatch(displayAlert("Email is required!", "danger", true))
			return
		}
		dispatch(forgotPassword(email))
	}
	return (
		<div className="w-fit bg-white pt-2 rounded-lg">
			<h4 className="text-center">Forgot password?</h4>
			{misc.showAlert && <Alert float={false} />}
			<form
				onChange={e => {
					setEmail(e.target.value)
				}}
				onSubmit={forgotPass}
				className="shadow-md rounded px-4 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="oldPass"
					>
						Enter your mail associated with Winder.
					</label>
					<input
						className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="email"
						size={"30"}
						type="email"
						placeholder="example@winder.com"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="mx-auto bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Reset Password
					</button>
				</div>
			</form>
		</div>
	)
}

export default ForgotPsw
