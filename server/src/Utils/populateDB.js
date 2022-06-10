require("../Config/db")()

const fs = require("fs")
const bcrypt = require("bcrypt")
const { userModel, confModel, pubModel } = require("../Models/userModel")

const availableOptions = {
	university: ["TU", "PU", "KU", "PoU"],
	gender: [-1, 0, 1],
	program: ["BArch", "BCE", "BCT", "BEL", "BEX", "BME", "BAM", "BGE"],
	batch: [2074, 2075, 2076, 2077, 2078],
	passion: [
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
	genderPreference: [-1, 0, 1],
}

const randomString = (max, min) => {
	var length = Math.floor(Math.random() * (max - min)) + min
	var result = ""
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * 62))
	}
	return result
}

const randomProp = arr => {
	return arr[Math.floor(Math.random() * arr.length)]
}

const populateDB = async count => {
	for (let i = 0; i < count; i++) {
		var userPublic = pubModel({
			name: randomString(4, 15),
			university: randomProp(availableOptions.university),
			gender: randomProp(availableOptions.gender),
			program: randomProp(availableOptions.program),
			batch: randomProp(availableOptions.batch),
			bio: randomString(40, 10),
			passion: [...Array(3)].map((_, i) =>
				randomProp(availableOptions.passion)
			),
		})

		var userConf = confModel({
			genderPreference: randomProp(availableOptions.genderPreference),
		})

		let email = randomString(6, 15)
		let password = randomString(4, 8)
		fs.appendFile(
			"userCreds.txt",
			`Email: ${email}\nPassword: ${password}\n\n`,
			err => console.log(err ? "Creds not saved" : "")
		)

		var User = userModel({
			email,
			password: await bcrypt.hash(password, 10),
			pubDetails: userPublic._id,
			confDetails: userConf._id,
		})

		await userPublic.save()
		await userConf.save()
		await User.save()

		console.log(`Saved user ${i+1}/${count}`)
	}
}

populateDB(100)
