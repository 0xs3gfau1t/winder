const mongoose = require("mongoose")

const REQUIREDPASSIONS = 3
const MAXPASSIONS = 5

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
				size =>
					size.length >= REQUIREDPASSIONS &&
					size.length <= MAXPASSIONS,
				`Passions must be greater than ${REQUIREDPASSIONS} and smaller than ${MAXPASSIONS}`,
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
		images: {
			type: [String],
			validate: [
				imgs => imgs.length <= 9,
				"Cannot add more than 9 images.",
			],
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
	{ timestamps: true }
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

// get data in JSON format form model
userSchema.options.toJSON = {
	transform: function (doc, ret, options) {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.password
		delete ret.__v
		if (ret.dob)
			ret.dob = ret.dob.toLocaleDateString("en-US", {
				day: "numeric",
				month: "long",
				year: "numeric",
			})
		const genderRevMap = { 1: "male", "-1": "female", 0: "other" }

		if (ret.preference?.gender)
			ret.preference.gender = genderRevMap[ret.preference?.gender]

		if (ret.gender) ret.gender = genderRevMap[ret.gender]
		return ret
	},
}

userModel = mongoose.model("User", userSchema)

module.exports = { userModel }
