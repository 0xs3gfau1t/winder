const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { generateToken } = require("../Utils/jwtUtil");
const { userModel } = require("../Models/userModel");
const authenticateToken = require("../Middlewares/authenticateToken");
const { options } = require("../Utils/variables");

router.post("/register", async (req, res) => {
  let { email, password, dob, gender, firstName, lastName } = req.body;
  if (!email || !password || !dob || !gender || !firstName || !lastName)
    return res.status(400).json({
      success: false,
      error: "One or more field is missing.",
    });

  const userCount = await userModel.count({ email });

  if (userCount)
    return res.status(400).json({
      success: false,
      error: "User already exists with this email.",
    });

  const hashedpassword = await bcrypt.hash(password, 10);

  // Validate all data
  // If data is none, no field will be crated in db, thenks mongoose
  let u = {
    email,
    password: hashedpassword,
    dob: dob,
    firstName,
    lastName,
  };
  const genderMap = { male: 1, female: -1, other: 0 };
  gender = genderMap[gender];
  if (gender in options.gender) u.gender = gender;

  console.log(u);
  const new_user = userModel(u);

  const userdata = { _id: new_user._id };
  const accessToken = generateToken(userdata);
  const refreshToken = generateToken(userdata, "1d");
  res.cookie("accessToken", accessToken);
  res.cookie("refreshToken", refreshToken);

  new_user.refreshToken = refreshToken;
  try {
    await new_user.save({ validateBeforeSave: false });
    return res.json({ success: true, id: new_user._id });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, error: "Failed to create user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      error: "Either email or password is missing.",
    });

  const user = await userModel.findOne(
    { email },
    { email: 1, password: 1, refreshToken: 1 }
  );

  if (!user)
    return res.status(400).json({
      success: false,
      error: "No user with this email.",
    });

  if (await bcrypt.compare(password, user.password)) {
    const userdata = { _id: user._id };
    const accessToken = generateToken(userdata);
    const refreshToken = generateToken(userdata, "1d");
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    await user.updateOne({ refreshToken: refreshToken });
    return res.json({ success: true, id: user._id });
  }

  return res.status(400).json({ success: false, error: "Invalid password" });
});

router.delete("/logout", authenticateToken, async (req, res) => {
  const user = await userModel.find({ _id: req.userdata._id }).limit(1);
  if (!user)
    return res.status(400).json({ success: false, error: "User not found." });

  user.updateOne({ refreshToken: "" });

  res.cookie("accessToken", "");
  res.cookie("refreshToken", "");

  return res.json({ success: true });
});

module.exports = router;
