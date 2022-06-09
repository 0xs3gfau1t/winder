const mongoose = require("mongoose")

const REQUIRED_PASSIONS = 3

let UserPublicSchema = mongoose.Schema({
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
pub_model = mongoose.model("Public", UserPublicSchema);

let UserConfSchema = mongoose.Schema({
	gender_preference: {
		type: Number,	// 	(F, N, M) = (-1, 0, 1)
		required: true
	}
})
conf_model = mongoose.model("Conf", UserConfSchema);

let UserSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	dob:{
		type: Date,
		// required: true
	},
	created_date:{
		type: Date,
		// required: true
	},
	refresh_token: {
		type: String,
	},
	pub_details:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Public",
		// required: true
	},
	conf_details:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conf",
		// required: true
	}
})
user_model = mongoose.model("User", UserSchema);

module.exports = {user_model, conf_model, pub_model}
