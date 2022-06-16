const { userModel } = require("../Models/userModel")
const { verifyToken, generateToken } = require("../Utils/jwtUtil")

/* 
        This is a middleware used for verifying the jwt.
        The token is received in 'accessToken' cookies of 
		the request. The data contained by the token is then
		available in `userdata` property of the request object.
*/

module.exports = async function authenticateToken(req, res, next) {
	const { accessToken } = req.cookies

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
	let user = null
	try {
		user = await userModel.findOne({ _id: data._id }, ["refreshToken"])
	} catch (e) {
		try {
			const { data: dataTemp, expired: expiredTemp } = verifyToken(
				accessToken,
				(ignoreExpired = true)
			)
			user = await userModel.findOne({ _id: dataTemp._id }, [
				"refreshToken",
			])
		} catch (e) {
			return res
				.status(400)
				.json({ success: false, error: "Tampered access token" })
		}
	}

	// Missing refresh token
	if (!user || user.refreshToken === "" || !user.refreshToken)
		return res
			.status(400)
			.json({ success: false, error: "Session expired." })

	const { data: refreshData, expired: refreshExpired } = verifyToken(
		user.refreshToken
	)

	// Valid refresh token
	if (refreshData) {
		const newPayload = {
			_id: refreshData._id,
			email_verified: refreshData.email_verified,
		}
		const newAccessToken = generateToken(newPayload)
		res.cookie("accessToken", newAccessToken)
		req.userdata = newPayload
		return next()
	}

	// Invalid refresh token
	if (!refreshExpired)
		return res
			.status(400)
			.json({ success: false, error: "Invalid refresh token" })

	// Expired refresh token
	await user.updateOne({ refreshToken: "" })
	return res
		.status(400)
		.json({ success: false, error: "Refresh token expired. Please re-login." })
}
