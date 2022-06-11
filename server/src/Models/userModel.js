const mongoose = require("mongoose")

const REQUIREDPASSIONS = 3

let userSchema = mongoose.Schema({
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
	refreshToken: {
		type: String,
	},
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
	},
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
}, {timestamps: true})

userModel = mongoose.model("User", userSchema);

module.exports = { userModel }
