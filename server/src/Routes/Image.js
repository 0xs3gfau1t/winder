const express = require("express")

const router = express.Router()

// Middlewares
const authenticateToken = require("../Middlewares/authenticateToken")
const { upload } = require("../Middlewares/uploadToDB")
const { imgSpotVacant } = require("../Middlewares/imgSpotVacant")

// Controllers
const { putImg, getImg, delImg } = require("../Controllers/imageController")

router.post(
	"/",
	authenticateToken,
	imgSpotVacant,
	upload.single("file"),
	putImg
)
router.get("/:id", getImg)
router.delete("/:id", authenticateToken, delImg)

module.exports = router
