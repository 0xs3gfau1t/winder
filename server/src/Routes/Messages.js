require('dotenv').config()

const express = require('express');

const router = express.Router();

router.route("/")
	.get((req, res)=>{
		res.json({person1: "Message1"});
	})

module.exports = router