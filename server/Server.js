// Import all environment variables from .env
// Requires dotenv module
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Configure middlewares
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


/*
		Connect to Database at the beginning
		Because all other functions depend on this
		Or make seperate file to initiate connection
		and export all needed functions?
*/
// mongoose.connect(process.env.MONGO_URI,
//				 { useNewUrlParser: true, useUnifiedTopology: true });

// Routing each endpoint to respective routers
app.use("/auth", require('./Auth.js'));
app.use("/messages", require('./Messages.js'));
app.use("/notification", require('./Notifications.js'));
app.use("/settings", require('./Settings.js'));
app.use("/explore", require('./Explore.js'));
app.use("/profile", require('./Profile.js'));


// Start the server specied in PORT from .env
app.listen(process.env.PORT, ()=>{
	console.log("Lisening in port "+process.env.PORT);
})