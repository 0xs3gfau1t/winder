const { userModel } = require("../Models/userModel")

const imgSpotVacant = async (req, res, next) => {
	try {
		const user = await userModel.findOne({ _id: req.userdata._id }, [
			"images",
		])
		const nextIdx = user.images.length

		if (nextIdx >= 9)
			return res.status(400).json({
				success: false,
				error: "Cannot add more than 9 images.",
			})

		req.imgIdx = nextIdx
		next()
	} catch (err) {
		return res
			.status(500)
			.json({ success: false, error: "Failed to get user's image list." })
	}
}

module.exports = { imgSpotVacant }
