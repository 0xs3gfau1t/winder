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

<<<<<<< HEAD
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
=======
	// Validate all data
	// If data is none, no field will be created in db, thenks mongoose
	let u = {
		email,
		password: hashedpassword,
		dob: dob,
		firstName,
		lastName,
	}
	const genderMap = { "male": 1, "female": -1, "other": 0 }
	gender = genderMap[gender]
	if (gender in options.gender) u.gender = gender
>>>>>>> main

  console.log(u);
  const new_user = userModel(u);

<<<<<<< HEAD
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
=======
	const userdata = { _id: new_user._id, email_verified: false }
	const accessToken = generateToken(userdata)
	const refreshToken = generateToken(userdata, "1d")
	res.cookie("accessToken", accessToken, { httpOnly: true })

	new_user.refreshToken = refreshToken
	try {
		await new_user.save({ validateBeforeSave: false })
		return res.json({ success: true, id: new_user._id })
	} catch (e) {
		return res
			.status(400)
			.json({ success: false, error: "Failed to create user." })
	}
})
>>>>>>> main

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      error: "Either email or password is missing.",
    });

<<<<<<< HEAD
  const user = await userModel.findOne(
    { email },
    { email: 1, password: 1, refreshToken: 1 }
  );
=======
	const user = await userModel.findOne(
		{ email },
		{ email: 1, password: 1, refreshToken: 1, username: 1 }
	)
>>>>>>> main

  if (!user)
    return res.status(400).json({
      success: false,
      error: "No user with this email.",
    });

<<<<<<< HEAD
  if (await bcrypt.compare(password, user.password)) {
    const userdata = { _id: user._id };
    const accessToken = generateToken(userdata);
    const refreshToken = generateToken(userdata, "1d");
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);

    await user.updateOne({ refreshToken: refreshToken });
    return res.json({ success: true, id: user._id });
  }
=======
	if (await bcrypt.compare(password, user.password)) {
		console.log(user.username)
		const userdata = {
			_id: user._id,
			email_verified: user.username !== undefined ? true : false,
		}
		const accessToken = generateToken(userdata, "1s")
		const refreshToken = generateToken(userdata, "1d")
		res.cookie("accessToken", accessToken, { httpOnly: true })

		await user.updateOne(
			{ refreshToken: refreshToken },
			{ validateBeforeSave: false }
		)
		return res.json({ success: true, id: user._id })
	}
>>>>>>> main

  return res.status(400).json({ success: false, error: "Invalid password" });
});

router.delete("/logout", authenticateToken, async (req, res) => {
<<<<<<< HEAD
  const user = await userModel.find({ _id: req.userdata._id }).limit(1);
  if (!user)
    return res.status(400).json({ success: false, error: "User not found." });

  user.updateOne({ refreshToken: "" });

  res.cookie("accessToken", "");
  res.cookie("refreshToken", "");
=======
	const user = await userModel.findOne({ _id: req.userdata._id })
	if (!user)
		return res
			.status(400)
			.json({ success: false, error: "User not found." })

	user.refreshToken = ""
	user.save({ validateBeforeSave: false })

	res.cookie("accessToken", "")
>>>>>>> main

  return res.json({ success: true });
});

module.exports = router;
