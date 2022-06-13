const mongoose = require("mongoose")

// Enums for notification types
const NotificationTypes = {
	LIKED: 0,
	MATCHED: 1,
	PROMOTIONS: 2,
}

notificationSchema = mongoose.Schema(
	{
		type: { type: Number, required: true }, // Use notification types enum
		content: { type: String, default: "" },
		read: { type: Boolean, default: false },
		user: { type: mongoose.Types.ObjectId, ref: "User" }, // if the user is not set this notification is sent to everyone
	},
	{ timestamps: true }
)
const notificationModel = mongoose.model("Notification", notificationSchema)

module.exports = { notificationModel, NotificationTypes }
