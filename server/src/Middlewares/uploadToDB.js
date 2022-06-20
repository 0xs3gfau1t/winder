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

	console.log(file.originalname, file.mimetype)
	console.log(path.extname(file.originalname))

	if (ext && mime) return callback(null, true)
	else callback("Error: Images Only!")
}

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		checkFileType(file, callback)
	},
	limits: {
		fileSize: 3 * 1024 * 1024, // 3MB
	},
})
module.exports = { upload }
