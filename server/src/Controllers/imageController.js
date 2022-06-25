const { default: mongoose } = require("mongoose")
const { grid } = require("../Config/storage")
const { userModel } = require("../Models/userModel")

const putImg = async (req, res) => {
	if (req.file === undefined) return res.send("you must select a file.")

	const user = req.user
	if (req.body.isDP === "true" && user.images.length > 0) {
		grid.gridfsBucket.delete(mongoose.Types.ObjectId(user.images[0]))
		user.images[0] = req.file.id
	} else {
		user.images.push(req.file.id)
	}
	await user.save({ validateBeforeSave: false }) // Remove this validateBeforeSave

	return res.json({ success: true, id: req.file.id })
}

const getImg = async (req, res) => {
	try {
		const readStream = grid.gridfsBucket.openDownloadStream(
			mongoose.Types.ObjectId(req.params.id)
		)

		readStream.on("error", err => {
			console.log(err)
			return res.json({ success: false, error: "Image not found" })
		})

		readStream.pipe(res)
	} catch (error) {
		console.log(error)
		res.json({ success: false, error: "Invalid id." })
	}
}

const delImg = async (req, res) => {
	const { id } = req.params
	if (
		!(await userModel.exists({
			_id: req.userdata._id,
			images: id,
		}))
	)
		return res.status(400).json({
			success: false,
			error: "Bruh this ain't your image.",
		})

	try {
		grid.gridfsBucket.delete(mongoose.Types.ObjectId(id))
		await userModel.updateOne(
			{ _id: req.userdata._id },
			{ $pull: { images: id } }
		)
		res.json({ success: true })
	} catch (error) {
		console.log(error)
		res.json({ success: false, error: "Failed to delete the file." })
	}
}

module.exports = { putImg, getImg, delImg }
