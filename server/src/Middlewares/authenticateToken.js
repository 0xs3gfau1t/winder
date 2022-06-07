const { verifyToken } = require("../Utils/jwtUtil")

/* 
        This is a middleware used for verifying the jwt.
        The token is received in 'accessToken' cookies of 
		the request. The data contained by the token is then
		available in `userdata` property of the request object.
*/

module.exports = function authenticateToken(req, res, next) {
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

	// Expired access token
	return res
		.status(400)
		.json({ success: false, error: "Access token expired." })
}
