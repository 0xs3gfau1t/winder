const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

const { generateToken } = require("../Utils/jwtUtil")
const { userModel } = require("../Models/userModel")
const authenticateToken = require("../Middlewares/authenticateToken")

router.post("/register", async (req, res) => {
	const { email, password, dob } = req.body
	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: "Either email or password is missing.",
		})

	const userCount = await userModel.count({ email })

	if (userCount)
		return res.status(400).json({
			success: false,
			error: "User already exists with this email.",
		})

	const hashedpassword = await bcrypt.hash(password, 10)
	const new_user = userModel({
		email,
		password: hashedpassword,
		dob: dob,
	})

	const userdata = { _id: new_user._id }
	const accessToken = generateToken(userdata)
	const refreshToken = generateToken(userdata, "1d")
	res.cookie("accessToken", accessToken)
	res.cookie("refreshToken", refreshToken)

	new_user.refreshToken = refreshToken
	await new_user.save()

	return res.json({ success: true })
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
		{ email: 1, password: 1, refreshToken: 1 }
	)

	if (!user)
		return res.status(400).json({
			success: false,
			error: "No user with this email.",
		})

	if (await bcrypt.compare(password, user.password)) {
		const userdata = { _id: user._id }
		const accessToken = generateToken(userdata)
		const refreshToken = generateToken(userdata, "1d")
		res.cookie("accessToken", accessToken)
		res.cookie("refreshToken", refreshToken)

		await user.updateOne({ refreshToken: refreshToken })
		return res.json({ success: true })
	}

	return res.status(400).json({ success: false, error: "Invalid password" })
})

router.delete("/logout", authenticateToken, async (req, res) => {
	const user = await userModel.find({ _id: req.userdata._id }).limit(1)
	if (!user)
		return res
			.status(400)
			.json({ success: false, error: "User not found." })

	user.updateOne({ refreshToken: "" })

	res.cookie("accessToken", "")
	res.cookie("refreshToken", "")

	return res.json({ success: true })
})

module.exports = router
