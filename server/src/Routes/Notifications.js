require('dotenv').config()

const express = require('express');

const router = express.Router();

router.route("/")
	.get((req, res)=>{
		res.json({nofification: "Hemlo"});
	})

module.exports = router