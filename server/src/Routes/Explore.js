require('dotenv').config()

const express = require('express');

const router = express.Router();

const auth = require('../Middlewares/authenticateToken');

const { getList, updateAcceptStatus } = require('../Utils/exploreUtils');

// Temporary list to keep track of pagination status
// Find a way to implement it in persistence mannder efficiently
// Also, make it accept pagination direction so that
// We can make a premium feature out of it

paginationStatus = {}

router.get("/", auth ,async (req, res)=>{
	let userPage = paginationStatus[req.userdata._id];
	
	if (userPage !== undefined)	userPage++;
	else						userPage = 0;

	paginationStatus[req.userdata._id] = userPage;

	const userList = await getList(req.userdata._id, userPage);

	console.log(paginationStatus);

	res.json(userList);
});

router.post("/accept", auth, async (req, res) =>{
	res.json(
		await updateAcceptStatus(req.userdata._id, req.body.whom)
	);
});

module.exports = router;