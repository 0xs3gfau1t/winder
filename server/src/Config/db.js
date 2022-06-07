const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") })
const mongoose = require("mongoose")

/*
		Connect to Database at the beginning
		Because all other functions depend on this
		Or make seperate file to initiate connection
		and export all needed functions?
*/
// mongoose.connect(process.env.MONGO_URI,
//				 { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose
