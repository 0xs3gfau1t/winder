const mongoose = require("mongoose")

const REQUIREDPASSIONS = 3

let userSchema = mongoose.Schema(
	{
		// Received in register
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		gender: {
			type: Number, // (F, N, M) = (-1, 0, 1)
			required: true,
		},
		// Received in register upto here
		username: {
			type: String,
			required: true,
		},
		university: {
			type: String,
			required: true,
		},
		program: {
			type: String,
			required: true,
		},
		batch: {
			type: Number,
			required: true,
		},
		bio: {
			type: String,
			default: "Hi! I am new to Winder.",
		},
		passion: {
			type: [String],
			validate: [
				size => size.length >= REQUIREDPASSIONS,
				`Passions must be greater than ${REQUIREDPASSIONS}`,
			],
		},
		preference: {
			gender: { type: Number }, // (F, N, M) = (-1, 0, 1)
			program: { type: String },
			university: { type: String },
			age: {
				type: [Number],
				default: [18, 25],
				validate: [age => age[0] >= 18, `You creepy bruh.`],
			},
		},
		refreshToken: {
			type: String,
		},
		pagination: {
			newExplore: {
				// Todo: Find a better name
				type: String,
				default: "null",
			},
			incoming: {
				type: String,
				default: "null",
			},
		},
	},
	{ timestamps: true },
	{
		toJSON: {
			getters: true,
			transform: function (doc, ret) {
				delete ret._id
			},
		},
	}
)

userSchema.pre("save", function (next) {
	// Set the gender preference based on the gender of the user.
	if (this.preference.gender === undefined) {
		if (this.gender === -1) this.preference.gender = 1
		else if (this.gender === 1) this.preference.gender = -1
		else this.preference.gender = 0
	}

	// Set university preference same as the user's university
	if (this.preference.university === undefined)
		this.preference.university = this.university

	// Set program preference same as the user's program
	if (this.preference.program === undefined)
		this.preference.program = this.program

	next()
})

//get data in JSON format form model
userSchema.options.toJSON = {
	transform: function (doc, ret, options) {
		delete ret._id
		delete ret.password
		delete ret.__v
		ret.dob = ret.dob.toLocaleDateString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		ret.gender =
			ret.gender == 1 ? "Male" : ret.gender == 0 ? "Female" : "Other"
		return ret
	},
}

userModel = mongoose.model("User", userSchema)

module.exports = { userModel }
