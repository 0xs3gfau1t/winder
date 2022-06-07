const { sign, verify } = require("jsonwebtoken")

function generateToken(userdata) {
	return sign(userdata, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '10m',
	})
}

function verifyToken(token) {
	try {
		const data = verify(token, process.env.ACCESS_TOKEN_SECRET)
		return { data, expired: false }
	} catch (err) {
		return { data: null, expired: err.message.includes("jwt expired") }
	}
}

exports.generateToken = generateToken
exports.verifyToken = verifyToken
