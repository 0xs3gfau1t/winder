const mongoose = require("mongoose")

const REQUIREDPASSIONS = 3

let UserPublicSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
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
			size => size.length>=REQUIREDPASSIONS,
			`Passions must be greater than ${REQUIREDPASSIONS}`
		]
	}
})

let UserConfSchema = mongoose.Schema({
	genderPreference: {
		type: Number,	// 	(F, N, M) = (-1, 0, 1)
		required: true
	},
	programPreference: {
		type: String
	},
	universityPreference: {
		type: String
	},
	agePreference: {
		type: [Number]	// [min, max]
	}
})

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
		// required: true
	},
	confDetails:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conf",
		// required: true
	}
})

pubModel = mongoose.model("Public", UserPublicSchema);
confModel = mongoose.model("Conf", UserConfSchema);
userModel = mongoose.model("User", UserSchema);

module.exports = {userModel, confModel, pubModel}
