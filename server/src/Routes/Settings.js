require("dotenv").config()

const express = require("express")
const router = express.Router()

const authenticateToken = require("../Middlewares/authenticateToken")

const {
	updateProfile,
	verifyEmail,
	changePassword,
	sendEmailVerificationLink,
	getUserInfo,
} = require("../Controllers/updateProfile")

router
	.get("/options", (req, res) =>
		res.json(require("../Utils/variables").options)
	)
	.get("/", authenticateToken, getUserInfo)
	.post("/verifyemail/:token", verifyEmail)
	.post("/verifyemail", authenticateToken, sendEmailVerificationLink)
	.patch("/changepassword", authenticateToken, changePassword)
	.patch("/", authenticateToken, updateProfile)

module.exports = router
