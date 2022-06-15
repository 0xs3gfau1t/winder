require('dotenv').config()

const express = require('express');

const router = express.Router();

const { getList, updateAcceptStatus } = require('../Controllers/exploreController');

router.get("/", auth , getList);

router.post("/accept", auth, updateAcceptStatus);

module.exports = router;