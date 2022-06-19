import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdEdit } from "react-icons/md"
import { GoVerified } from "react-icons/go"
import { IconContext } from "react-icons"
import { loadOptions } from "../actions/misc"
import { verifyEmail } from "../actions/user"
import Wrapper from "../assets/wrappers/SettingPage"
import Nav from "../components/Nav/Nav"
import { Alert, FormSelect, Bar } from "../components"

function Profile() {
	const misc = useSelector(state => state.misc)
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadOptions())
	}, [])
	const [settings, setSettings] = useState({
		preview: "https://thispersondoesnotexist.com/image",
	})
	const onChange = e => {
		if (e.target.name === "file") {
			let file = e.target.files[0]
			setSettings(prev => ({
				...prev,
				preview: URL.createObjectURL(file),
				file: file,
			}))
		} else {
			let field_name = e.target.name
			let field_value = e.target.value
			setSettings(prev => ({ ...prev, [field_name]: field_value }))
		}
	}
	const verifyMail = () => {
		console.log("Verified")
		dispatch(verifyEmail())
	}
	return (
		<Wrapper>
			<Bar title={"Settings"} />
			<div className="navbarr">
				<Nav current="Settings" />
			</div>
			<div className="container mx-auto">
				{misc.showAlert && <Alert style={{ marginTop: "-4%" }} />}
				<form onChange={onChange}>
					<div className="flex flex-row flex-wrap py-4">
						<aside className="w-full sm:w-1/3 md:w-1/4 px-2 border-r-2 h-full">
							<div className="sticky top-0 p-4 w-full profile-form">
								<img
									className="h-76 w-76"
									src={settings.preview}
								/>
								<label className="change-dp" htmlFor="upload">
									<IconContext.Provider
										value={{ color: "cyan", size: "2em" }}
									>
										<MdEdit />
									</IconContext.Provider>
								</label>
								<input
									id="upload"
									type="file"
									accept="image/*"
									name="file"
									onChange={onChange}
								/>
								<ul className="permanent-info m-2">
									<div className="grid grid-cols-2">
										<li>
											{user.firstName +
												" " +
												user.lastName}
										</li>
										{user.email_verified && (
											<GoVerified className="m-1" />
										)}
									</div>
									<li>{user.dob}</li>
									<li>Email : {user.email}</li>
									<li>
										{user.email_verified ? (
											"Verify mail"
										) : (
											<span
												className="text-yellow-900 cursor-pointer bg-slate-200"
												onClick={verifyMail}
											>
												Verify email
											</span>
										)}
									</li>
								</ul>
							</div>
						</aside>
						<main
							role="main"
							className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
						>
							<h3 className="m-3">Profile</h3>
							<label htmlFor="bio" className="mx-10 form-label">
								Bio
							</label>
							<input
								name="bio"
								className="m-10 text-orange-700 my-2 font-bold"
								value={user.bio}
							/>
							<div className="grid grid-cols-2 gap-5 px-1 mx-10">
								<div className="grid grid-row-2">
									<label
										htmlFor="gender"
										className="form-label"
									>
										University
									</label>
									<FormSelect
										defaultV={user.university}
										name="university"
										onChange={onChange}
										options={misc.options.universities}
									/>
								</div>
								<div className="grid grid-row-2">
									<label htmlFor="age" className="form-label">
										Programmme
									</label>
									<FormSelect
										name="program"
										defaultV={user.program}
										onChange={onChange}
										options={misc.options.programs}
									/>
								</div>
							</div>
							<h5 className="mt-6 mx-3">Passions</h5>
							<div className="flex flex-wrap mx-7">
								{"passions" in misc.options &&
									misc.options.passions.map(
										(passion, index) => (
											<span
												className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200"
												key={index}
											>
												{passion}
											</span>
										)
									)}
							</div>
							<h4 className="m-5">You are looking for</h4>
						</main>
					</div>
				</form>
			</div>
		</Wrapper>
	)
}

export default Profile
