require("dotenv").config()

const { userModel } = require("../Models/userModel")
const { changableData, options } = require("../Utils/variables")
const { verifyToken, generateToken } = require("../Utils/jwtUtil")
const { sendEmail } = require("../Controllers/sendEmail")

const bcrypt = require("bcrypt")

async function updateProfile(req, response) {
	const data = req.body
	const id = req.userdata._id

	let changedFields = { preference: {} }
	let res = {}

	for (const i in data) {
		// Check if this particular field is modifiable or not
		if (!changableData[i]) {
			res[i] = false
			console.log(`${i} can't be changed`)
			continue
		}

		// Since this property can be modified
		// Pass it to corresponding handler
		switch (i) {
			case "genderPreference":
				const gPref = parseInt(data[i])
				if (options.gender.includes(gPref)) {
					changedFields.preference.gender = gPref
					res[i] = true
				} else res[i] = false
				break
			case "programPreference":
				if (options.programs.includes(data[i]) || 1) {
					// Remove the or 1 portion when we have a system
					// Where all valid programs are registered
					// And user has to choose from provided program
					changedFields.preference.program = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "universityPreference":
				if (options.universities.includes(data[i])) {
					changedFields.preference.university = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "agePreference":
				// Validate age range
				if (
					data[i][0] >= options.age[0] &&
					data[i][1] <= options.age[1]
				) {
					changedFields.preference.age = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "gender":
				if (options.gender.includes(data[i])) {
					changedFields.gender = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "bio":
				changedFields.bio = data[i]
				res[i] = true
				break
			case "passion":
				let passions = []
				for (const j in data[i]) {
					if (j in options.passions) passions.push(j)
				}
				if (passions.length > 2) {
					changedFields.passions = passions
					res[i] = true
				} else res[i] = false
				break
			case "university":
				if (options.universities.includes(data[i])) {
					changedFields.university = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "program":
				if (options.programs.includes(data[i])) {
					changedFields.program = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "batch":
				if (!isNaN(data[i])) {
					changedFields.batch = data[i]
					res[i] = true
				} else res[i] = false
				break
			case "email":
				console.log("Haven't yet decided to make it happen")
				break
			default:
				res[i] = "Invalid property. FBI open up."
		}
	}
	try {
		userModel.findOneAndUpdate({ _id: id }, changedFields).exec()
		res.success = true
	} catch (e) {
		response.status(500)
		res.success = false
		console.log(e)
	}
	response.json(res)
}
async function changePassword(req, response) {
	let res = {}

	const newPassword = req.body.newPassword
	const oldPassword = req.body.oldPassword
	const user = await userModel.findOne({ _id: req.userdata._id })

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
	const { data, expired } = await verifyToken(req.params.token)

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
	const to = await userModel.findOne({ _id: req.userdata._id })
	const token = generateToken({ id: to._id }, "10m")
	try {
		await sendEmail(to.email, token)
		response.json({ success: true })
	} catch (e) {
		response.status(500).json({ success: false })
	}
}

async function getUserInfo(req, res) {
	try {
		let user = await userModel.findOne(
			{ _id: req.userdata._id },
			{
				password: 0,
				refreshToken: 0,
				pagination: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0,
			}
		)
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
