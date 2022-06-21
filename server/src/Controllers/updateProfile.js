require("dotenv").config()

const { userModel } = require("../Models/userModel")
const { changeableData, options } = require("../Utils/variables")
const { verifyToken, generateToken } = require("../Utils/jwtUtil")
const { sendVerifyMailEmail } = require("../Controllers/sendEmail")

const bcrypt = require("bcrypt")

async function updateProfile(req, response) {
	let { user: data, validity } = req.sanitized
	const id = req.userdata._id

	let preference = await userModel
		.findOne({ _id: id }, "preference")
		.then(user => user.preference)


	const userData = await userModel.findOne({ _id: id })

	for (const i in data) {
		// Check if this particular field is modifiable or not
		if (!changeableData[i] && userData[i]) {
			delete data[i]
			validity[i] = false
			console.log(`${i} can't be changed`)
			continue
		}

		// Since this property can be modified
		// Pass it to corresponding handler
		switch (i) {
			case "genderPreference":
				preference.gender = data.genderPreference
				delete data.genderPreference
				break
			case "programPreference":
				preference.program = data.programPreference
				delete data.programPreference
				break
			case "universityPreference":
				preference.university = data.universityPreference
				delete data.universityPreference
				break
			case "agePreference":
				preference.age = data.agePreference
				delete data.agePreference
				break
			default:
				console.log('Nothing to do here', i)
				break
				// res[i] = "Invalid property. FBI open up."
		}
	}
	data.preference = preference

	try {
		await userModel.findOneAndUpdate({ _id: id }, data).exec()
		response.json({success: true, updated: validity})
	} catch (e) {
		console.log(e)
		response.status(500).json({success: false})
	}
}
async function changePassword(req, response) {
	let res = {}

	const newPassword = req.body.newPassword
	const oldPassword = req.body.oldPassword
	const user = await userModel.findOne({ _id: req.userdata._id }, [
		"password",
	])

	if (await bcrypt.compare(oldPassword, user.password)) {
		user.password = await bcrypt.hash(newPassword, 10)
		try {
			await user.save()
			res.success = true
		} catch (e) {
			response.status(500)
			res.success = false
		}
	} else {
		response.status(401)
		res.success = false
		res.message = "unauthorized"
	}

	return response.json(res)
}

async function verifyEmail(req, response) {
	const decodedToken = atob(req.params.token)
	console.log("Decoded Token: ", decodedToken)
	const { data, expired } = await verifyToken(decodedToken)

	if (data) {
		try {
			const newPayload = {
				_id: data.id,
				email_verified: true,
			}
			await userModel
				.findOneAndUpdate(
					{ _id: data.id },
					{
						username: null,
						refreshToken: generateToken(newPayload, "1d"),
					}
				)
				.exec()

			// Now update accesstoken
			const newAccessToken = generateToken(newPayload)
			//
			// Find a way to replace old accessToken with this new one
			// Right now, this just sets same named cookie
			//
			response.cookie("accessToken", newAccessToken)
			response.json({ success: true })
		} catch (e) {
			console.log("Error during verifying email", e)
			response.status(500).json({ success: false })
		}
	} else
		response.status(401).json({ success: false, message: "Token Expired" })
}

async function sendEmailVerificationLink(req, response) {
	const to = await userModel.findOne({ _id: req.userdata._id }, ["email"])
	const token = btoa(generateToken({ id: to._id }, "10m"))
	try {
		await sendVerifyMailEmail(to.email, token)
		response.json({ message: "success" })
	} catch (e) {
		response.status(500).json({ success: false })
	}
}

async function getUserInfo(req, res) {
	try {
		let user = await userModel.findOne({ _id: req.userdata._id }, [
			"email",
			"dob",
			"firstName",
			"lastName",
			"gender",
			"username",
			"university",
			"program",
			"batch",
			"bio",
			"passion",
			"preference",
			"images",
		])
		user = {
			...JSON.parse(JSON.stringify(user)),
			email_verified: req.userdata.email_verified,
		}
		res.json({ success: true, user })
	} catch (err) {
		console.log(err)
		res.json({ success: false, error: "Failed to retrieve user info." })
	}
}
module.exports = {
	updateProfile,
	changePassword,
	verifyEmail,
	sendEmailVerificationLink,
	getUserInfo,
}
