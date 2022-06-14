const express = require("express")
const router = express.Router()

const authenticateToken = require("../Middlewares/authenticateToken")

const { notificationModel } = require("../Models/notificationModel")

router.get("/", authenticateToken, async (req, res) => {
	try {
		const notis = await notificationModel.find(
			{
				user: req.userdata._id,
				read: false,
			},
			["title", "type"]
		)
		res.json({ success: true, data: notis })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({
			success: false,
			error: "Failed to fetch notifications.",
		})
	}
})

router.get("/:id", authenticateToken, async (req, res) => {
	const { id } = req.params
	try {
		const notification = await notificationModel.findOne(
			{ _id: id, user: req.userdata._id },
			{ user: 0 }
		)
		res.json({ success: true, notification })
	} catch (err) {
		console.log(err.message)
		res.json({ success: false, error: "Failed to fetch notification" })
	}

	// Delete the notification since it has already been read.
	await notificationModel.deleteOne({ _id: id, user: req.userdata._id })
})

module.exports = router
