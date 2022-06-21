import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdEdit } from "react-icons/md"
import { GoVerified } from "react-icons/go"
import { IconContext } from "react-icons"
import { loadOptions } from "../actions/misc"
import { emailVerifyRequest, updateProfile, upImg } from "../actions/user"
import Nav from "../components/Nav/Nav"
import { Alert, FormSelect, Bar, SaveChanges } from "../components"

function Profile() {
	const misc = useSelector(state => state.misc)
	const user = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const [settings, setSettings] = useState({
		changed: false,
		bio: "",
		preview: "", // + user.images[0],
	})
	useEffect(() => {
		if (user.images)
			setSettings(prev => ({
				...prev,
				preview: process.env.URL + "/image/" + user.images[0],
			}))
		dispatch(loadOptions())
	}, [user])
	const onChange = e => {
		if (!settings.changed) setSettings({ ...settings, changed: true })
		if (e.target.name === "images") {
			let file = e.target.files[0]
			setSettings(prev => ({
				...prev,
				preview: URL.createObjectURL(file),
				file: file,
			}))
		}
		if (e.target.name == "passion") {
			let upPassion = settings.passion
				? [...settings.passion]
				: [...user.passion]
			setSettings(prev => ({
				...prev,
				passion: [...upPassion, e.target.value],
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
		if ("ageL" in settings && !("ageH" in settings))
			setSettings({ ...settings, ageH: user.preferance.age[1] })
		if ("ageH" in settings && !("ageL" in settings))
			setSettings({ ...settings, ageL: user.preferance.age[0] })
		setSettings({ ...settings, changed: false })
		dispatch(updateProfile(settings))
	}
	const delPassion = e => {
		if (!settings.changed) setSettings({ ...settings, changed: true })
		setSettings(prev => ({
			...prev,
			passion: user.passion.filter(pas => pas != e.target.textContent),
		}))
	}
	return (
		<>
			<Bar title={"Settings"} />
			<div className="navbarr">
				<Nav current="Settings" />
			</div>
			<div className="container mx-auto">
				{misc.showAlert && <Alert style={{ marginTop: "-4%" }} />}
				<form
					encType="multipart/form-data"
					onChange={onChange}
					onSubmit={onSubmit}
				>
					<div className="flex flex-row flex-wrap pb-4">
						<aside className="w-full sm:w-1/3 md:w-1/4 px-2 border-r-2 h-full">
							<div className="sticky top-0 p-2 w-full profile-form">
								<h5>Profile Picture</h5>
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
									name="images"
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
								{user.passion &&
									!settings.passion &&
									user.passion.map((passion, index) => (
										<span
											className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200"
											key={index}
											onClick={delPassion}
										>
											{passion}
										</span>
									))}
								{settings.passion &&
									settings.passion.map((passion, index) => (
										<span
											className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200"
											key={index}
											onClick={delPassion}
										>
											{passion}
										</span>
									))}
								<FormSelect
									name="passion"
									hint="Add passion"
									options={misc.options.passions}
								/>
							</div>
							<h4 className="m-5">You are looking for</h4>
							<div className="grid grid-cols-2 gap-5 px-1 mx-10">
								<div className="grid grid-row-2">
									<label
										htmlFor="gender"
										className="form-label"
									>
										University
									</label>
									<FormSelect
										defaultV={
											user.preference
												? user.preference.university
												: ""
										}
										name="universityPreference"
										options={misc.options.universities}
									/>
								</div>
								<div className="grid grid-row-2">
									<label htmlFor="age" className="form-label">
										Program
									</label>
									<FormSelect
										name="programPreference"
										defaultV={
											user.preference
												? user.preference.program
												: ""
										}
										options={misc.options.programs}
									/>
								</div>
								<div className="grid grid-row-2">
									<label
										htmlFor="gender"
										className="form-label"
									>
										Gender
									</label>
									<FormSelect
										defaultV={
											user.preference
												? user.preference.gender
												: ""
										}
										name="gender"
										options={["male", "female", "other"]}
									/>
								</div>
								<div className="grid grid-row-2">
									<label htmlFor="age" className="form-label">
										Age Range
									</label>
									<div className="grid grid-cols-4">
										<span className="px-2">From</span>
										<input
											className="w-24"
											type="number"
											max="51"
											min="18"
											size="2"
											name="ageL"
											placeholder={
												user.preference
													? user.preference.age[0]
													: "Min"
											}
										/>
										<span className="px-2">to</span>
										<input
											className="w-24"
											type="number"
											max="52"
											min="19"
											maxLength="2"
											name="ageH"
											placeholder={
												user.preference
													? user.preference.age[1]
													: "Max"
											}
										/>
									</div>
								</div>
							</div>
						</main>
					</div>
					{settings.changed && <SaveChanges />}
				</form>
			</div>
		</>
	)
}

export default Profile
