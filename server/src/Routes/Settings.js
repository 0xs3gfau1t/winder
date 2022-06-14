require('dotenv').config()

const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const auth = require('../Middlewares/authenticateToken');
const { updateProfile, changeEmail, changePassword } = require("../Controllers/updateProfile");

router.patch("/", auth, updateProfile)
	.patch("/changepassword", auth, changePassword)
	.patch("/changeemail", auth, changeEmail);

module.exports = router