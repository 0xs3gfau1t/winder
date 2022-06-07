//
//
//	This file is guide to how to operate
//	with database connection instance
//	and how to add data
//
//


require('dotenv').config()

const path = require("path")
const express = require('express');

// Get all schemas to work with
_userSchemas = require(path.resolve(__dirname, "../Models/userModel.js"));
_relationSchemas = require(path.resolve(__dirname, "../Models/relationModel.js"));
_notificationSchemas = require(path.resolve(__dirname, "../Models/notificationModel.js"));

const router = express.Router();

// Connection instance of MongoDB
conn = require(path.resolve(__dirname, "../Config/db.js"));

router.route("/")
	.get((req, res)=>{
		res.send("Database page");
	})
	.post((req, res)=>{
		res.send("POST DATABASE");
	});

//
// Uploading dummy data
//

// Dummy public data
pub_user = {
	name: "Hency",
	university: "TU",
	gender: 1,
	program: "BCT",
	batch: 2076,
	bio: "Hemlo henci",
	passion: ["Cycling","Movies","Computers"]
}
u_public_model = conn.model('Public', _userSchemas.userPublicSchema);
u_public_model_data = new u_public_model(pub_user);
// Do not save here, we can save with just one .save() at last

// Configurable data
conf_user = {
	gender_preference: -1,
}
u_conf_model = conn.model('Conf', _userSchemas.userConfSchema);
u_conf_model_data = new u_conf_model(conf_user);

// Private data
private_user = {
	email: "hemlo@hemlo.com",
	dob: Date.now(),
	created_date: Date.now(),

	// Add the two non saved and compiled models with data here
	pub_details: u_public_model_data,
	conf_details: u_conf_model_data
}

u_private_model = conn.model('Private', _userSchemas.userSchema);

// Creating 10 similar but seperate entries
for (let i=0;i<10;i++){	
	u_private_model_data = new u_private_model(private_user);
	u_private_model_data.save((err, data)=>{
		if(err){
			console.log("Cant save data");
			console.log(err);
		}
	});
}

module.exports = router