require("dotenv").config()

const express = require("express")
const router = express.Router()

const authenticateToken = require("../Middlewares/authenticateToken")

const {
	updateProfile,
	verifyEmail,
	changePassword,
	sendEmailVerificationLink,
} = require("../Controllers/updateProfile")

router
	.post("/verifyemail/:token", verifyEmail)
	.post("/verifyemail", authenticateToken, sendEmailVerificationLink)
	.patch("/changepassword", authenticateToken, changePassword)
	.patch("/", authenticateToken, updateProfile)

module.exports = router
