const express = require("express")
const bcrypt = require("bcrypt")

const { sendForgotPasswordEmail } = require("../Controllers/sendEmail")
const { generateToken, verifyToken } = require("../Utils/jwtUtil")
const { userModel } = require("../Models/userModel")

router = express.Router()

router
	.post("/:authtoken", async (req, res) => {
		const t = atob(req.params.authtoken)

		const { data, expired } = verifyToken(t)

		if (!expired) {
			// Updates new password
			// Removes refershtoken, so logs out from every device
			// If we want to log this current device on, we can respond with access token
			// And store a new refresh token

			const pass = await bcrypt.hash(req.body.password, 10)
			// console.log("Data:", data)
			const usr = await userModel.findOneAndUpdate(
				{ email: data.email },
				{
					password: pass,
					$unset: { refreshToken: 1 },
				}
			)

			usr.save({ validateBeforeSave: false })
			res.json({ success: true })
		} else res.status(500).json({ success: false, error: "Token expired." })
	})
	.post("/", async (req, res) => {
		const mail = req.body.email

		console.log("Received email: ", mail)

		if (await userModel.findOne({ email: mail })) {
			const token = btoa(generateToken({ email: mail }, `${10 * 60}s`))
			console.log("Token generated as: ", token)

			await sendForgotPasswordEmail(mail, token)
			res.json({ success: true })
		} else {
			res.status(404).json({
				success: false,
				message: "User not found with this mail ",
			})
		}
	})

module.exports = router
