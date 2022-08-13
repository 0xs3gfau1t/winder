require("../Config/db")()

ObjectId = require("mongoose").Types.ObjectId

const fs = require("fs")
const bcrypt = require("bcrypt")
const { userModel } = require("../Models/userModel")
const { relationModel, messagesModel } = require("../Models/relationModel")
const { notificationModel } = require("../Models/notificationModel")

const { options, genderMapper } = require("./variables")
const path = require("path")
const { Mongoose } = require("mongoose")

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

const randomDate = (low, high) => {
	const currYear = new Date().getFullYear()

	let near = new Date(new Date().setFullYear(currYear - low))
	let far = new Date(new Date().setFullYear(currYear - high))

	return new Date(+far + Math.random() * (near - far))
}

const randomProp = arr => {
	return arr[Math.floor(Math.random() * arr.length)]
}

const populateDB = async count => {
	const file_path = path.join(__dirname, "populateData.json")
	let usersInfo
	try {
		usersInfo = require(file_path)
	} catch (err) {
		usersInfo = []
	}

	const genders = options.gender.map(item => genderMapper(item))
	for (let i = 0; i < count; i++) {
		let email = `${randomString(6, 15)}@gmail.com`
		let password = randomString(8, 16)

		var user = userModel({
			firstName: randomString(4, 15),
			lastName: randomString(4, 15),
			username: randomString(5, 10), // Comment if you want to create unverified users
			university: randomProp(options.universities),
			gender: randomProp(genders),
			program: randomProp(options.programs),
			batch: randomDate(0, 10).getFullYear(),
			bio: randomString(40, 10),
			passion: [...Array(3)].map(_ => randomProp(options.passions)),
			// Comment this if you want default preferences
			preference: {
				gender: randomProp(genders),
				program: randomProp(options.programs),
				university: randomProp(options.universities),
				age: [18, 40],
			},
			email,
			password: await bcrypt.hash(password, 10),
			dob: randomDate(options.age[0], options.age[1]),
		})

		await user.save({ validateBeforeSave: false })

		await uploadImg(email, password)

		usersInfo.push({ ...user._doc, password })

		console.log(`Saved user ${i + 1}/${count}`)
	}
	fs.writeFileSync(file_path, JSON.stringify(usersInfo, null, 2))
	console.log("Saved to file")
}

const uploadImg = async (email, password) => {
	try {
		const BASE_URL = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`

		let login_res = await fetch(`${BASE_URL}/api/auth/login/`, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({ email, password }),
		}).catch(err => console.log("Login error: ", err))

		const maxImg = 3 // Change to 9
		const num = Math.ceil(Math.random() * maxImg)
		console.log(`Uploading ${num} images for email: ${email}`)

		const img_url = "https://www.thispersondoesnotexist.com/image"
		for (let i = 0; i < num; i++) {
			const image = await fetch(img_url)
				.then(res => res.blob())
				.catch(err => {
					console.log("Image download error: ")
					throw err
				})

			const form = new FormData()
			form.set("file", image, "image.jpg")

			await fetch(`${BASE_URL}/api/image/`, {
				method: "POST",
				headers: {
					Cookie: login_res.headers.get("set-cookie"),
				},
				body: form,
			})
				.then(res => res.json())
				.then(res => console.log(res))
				.catch(err => {
					console.log("Image upload error: ")
					throw err
				})
		}
	} catch (err) {
		console.log(err)
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

const populateNoti = async (count, id) => {
	if (id === undefined) id = await userModel.find({}, { _id: 1 })
	for (let i = 0; i < count; i++) {
		try {
			const noti = notificationModel({
				type: Math.ceil(Math.random() * 2),
				title: randomString(15, 5),
				content: randomString(50, 20),
				user: ObjectId(id),
			})
			await noti.save()
			console.log(`[+] ${i + 1}/${count}`)
		} catch (err) {
			console.log(`[*] ${i}/${count}`)
		}
	}
}

//populateDB(1000)
//populateMessage(100)
