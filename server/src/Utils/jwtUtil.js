const { sign, verify } = require("jsonwebtoken")

function generateToken(userdata, expiresIn = "5s") {
	return sign(userdata, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

function verifyToken(token, ignoreExpired = false) {
	try {
		const data = verify(token, process.env.ACCESS_TOKEN_SECRET, {
			ignoreExpiration: ignoreExpired,
		})
		return { data, expired: ignoreExpired ? true : false }
	} catch (err) {
		return { data: null, expired: err.message.includes("jwt expired") }
	}
}

module.exports = { generateToken, verifyToken }
