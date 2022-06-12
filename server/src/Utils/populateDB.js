require("../Config/db")()

ObjectId = require("mongoose").Types.ObjectId

const fs = require("fs")
const bcrypt = require("bcrypt")
const { userModel } = require("../Models/userModel")
const { relationModel, messagesModel } = require("../Models/relationModel")

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
	agePreference: [18, 50],
	dob: [1990, 1999, 1995, 2000, 1980, 1993, 2002, 2003, 2005],
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
		let email = randomString(6, 15)
		let password = randomString(4, 8)
		fs.appendFile(
			"userCreds.txt",
			`Email: ${email}\nPassword: ${password}\n\n`,
			err => console.log(err ? "Creds not saved" : "")
		)

		var user = userModel({
			name: randomString(4, 15),
			username: randomString(5, 10),
			university: randomProp(availableOptions.university),
			gender: randomProp(availableOptions.gender),
			program: randomProp(availableOptions.program),
			batch: randomProp(availableOptions.batch),
			bio: randomString(40, 10),
			passion: [...Array(3)].map((_, i) =>
				randomProp(availableOptions.passion)
			),
			// Uncomment this if you want random preference instead of preferred ones
			// preference: {
			// 	gender: randomProp(availableOptions.genderPreference),
			// 	program: randomProp(availableOptions.program),
			// 	university: randomProp(availableOptions.university),
			// 	age: [18, 40],
			// },
			email,
			password: await bcrypt.hash(password, 10),
			dob: new Date(randomProp(availableOptions.dob), 0),
		})

		await user.save()

		console.log(`Saved user ${i + 1}/${count}`)
	}
}

const populateMessage = async count => {
	var userIds = await userModel.find({}, { _id: 1 })
	userIds = userIds.map(userId => userId._id)

	const user1 = randomProp(userIds)
	const user2 = randomProp(userIds.filter(user => user._id !== user1))
	console.log({ user1, user2 })

	const relation = await relationModel.create({
		users: [user1, user2],
		stat: true,
		unreadCount: 0,
		messages: [],
	})

	for (let i = 0; i < count; i++) {
		var msg = await messagesModel.create({
			content: randomString(40, 10),
			sender: randomProp([0, 1]),
		})

		relation.messages.push(msg)

		console.log(`Created message ${i + 1}/${count}`)
	}
	await relation.save()
}

// populateDB(100)
populateMessage(100)
