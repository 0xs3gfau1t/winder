const m = require("nodemailer");

const mailer = m.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_POST,
    secure: false,
    auth: {
        user: process.env.MAILER_ADD,
        pass: process.env.MAILER_PASS
    },
});

module.exports = mailer;
