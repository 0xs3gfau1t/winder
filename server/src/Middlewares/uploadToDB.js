const path = require("path")
const multer = require("multer")

const { storage } = require("../Config/storage")

function checkFileType(file, callback) {
	const whitelistExt = [".jpg", ".png", ".jpeg", ".gif"]
	const whitelistMime = ["image/jpg", "image/png", "image/jpeg", "image/gif"]

	const ext = whitelistExt.includes(
		path.extname(file.originalname).toLowerCase()
	)
	const mime = whitelistMime.includes(file.mimetype)

	if (ext && mime) return callback(null, true)
	else callback("Not image")
}

const upload = multer({
	storage: storage,
	fileFilter: async function (req, file, callback) {
		try {
			const user = await userModel.findOne({ _id: req.userdata._id }, [
				"images",
			])
			const nextIdx = user.images.length

			if (nextIdx >= 9 && req.body.isDP !== "true")
				callback("ImageList Full")

			req.user = user
			req.imgIdx = nextIdx
			checkFileType(file, callback)
		} catch (err) {
			callback("UserFetch Fail")
		}
	},
	limits: {
		fileSize: 3 * 1024 * 1024, // 3MB
	},
})
module.exports = { upload }
