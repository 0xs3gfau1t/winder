const mongoose = require("mongoose");

// Enums for notification types
NotificationTypes = {
	LIKED:0,
	MATCHED:1,
	PROMOTIONS:2	
};

// Disables adding new enums
Object.freeze(NotificationTypes);

notificationSchema = mongoose.Schema({
	type: Number,	// Use NotificationTypes during operations
	content: String,
	time: Date,
	read: Boolean
});

module.exports = notificationSchema;