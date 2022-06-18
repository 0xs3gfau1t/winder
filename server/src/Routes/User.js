require("dotenv").config();

const express = require("express");

const router = express.Router();

const auth = require("../Middlewares/authenticateToken");
const { userModel } = require("../Models/userModel");

const { options } = require("../Utils/variables");

router.get("/options", (req, res) => {
  res.json(options);
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await userModel.findOne(
      { _id: req.userdata._id },
      {
        refreshToken: 0,
        pagination: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    let result = user.toJSON();
    res.json({ success: true, result });
  } catch (err) {
    res.json({ success: false, error: "Failed to retrieve user info." });
  }
});

module.exports = router;
