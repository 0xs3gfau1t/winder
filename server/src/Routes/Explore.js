require('dotenv').config()

const express = require('express');

const router = express.Router();

router.route("/")
	.get((req, res)=>{
		let disclosable_profile_info = {
			"Name": "Hency",
			"University": "Hemlo University",
		}
		res.send({
			profile1: disclosable_profile_info,
			profile2: disclosable_profile_info,
			profile3: disclosable_profile_info,
		});
	})

module.exports = router