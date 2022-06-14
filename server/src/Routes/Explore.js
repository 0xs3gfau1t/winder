require('dotenv').config()

const express = require('express');

const router = express.Router();

const { getList, updateAcceptStatus } = require('../Controllers/exploreController');

router.get("/", async (req, res)=>{
	res.json(
		await getList(req.userdata._id)
	);
});

router.post("/accept", async (req, res) =>{
	res.json(
		await updateAcceptStatus(req.userdata._id, req.body.whom)
	);
});

module.exports = router;