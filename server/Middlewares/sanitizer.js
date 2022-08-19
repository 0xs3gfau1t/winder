const { genderMapper } = require("../Utils/variables")
const { options } = require("../Utils/variables")

/**
 * validators is an object with keys as the req.body params
 * and values as a function. This function will receive the
 * value of the req.body param and must return an array where
 * the first element is a boolean and indicates if the data
 * is valid or not, and the second element is the sanitized
 * data. For each property in req.body, corresponding validator
 * is run. The sanitized data can be accessed from the next
 * middleware using req.sanitized object where the user prop
 * is properly sanitized data and validity is feedback on what
 * property was valid.
 */

const validators = {
	email: value => [
		value.match(
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		),
		value,
	],
	password: value => [value.length >= 8, value],
	dob: value => {
		let date = new Date(value)
		return [date instanceof Date && !isNaN(date), date]
	},
	firstName: value => {
		let len = value.length
		return [len <= 100 && len > 0, value]
	},
	lastName: value => {
		let len = value.length
		return [len <= 100 && len > 0, value]
	},
	gender: value => [options.gender.includes(value), genderMapper(value)],
	username: value => [value.length > 0, value],
	university: value => [options.universities.includes(value) && value !== "Any", value],
	program: value => [options.programs.includes(value) && value !== "Any", value],
	batch: value => [!isNaN(value), value],
	bio: value => [value.length <= options.bio, value],
	passion: value => {
		let passions = []
		for (let val of value)
			if (options.passions.includes(val)) passions.push(val)
		return [passions.length > 2, passions]
	},
	genderPreference: value => [
		options.gender.includes(value),
		genderMapper(value),
	],
	programPreference: value => [options.programs.includes(value), value],
	universityPreference: value => [
		options.universities.includes(value),
		value,
	],
	agePreference: value => {
		let lAge = parseInt(value[0])
		let hAge = parseInt(value[1])
		return [
			value.length == 2 &&
				lAge >= options.age[0] &&
				hAge <= options.age[1],
			[lAge, hAge],
		]
	},
}

const sanitizer = async (req, res, next) => {
	let user = req.body
	let sanitizedUser = {}
	let validity = {}

	for (let property in user) {
		let result
		if (property in validators && user[property]) {
			result = validators[property](user[property])
			if (result[0]) {
				sanitizedUser[property] = result[1]
				validity[property] = true
			} else {
				validity[property] = false
			}
		} else {
			validity[property] = false
		}
	}

	req.sanitized = { user: sanitizedUser, validity }
	next()
}

module.exports = sanitizer
