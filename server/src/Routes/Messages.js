require('dotenv').config()

const express = require('express');
const { getConvoList, getMessages, sendMessage } = require('../Controllers/messageController');

const router = express.Router();

router.get("/", getConvoList)
router.get("/:id", getMessages)
router.post("/:id", sendMessage)

module.exports = router