const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") })

const express = require("express")
const bcrypt = require("bcrypt")

const { generateToken } = require("../Utils/jwtUtil")

const router = express.Router()

let dummy_user_table = [
	{
		_id: 0,
		email: "elliot@evil.com",
		hashedpassword:
			"$2b$10$rjZoVBVx9NlKf7Muakgag.Gm50Vuo1wNKaYRVExlbEUPIaFJ9bFAC",
	}, // "Hello Friend"
	{
		_id: 1,
		email: "rinki@gmail.com",
		hashedpassword:
			"$2b$10$xb/9fiNvVQOw7.A3f6ZlX.j6AEis1ldP1NT10Pcbv1glXd8rb.uVS",
	}, // "rinkiyaKePapa"
	{
		_id: 2,
		email: "lalipop@lel.com",
		hashedpassword:
			"$2b$10$WZPJydTE7gCfB12HU/fPI.K506hbX/X/C9ujjbTYufeqU7qtxZAue",
	}, // "kamariya"
]

router.post("/register", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: "Either email or password is missing.",
		})

	const user = dummy_user_table.filter(entry => entry.email === email)

	if (user.length)
		return res.status(400).json({
			success: false,
			error: "User already exists with this email.",
		})

	const hashedpassword = await bcrypt.hash(password, 10)
	const _id = dummy_user_table.length
	dummy_user_table.push({ _id, email, hashedpassword })

	const userdata = { _id }
	const accessToken = generateToken(userdata)
	res.cookie("accessToken", accessToken)

	return res.json({ success: true })
})

router.post("/login", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password)
		return res.status(400).json({
			success: false,
			error: "Either email or password is missing.",
		})

	const user = dummy_user_table.filter(entry => entry.email === email)

	if (!user.length)
		return res.status(400).json({
			success: false,
			error: "No user with this email.",
		})

	if (await bcrypt.compare(password, user[0].hashedpassword)) {
		const userdata = { email: user[0]._id }
		const accessToken = generateToken(userdata)
		res.cookie("accessToken", accessToken)

		return res.json({ success: true })
	}

	return res.status(400).json({ success: false, error: "Invalid password" })
})

module.exports = router
