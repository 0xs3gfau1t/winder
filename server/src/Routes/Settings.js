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
const { putImg, getImg, delImg } = require("../Controllers/imageController")
const { upload } = require("../Middlewares/uploadToDB")

router
	.get("/options", (req, res) =>
		res.json(require("../Utils/variables").options)
	)
	.get("/", authenticateToken, getUserInfo)
	.post("/verifyemail/:token", verifyEmail)
	.post("/verifyemail", authenticateToken, sendEmailVerificationLink)
	.patch("/changepassword", authenticateToken, changePassword)
	.patch("/", authenticateToken, updateProfile)
	.post("/img", authenticateToken, upload.single("file"), putImg)
	.get("/img/:filename", getImg)
	.delete("/img/:fileindex", authenticateToken, delImg)

module.exports = router
