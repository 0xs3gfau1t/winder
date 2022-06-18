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
const { imgSpotVacant } = require("../Middlewares/imgSpotVacant")

router
	.get("/options", (req, res) =>
		res.json(require("../Utils/variables").options)
	)
	.get("/", authenticateToken, getUserInfo)
	.post("/verifyemail/:token", verifyEmail)
	.post("/verifyemail", authenticateToken, sendEmailVerificationLink)
	.patch("/changepassword", authenticateToken, changePassword)
	.patch("/", authenticateToken, updateProfile)

// User images
router.post(
	"/img",
	authenticateToken,
	imgSpotVacant,
	upload.single("file"),
	putImg
)
router.get("/img/:id", getImg)
router.delete("/img/:id", authenticateToken, delImg)

module.exports = router
