require("dotenv").config()

const nodemailer = require("nodemailer")
const mailer = require("../Config/mailer")

async function sendEmail(mail, token) {
	console.log("Sending mail...")
	console.log("Verification token: ", token)
	try {
		let info = await mailer.sendMail({
			from: "83e179ca-6996-b503-7264-d75a7ca1f373@arch-sama",
			to: mail,
			subject: "Winder: Forgot Password",
			text: "This is a automated password request email sent by the server.\
            Please don't reply.",
			html: `\
            <h1>Winder: Password Reset Request</h1>\
            <p>You recently requested to reset your forgotton password. If you don't\
            know about this then please delete this.</p><br>\
            <b><a href='${process.env.APP_URL}/changepassword/${token}'>\
            Click here to change your password</a></b>`, // html body
		})
	} catch (e) {
		console.log(`Error while sending email to: ${mail}\n`, e)
		return false
	}
	return true
}

module.exports = { sendEmail }
