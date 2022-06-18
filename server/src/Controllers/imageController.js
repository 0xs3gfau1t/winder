const { grid } = require("../Config/storage")
const { userModel } = require("../Models/userModel")

const putImg = async (req, res) => {
	if (req.file === undefined) return res.send("you must select a file.")
	// const imgUrl = `http://localhost:8080/file/${req.file.filename}`

	await userModel.findOneAndUpdate(
		{ _id: req.userdata._id },
		{ images: req.file.filename }
	)

	return res.send(req.file.filename)
}

const getImg = async (req, res) => {
	try {
		const file = await grid.gfs.files.findOne({
			filename: req.params.filename,
		})
		const readStream = grid.gridfsBucket.openDownloadStream(file._id)
		readStream.pipe(res)
	} catch (error) {
		console.log(error)
		res.send("not found")
	}
}

const delImg = async (req, res) => {
	const user = await userModel.findOne({ _id: req.userdata._id }, ["images"])
	try {
		await gfs.files.deleteOne({ filename: user.images })
		res.send("success")
	} catch (error) {
		console.log(error)
		res.send("An error occured.")
	}
}

module.exports = { putImg, getImg, delImg }
