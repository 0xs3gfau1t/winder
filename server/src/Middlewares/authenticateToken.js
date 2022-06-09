const { user_model } = require("../Models/userModel")
const { verifyToken, generateToken } = require("../Utils/jwtUtil")

/* 
        This is a middleware used for verifying the jwt.
        The token is received in 'accessToken' cookies of 
		the request. The data contained by the token is then
		available in `userdata` property of the request object.
*/

module.exports = async function authenticateToken(req, res, next) {
	const { accessToken, refreshToken } = req.cookies

	if (!accessToken)
		return res
			.status(400)
			.json({ success: false, error: "Access token missing." })

	const { data, expired } = verifyToken(accessToken)

	// Valid access token
	if (data) {
		req.userdata = data
		return next()
	}

	// Invalid access token
	if (!expired)
		return res
			.status(400)
			.json({ success: false, error: "Invalid access token." })

	// Expired access token, try to create new accesstoken using the refresh token
	// Missing refresh token
	if (!refreshToken)
		return res
			.status(400)
			.json({ success: false, error: "Refresh token missing." })

	const userCount = await user_model.count({
		refresh_token: refreshToken,
	})

	// Expired session
	if (!userCount) {
		return res
			.status(400)
			.json({ success: false, error: "Session expired" })
	}

	const { data: refreshData, expired: refreshExpired } = verifyToken(refreshToken)

	// Valid refresh token
	if (refreshData) {
		const newAccessToken = generateToken({ _id: refreshData._id })
		res.cookie("accessToken", newAccessToken)
		req.userdata = { _id: refreshData._id }
		return next()
	}

	// Invalid refresh token
	if (!refreshExpired)
		return res
			.status(400)
			.json({ success: false, error: "Invalid refresh token" })

	// Expired refresh token
	user_model.deleteOne({ refresh_token: refreshToken })
	return res
		.status(400)
		.json({ success: false, error: "Access token expired." })
}
