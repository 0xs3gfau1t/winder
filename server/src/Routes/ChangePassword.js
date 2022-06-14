require('dotenv').config();

const express = require("express");
const bcrypt = require("bcrypt")

const { sendEmail } = require("../Controllers/changePassword");
const { generateToken, verifyToken } = require("../Utils/jwtUtil");
const { userModel } = require('../Models/userModel');

router = express.Router();

router.post("/:authtoken", async (req, res) => {
        const t = req.params.authtoken;
        
        const {data, expired } = verifyToken(t);

        if(!expired){

            // Updates new password
            // Removes refershtoken, so logs out from every device
            // If we want to log this current device on, we can respond with access token
            // And store a new refresh token

            const pass = await bcrypt.hash(req.body.password, 10);

            const usr = await userModel.findOneAndUpdate({email: data.email}, {
                password: pass,
                $unset: {refreshToken:1}
            });

            usr.save()
            res.json({message: "success"});
        }
        res.json({message: "failed"});
    })
    .post("/", async (req, res)=>{

        const mail = req.body.email;

        console.log("Received email: ", mail);

        if( await userModel.findOne({email: mail}) ){
            const token = generateToken({email: mail}, `${10 * 60}s`);
            console.log("Token generated as: ", token);

            await sendEmail(mail, token);
        }

        res.json({message : "done"});
    })

module.exports = router;
