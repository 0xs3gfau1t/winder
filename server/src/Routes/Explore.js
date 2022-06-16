require("dotenv").config()

const express = require("express")

const router = express.Router()

const {
	getList,
	updateAcceptStatus,
} = require("../Controllers/exploreController")

router.get("/", getList)

router.post("/accept", updateAcceptStatus)

module.exports = router
