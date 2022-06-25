const express = require("express")

const router = express.Router()

// Middlewares
const authenticateToken = require("../Middlewares/authenticateToken")
const { upload } = require("../Middlewares/uploadToDB")

// Controllers
const { putImg, getImg, delImg } = require("../Controllers/imageController")
const multer = require("multer")

router.post(
	"/",
	authenticateToken,
	function (req, res, next) {
		upload.single("file")(req, res, function (err) {
			if (!err) return next()
			// Error Handling
			if (err === "Not image") {
				return res.json({
					success: false,
					error: "Provided file is not an image.",
				})
			} else if (err === "ImageList Full") {
				return res.json({
					success: false,
					error: "Cannot add more than 9 photos.",
				})
			} else if (err === "UserFetch Fail") {
				return res.json({
					success: false,
					error: "Failed to fetch user's info.",
				})
			}
			res.json({ success: false, error: "Unknown error." })
		})
	},
	putImg
)
router.get("/:id", getImg)
router.delete("/:id", authenticateToken, delImg)

module.exports = router
