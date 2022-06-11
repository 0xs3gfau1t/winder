const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") })

const mongoose = require("mongoose")

/*
Ensures commands execute only to real database
Not store in buffer and execute after connection made
*/
// mongoose.set('bufferCommands', false);


/*
		Connect to Database at the beginning
		Because all other functions depend on this
		Or make seperate file to initiate connection
		and export all needed functions?
*/

// If connecting to mongoatlas remove authSource, user and pass options
module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			authSource: "admin",
			user: process.env.MONGO_USER,
			pass: process.env.MONGO_PASS,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log("Connected to the database.")
		return mongoose
	} catch (err) {
		console.log(err)
	}
}
