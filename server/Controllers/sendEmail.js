const mailer = require("../Config/mailer")

async function sendForgotPasswordEmail(mail, token) {
	console.log("Sending mail...")
	console.log("Verification token: ", token)
	try {
		let info = await mailer.sendMail({
			from: process.env.MAILER_ADD,
			to: mail,
			subject: "Winder: Forgot Password",
			text: "This is a automated password request email sent by the server.\
            Please don't reply.",
			html: `\
            <h1>Winder: Password Reset Request</h1>\
            <p>You recently requested to reset your forgotton password. If you don't\
            know about this then please delete this email.</p><br>\
            <b><a href='${process.env.FRONTEND_URL}/resetpassword/${token}'>\
            Click here to change your password</a></b>`, // html body
		})
	} catch (e) {
		console.log(`Error while sending email to: ${mail}\n`, e)
		return false
	}
	return true
}

async function sendVerifyMailEmail(mail, token) {
	console.log("Sending mail...")
	console.log("Verification token: ", token)
	try {
		let info = await mailer.sendMail({
			from: process.env.MAILER_ADD,
			to: mail,
			subject: "Winder: Verify Email",
			text: "This is a automated email verification request sent by the server.\
            Please don't reply.",
			html: `\
            <h1>Winder: Email Verification Request</h1>\
            <p>You recently requested to verify your email. If you don't\
            know about this then please delete this email.</p><br>\
            <b><a href='${process.env.FRONTEND_URL}/verifyemail/${token}'>\
            Click here to verify your email</a></b>`, // html body
		})
	} catch (e) {
		console.log(`Error while sending email to: ${mail}\n`, e)
		return false
	}
	return true
}

module.exports = { sendForgotPasswordEmail, sendVerifyMailEmail }
