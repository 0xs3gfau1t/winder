const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

const { generateToken } = require("../Utils/jwtUtil")
const { userModel } = require("../Models/userModel")
const authenticateToken = require("../Middlewares/authenticateToken")
const sanitizer = require("../Middlewares/sanitizer")

router.post("/register", sanitizer, async (req, res) => {
	let { email, password, dob, gender, firstName, lastName } =
		req.sanitized.user
	if (!email || !password || !dob || !gender || !firstName || !lastName)
		return res.status(400).json({
			success: false,
			error: "One or more field is missing or invalid.",
		})

	if (await userModel.exists({ email }))
		return res.status(400).json({
			success: false,
			error: "User already exists with this email.",
		})

	req.sanitized.user.password = await bcrypt.hash(password, 10)

	let new_user = new userModel(req.sanitized.user)

	try {
		await new_user.save({ validateBeforeSave: false })
		return res.json({ success: true, id: new_user._id })
	} catch (e) {
		return res
			.status(400)
			.json({ success: false, error: "Failed to create user." })
	}
})

router.post("/login", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: "Either email or password is missing.",
		})

	const user = await userModel.findOne(
		{ email },
		{ email: 1, password: 1, refreshToken: 1, username: 1 }
	)

	if (!user)
		return res.status(400).json({
			success: false,
			error: "No user with this email.",
		})

	if (await bcrypt.compare(password, user.password)) {
		const userdata = {
			_id: user._id,
			email_verified: user.username !== undefined ? true : false,
		}
		const accessToken = generateToken(userdata, "1h")
		const refreshToken = generateToken(userdata, "1d")
		res.cookie("accessToken", accessToken, { httpOnly: true })

		await user.updateOne(
			{ refreshToken: refreshToken },
			{ validateBeforeSave: false }
		)
		return res.json({ success: true, id: user._id })
	}

	return res.status(400).json({ success: false, error: "Invalid password" })
})

router.delete("/logout", authenticateToken, async (req, res) => {
	const user = await userModel.findOne({ _id: req.userdata._id })
	if (!user)
		return res
			.status(400)
			.json({ success: false, error: "User not found." })

	user.refreshToken = ""
	user.save({ validateBeforeSave: false })

	res.clearCookie("accessToken", "")

	return res.json({ success: true })
})

router.delete("/delete", authenticateToken, async (req, res) => {
	const identifier = { _id: req.userdata._id }
	if (!(await userModel.exists(identifier)))
		return res.status(400).json({ success: false, error: "User not found" })

	userModel.deleteOne(identifier).exec()
	res.json({ success: true })
})
module.exports = router
