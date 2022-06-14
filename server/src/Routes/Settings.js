require("dotenv").config()

const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

const {
	updateProfile,
	verifyEmail,
	changePassword,
	sendEmailVerificationLink
} = require("../Controllers/updateProfile")

router
	.post("/verifyemail/:token", verifyEmail)
	.get("/verifyemail", sendEmailVerificationLink)
	.patch("/changepassword", changePassword)
	.patch("/", updateProfile)

module.exports = router
