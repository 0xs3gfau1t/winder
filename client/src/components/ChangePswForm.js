import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { displayAlert } from "../actions/misc"
import { Alert } from "../components"
import { changePass } from "../actions/user"

const ChangePswForm = ({ handlePopupClose }) => {
	const dispatch = useDispatch()
	const misc = useSelector(state => state.misc)
	const [password, setPassword] = useState({
		oldPass: "",
		new1: "",
		new2: "",
	})

	const onChange = e => {
		let name = e.target.name
		let value = e.target.value
		setPassword({ ...password, [name]: value })
	}

	const changePassword = e => {
		e.preventDefault()
		const { oldPass, new1, new2 } = password
		if (!new1 || !new2 || !oldPass) {
			dispatch(displayAlert("All fields are required", "danger"))
			return
		}
		if (new1 !== new2) {
			dispatch(displayAlert("Password didn't match.", "danger"))
			return
		}
		dispatch(changePass(oldPass, new1))
		handlePopupClose()
	}
	return (
		<div className="mx-auto w-2/3">
			{misc.showAlert && <Alert />}
			<form
				onChange={onChange}
				onSubmit={changePassword}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="oldPass"
					>
						Old Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="oldPass"
						type="password"
						placeholder=".................."
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="new2"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						name="new1"
						type="password"
						placeholder="............."
					/>
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="new2"
					>
						Confirm New Password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						name="new2"
						type="password"
						placeholder="............."
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="mx-auto bg-orange-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Change Password
					</button>
				</div>
			</form>
		</div>
	)
}

export default ChangePswForm
