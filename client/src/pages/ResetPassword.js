import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Alert, Logo, FormText } from "../components"
import Wrapper from "../assets/wrappers/ErrorPage"
import { resetPassword } from "../actions/user"
import { displayAlert } from "../actions/misc"

const ResetPassword = () => {
	const token = useParams()
	const [password, setPassword] = useState({ pass1: "", pass2: "" })
	const misc = useSelector(state => state.misc)

	const dispatch = useDispatch()

	const onSubmit = e => {
		e.preventDefault()

		const { pass1, pass2 } = password
		if (!pass1 || !pass2) {
			dispatch(displayAlert("Both field are required", "danger"))
			return
		}
		if (pass1 !== pass2) {
			dispatch(displayAlert("Password didn't match.", "danger"))
			return
		}
		dispatch(resetPassword(pass1, token.token))
	}
	const handleChange = e => {
		setPassword({ ...password, [e.target.name]: e.target.value })
	}
	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Link to="/">
					<Logo />
				</Link>
				<h3>Reset Password</h3>
				{misc.showAlert && <Alert />}
				<FormText
					type="password"
					name="pass1"
					labelText="New Password"
					value={password.pass1}
					handleChange={handleChange}
				/>
				<FormText
					type="password"
					name="pass2"
					labelText="Confirm password"
					value={password.pass2}
					handleChange={handleChange}
				/>
				<button type="submit" className="btn btn-block">
					submit
				</button>
			</form>
		</Wrapper>
	)
}

export default ResetPassword
