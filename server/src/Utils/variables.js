//
//  This file will contain static variables used in the app
//

const changableData = {
	universityPreference: true,
	programPreference: true,
	genderPreference: true,
	agePreference: true,
	passion: true,
	gender: true,
	bio: true,
	refreshToken: false,
	university: true,
	password: false,
	username: false,
	program: true,
	email: false,
	batch: false,
	name: false,
	dob: false,
}

const options = {
	gender: [-1, 0, 1],
	programs: ["BArch", "BCE", "BCT", "BEL", "BEX", "BME", "BAM", "BGE"],
	universities: [
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
}

module.exports = { changableData, options }
