//
//  This file will contain static variables used in the app
//

const changeableData = {
	universityPreference: true,
	programPreference: true,
	genderPreference: true,
	agePreference: true,
	passion: true,
	gender: true,
	bio: true,
	refreshToken: false,
	university: true,
	firstName: false,
	lastName: false,
	password: false,
	username: false,
	program: true,
	email: false,
	batch: false,
	name: false,
	dob: false,
}

const options = {
	gender: ["male", "female", "other"],
	programs: ["Any", "BArch", "BCE", "BCT", "BEL", "BEX", "BME", "BAM", "BGE"],
	universities: [
		"Any",
		"TU",
		"PU",
		"PoU",
		"KU",
		"NSU",
		"MWU",
		"FWU",
		"LBU",
		"AFU",
		"BPKHS",
		"GU",
	],
	age: [18, 50],
	passions: [
		"Photography",
		"Reading",
		"Sports",
		"Anime",
		"Manga",
		"Coding",
		"Gym",
		"Walking",
		"Traveling",
		"Hiking",
		"Cricket",
		"Football",
		"Movies",
		"Netflix",
		"Skateboarding",
		"Singing",
		"Coffee",
		"Electronic Music",
		"Vlogging",
		"Fishing",
		"Camping",
		"Picnicking",
		"Yoga",
	],
	bio: 500,
}

const genderMapper = gender => {
	const genderMap = { male: 1, female: -1, other: 0 }
	return genderMap[gender]
}

module.exports = { changeableData, options, genderMapper }
