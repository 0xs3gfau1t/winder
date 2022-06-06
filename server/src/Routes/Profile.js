require('dotenv').config()

const express = require('express');

const router = express.Router();

router.route("/")
	.get((req, res)=>{
		res.json({profile: [{
			"Name": "Hency",
			"Age" : 20,
			"Gender": "Male",	//Male, Female, Other
			"InterestedIn": "Female", 
			"University": "Tribhuvan Biswabidhyalaya",
			"Programme": "BCT",
			"JobStatus": "TeRo bAu lE dEkO xA rA jAgIr",

		}]});
	})

module.exports = router