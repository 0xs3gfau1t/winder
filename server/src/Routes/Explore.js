require('dotenv').config()

const express = require('express');

const router = express.Router();

const auth = require('../Middlewares/authenticateToken');

const { getList, updateAcceptStatus } = require('../Controllers/exploreController');

router.get("/", auth ,async (req, res)=>{
	res.json(
		await getList(req.userdata._id)
	);
});

router.post("/accept", auth, async (req, res) =>{
	res.json(
		await updateAcceptStatus(req.userdata._id, req.body.whom)
	);
});

module.exports = router;