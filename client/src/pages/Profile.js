import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdEdit } from "react-icons/md"
import { GoVerified } from "react-icons/go"
import { IconContext } from "react-icons"
import { loadOptions } from "../actions/misc"
import { emailVerifyRequest, updateProfile } from "../actions/user"
import Wrapper from "../assets/wrappers/SettingPage"
import Nav from "../components/Nav/Nav"
import { Alert, FormSelect, Bar, SaveChanges } from "../components"

function Profile() {
	const misc = useSelector(state => state.misc)
	const user = useSelector(state => state.auth.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadOptions())
	}, [])
	const [settings, setSettings] = useState({
		changed: false,
		bio: "",
		passions: user.passion ? user.passion : [],
		preview: "https://thispersondoesnotexist.com/image",
	})
	const onChange = e => {
		if (!settings.changed) setSettings({ ...settings, changed: true })
		if (e.target.name === "file") {
			let file = e.target.files[0]
			setSettings(prev => ({
				...prev,
				preview: URL.createObjectURL(file),
				file: file,
			}))
		}
		if (e.target.name == "passions") {
			setSettings(prev => ({
				...prev,
				passions: [...prev.passions, e.target.value],
			}))
		} else {
			let field_name = e.target.name
			let field_value = e.target.value
			setSettings(prev => ({ ...prev, [field_name]: field_value }))
		}
	}
	const verifyMail = () => {
		dispatch(emailVerifyRequest())
	}
	const onSubmit = e => {
		e.preventDefault()
		setSettings({ ...settings, changed: false })
		dispatch(updateProfile(settings))
	}
	return (
		<Wrapper>
			<Bar title={"Settings"} />
			<div className="navbarr">
				<Nav current="Settings" />
			</div>
			<div className="container mx-auto">
				{misc.showAlert && <Alert style={{ marginTop: "-4%" }} />}
				<form onChange={onChange} onSubmit={onSubmit}>
					<div className="flex flex-row flex-wrap pb-4">
						<aside className="w-full sm:w-1/3 md:w-1/4 px-2 border-r-2 h-full">
							<div className="sticky top-0 p-2 w-full profile-form">
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
								/>
								<ul className="permanent-info m-2">
									<div
										className={
											"grid" +
											(user.email_verified
												? "grid-col-2"
												: "")
										}
									>
										<li>
											{user.firstName +
												" " +
												user.lastName}
											{user.email_verified && (
												<GoVerified className="-mt-6 ml-32" />
											)}
										</li>
									</div>
									<li>{user.dob}</li>
									<li>{user.email}</li>
									<li>
										{user.email_verified ? (
											<span className="text-green-500">
												Email Verified
											</span>
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
								placeholder={user.bio}
								value={settings.bio}
								onChange={onChange}
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
										options={misc.options.programs}
									/>
								</div>
							</div>
							<h5 className="mt-6 mx-3">Passions</h5>
							<div className="flex flex-wrap mx-7">
								{settings.passions.map((passion, index) => (
									<span
										className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200"
										key={index}
									>
										{passion}
									</span>
								))}
								<FormSelect
									name="passions"
									hint="Add passion"
									options={misc.options.passions}
								/>
							</div>
							<h4 className="m-5">You are looking for</h4>
						</main>
					</div>
					{settings.changed && <SaveChanges />}
				</form>
			</div>
		</Wrapper>
	)
}

export default Profile
