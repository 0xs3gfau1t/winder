import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdEdit } from "react-icons/md"
import { GoVerified, GoX } from "react-icons/go"
import { IconContext } from "react-icons"
import { displayAlert, loadOptions } from "../actions/misc"
import { emailVerifyRequest, updateProfile, removeDp } from "../actions/user"
import { Alert, FormSelect, Bar, SaveChanges, ImageUpload } from "../components"

function Profile() {
	const misc = useSelector(state => state.misc)
	const user = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const [settings, setSettings] = useState({
		changed: false,
		bio: "",
		preview: "",
		preview2: "",
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
		if (e.target.type === "file") {
			let file = e.target.files[0]
			if (e.target.name == "file") {
				setSettings(prev => ({
					...prev,
					preview: URL.createObjectURL(file),
					file: file,
				}))
			} else {
				setSettings(prev => ({
					...prev,
					preview2: URL.createObjectURL(file),
					file2: file,
				}))
			}
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
	const delPassion = passion => {
		if (!settings.changed) setSettings({ ...settings, changed: true })
		if (settings.passion)
			setSettings(prev => ({
				...prev,
				passion: settings.passion.filter(pas => pas != passion),
			}))
		else
			setSettings(prev => ({
				...prev,
				passion: user.passion.filter(pas => pas != passion),
			}))
	}
	// const removeDP = () => {
	// 	if (user.images.length < 2) {
	// 		dispatch(
	// 			displayAlert(
	// 				"Can't remove! This is the only image you have.",
	// 				"danger"
	// 			)
	// 		)
	// 		return
	// 	}
	// 	dispatch(removeDp(user.images[0]))
	// }
	return (
		<>
			<Bar title={"Settings"} />
			<div className="container mx-auto">
				{misc.showAlert && <Alert style={{ marginTop: "-1%" }} />}
				<form
					encType="multipart/form-data"
					onChange={onChange}
					onSubmit={onSubmit}
				>
					<div className="flex flex-wrap pb-4 container -ml-7">
						<aside className="w-full sm:w-1/3 md:w-1/4 px-2 border-4 rounded-xl h-full hover:drop-shadow-2xl ease-in duration-300">
							<div className="sticky top-0 p-2 profile-form">
								<h5>Profile Picture</h5>
								<img
									className="h-60 w-64 border-2"
									src={settings.preview}
									alt={user.firstName}
								/>
								<IconContext.Provider
									value={{ color: "white", size: "1em" }}
								>
									<label
										className="change-dp"
										htmlFor="upload"
									>
										<MdEdit />
									</label>
								</IconContext.Provider>
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
												<GoVerified className="-mt-6 ml-32 float-right" />
											)}
										</li>
									</div>
									<li>{user.dob}</li>
									<li>{user.gender}</li>
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
							className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2 border-4 rounded-xl"
						>
							<h3 className="m-3">Profile</h3>
							<div className="flex flex-row gap-8">
								{user.images &&
									user.images.slice(1).map(image => {
										return (
											<img
												className="h-64 w-64 border-2"
												key={image}
												src={
													process.env.URL +
													`/image/${image}`
												}
											/>
										)
									})}
								{user.images && user.images.length < 3 && (
									<ImageUpload
										onChange={onChange}
										settings={settings}
										user={user}
									/>
								)}
							</div>
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
										<div key={index}>
											<span className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200">
												{passion}
												<span
													onClick={e =>
														delPassion(passion)
													}
													className="absolute float-right -mt-1 -ml-1 leading-3 text-red-100 bg-red-900 h-3 px-1 pb-1 rounded-xl"
												>
													-
												</span>
											</span>
										</div>
									))}
								{settings.passion &&
									settings.passion.map((passion, index) => (
										<div key={index}>
											<span
												className="mx-2 mb-2 p-1 border-2 cursor-pointer rounded-md bg-slate-200"
												key={index}
											>
												{passion}
												<span
													onClick={e =>
														delPassion(passion)
													}
													className="absolute float-right leading-3 -m-1 text-rose-600 rounded-xl"
												>
													-
												</span>
											</span>
										</div>
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
												user.preference.age
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
												user.preference.age
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
