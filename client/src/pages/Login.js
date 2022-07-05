import React, { useState } from "react"
import DatePicker from "react-datepicker"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/LandingPage"
import { Logo, FormText, Alert, ForgotPsw, Popup } from "../components"
import { displayAlert } from "../actions/misc"
import { register, login } from "../actions/auth"

import "react-datepicker/dist/react-datepicker.css"

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	password2: "",
	dob: new Date(2004, 5, 11),
	gender: "male",
	isMember: true,
}

function Login() {
	const [values, setValues] = useState(initialState)
	const misc = useSelector(state => state.misc)
	const dispatch = useDispatch()

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember })
	}

	const onSubmit = e => {
		e.preventDefault()
		const { firstName, email, password, password2, isMember } = values

		if (!email || !password || (!isMember && !firstName && !password2)) {
			const message = "One or more field is missing!"
			dispatch(displayAlert(message, "danger"))
			return
		}
		if (password !== password2 && !isMember) {
			const message =
				"Paswords didn't match. Don't get too desparate to find love"
			dispatch(displayAlert(message, "danger"))
			return
		}
		if (password.length < 8 && !isMember) {
			dispatch(
				displayAlert(
					"Password must be atleast 8 character long.",
					"danger"
				)
			)
			return
		}
		if (isMember) dispatch(login(values))
		else dispatch(register(values))
	}
	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const setDOB = date => {
		setValues({ ...values, dob: date })
	}
	const flag = useSelector(state => state.auth)
	const [forgot, setForgot] = useState(false)
	const handleClose = e => {
		setForgot(false)
	}

	if (flag.isAuthenticated || flag.cookie) {
		return <Navigate to="/explore" />
	}
	return (
		<Wrapper className="full-page">
			<form
				className={`form ${values.isMember ? "max-w-md" : "max-w-2xl"}`}
				onSubmit={onSubmit}
			>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"}</h3>
				{misc.showAlert && <Alert float={false} />}
				{/* name input */}
				{!values.isMember && (
					<div className="grid grid-cols-2 gap-4">
						<FormText
							type="text"
							name="firstName"
							labelText="First Name"
							value={values.name}
							handleChange={handleChange}
						/>
						<FormText
							type="text"
							name="lastName"
							labelText="Last Name"
							value={values.lastName}
							handleChange={handleChange}
						/>
					</div>
				)}
				{!values.isMember && (
					<div className="grid grid-cols-2 gap-4">
						<div className="grid grid-row-2">
							<label htmlFor="gender" className="form-label">
								Gender
							</label>
							<div onChange={handleChange} className="flex">
								<div className="flex items-center mr-4">
									<input
										id="gender"
										type="radio"
										value="male"
										name="gender"
										defaultChecked
										className="radio"
									/>
									<label htmlFor="gender" className="ml-2">
										Male
									</label>
								</div>
								<div className="flex items-center mr-4">
									<input
										id="gender"
										type="radio"
										value="female"
										name="gender"
										className="radio"
									/>
									<label htmlFor="gender" className="ml-2">
										Female
									</label>
								</div>
								<div className="flex items-center mr-4">
									<input
										id="gender"
										type="radio"
										value="other"
										name="gender"
										className="radio"
									/>
									<label htmlFor="gender" className="ml-2">
										Other
									</label>
								</div>
							</div>
						</div>
						<div className="grid grid-row-2">
							<label htmlFor="age" className="form-label">
								Date of Birth
							</label>
							<DatePicker
								name="dob"
								selected={values.dob}
								onChange={Date => setDOB(Date)}
								className="form-input"
							/>
						</div>
					</div>
				)}
				{/* email input */}
				<FormText
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormText
					type="password"
					name="password"
					labelText="Password"
					value={values.password}
					handleChange={handleChange}
				/>
				{!values.isMember && (
					<FormText
						type="password"
						name="password2"
						labelText="Confirm password"
						value={values.password2}
						handleChange={handleChange}
					/>
				)}
				<button type="submit" className="btn btn-block">
					submit
				</button>
				<p className="m-2">
					{values.isMember && (
						<span
							className="block text-blue-700 cursor-pointer"
							onClick={e => setForgot(true)}
						>
							Forgot Password?
						</span>
					)}
					{values.isMember
						? "Not a member yet?"
						: "Already a member?"}

					<button
						type="button"
						onClick={toggleMember}
						className="member-btn"
					>
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
			<Popup clicked={forgot} close={handleClose}>
				<ForgotPsw />
			</Popup>
		</Wrapper>
	)
}

export default Login
