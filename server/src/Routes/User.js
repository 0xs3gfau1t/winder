require('dotenv').config()

const express = require('express');

const router = express.Router();

const auth = require('../Middlewares/authenticateToken');
const { userModel } = require('../Models/userModel');

router.get("/", auth, (req, res)=>{
    try {
        const user = await userModel.find({_id: req.userdata._id})
        res.json({success: true, user})
    } catch (err) {
        res.json({success: false, error: "Failed to retrieve user info."})
    }
})

module.exports = router;