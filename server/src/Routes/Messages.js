require('dotenv').config()

const express = require('express');
const { getConvoList, getMessages, sendMessage } = require('../Controllers/messageController');

const router = express.Router();

router.get("/:id", getMessages)
router.post("/:id", sendMessage)
router.get("/", getConvoList)

module.exports = router