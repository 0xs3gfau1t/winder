const mongoose = require("mongoose")

const REQUIRED_PASSIONS = 3

let userPublicSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	university: {
		type: String,
		required: true
	},
	gender: {
		type: Number,	// (F, N, M) = (-1, 0, 1)
		required: true
	},
	program: {
		type: String,
		required: true
	},
	batch: {
		type: Number,
		required: true
	},
	bio: {
		type: String,
	},
	passion: {
		type: [String],
		validate: [
			size => size.length>=REQUIRED_PASSIONS,
			`Passions must be greater than ${REQUIRED_PASSIONS}`
		]
	}
})
pubModel = mongoose.model("Public", userPublicSchema);

let userConfSchema = mongoose.Schema({
	genderPreference: {
		type: Number,	// 	(F, N, M) = (-1, 0, 1)
		required: true
	}
})
confModel = mongoose.model("Conf", userConfSchema);

let userSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	dob:{
		type: Date,
		required: true
	},
	createdDate:{
		type: Date,
		required: true
	},
	refreshToken: {
		type: String,
	},
	pubDetails:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Public",
		required: true
	},
	confDetails:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conf",
		required: true
	}
})
userModel = mongoose.model("User", userSchema);

module.exports.userModel = userModel;
module.exports.userConfModel = confModel;
module.exports.userPublicModel = pubModel;
