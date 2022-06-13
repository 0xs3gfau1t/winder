require('dotenv').config();

const nodemailer = require("nodemailer");
const mailer = require("../Config/mailer");

async function sendEmail(mail, token){
//    const testacc = await mailer.createTestAccount();

//    console.log("Created test account", testacc);

    console.log("Sending mail...");
    try{
        let info = await mailer.sendMail({
            from: '83e179ca-6996-b503-7264-d75a7ca1f373@arch-sama',
            to: "anishchapagai0@gmail.com",
            subject: "Winder: Forgot Password",
            text: "This is a automated password request email sent by the server.\
            Please don't reply.",
            html: `\
            <h1>Winder: Password Reset Request</h1>\
            <p>You recently requested to reset your forgotton password. If you don't\
            know about this then please delete this.</p><br>\
            <b><a href='http://localhost:3000/changepassword/${token}'>\
            Click here to change your password</a></b>`, // html body
        });
        
        console.log("Message sent: %s", info.messageId);
        
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }catch(e){
        console.log(`Error while sending email to: ${mail}\n`, e);
        return false;
    }
    return true;
}

module.exports = { sendEmail };