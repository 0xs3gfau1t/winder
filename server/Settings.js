require('dotenv').config()

const express = require('express');

const router = express.Router();

router.route("/")
	.get((req, res)=>{
		res.send("Settings page");
	})

module.exports = router