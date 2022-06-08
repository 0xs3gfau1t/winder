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
mongoose.connect(process.env.MONGO_URI,
				 {
				 	useNewUrlParser: true,
				 	useUnifiedTopology: true,
				 })
				.then(()=>{console.log("Connected")})
				.catch(err=>{console.log(`Cannot connect: ${err}`)});


module.exports = mongoose
