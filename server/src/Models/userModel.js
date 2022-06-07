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
		validate: [(size)=>{return size.length<=REQUIRED_PASSIONS}, `Passions must be greater than ${REQUIRED_PASSIONS}`]
	}
})

let UserConfSchema = mongoose.Schema({
	gender_preference: {
		type: Number,	// 	(F, N, M) = (-1, 0, 1)
		required: true
	}
})

let UserSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	dob:{
		type: Date,
		required: true
	},
	created_date:{
		type: Date,
		required: true
	},
	pub_details:{
		type: UserPublicSchema,
		required: true
	},
	conf_details:{
		type: UserConfSchema,
		required: true
	}
})

module.exports.userSchema = UserSchema;
module.exports.userConfSchema = UserConfSchema;
module.exports.userPublicSchema = UserPublicSchema;