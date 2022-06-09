const { sign, verify } = require("jsonwebtoken")

function generateToken(userdata, expiresIn = "5s") {
	return sign(userdata, process.env.ACCESS_TOKEN_SECRET, { expiresIn })
}

function verifyToken(token) {
	try {
		const data = verify(token, process.env.ACCESS_TOKEN_SECRET)
		return { data, expired: false }
	} catch (err) {
		return { data: null, expired: err.message.includes("jwt expired") }
	}
}

module.exports = { generateToken, verifyToken }
