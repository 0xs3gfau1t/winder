const { userModel } = require("../Models/userModel")

const { verifyToken, generateToken } = require("../Utils/jwtUtil")

/*
    This is a middleware to verify if email
    of an account is verified or not
    If not, this will send a 403 status with {message: "email not verified"}
    
    Can be set only on a certain requests to reduce db load [ TODO ]
    Or Find a way to deactivate this middleware/ remove this from middleware stack
    After user is verified
*/

async function verifyEmail(req, res, next){
    const user = await userModel.findOne({_id: req.userdata._id})
    if(user.username || user.username === null){

        //
        // Do something to remove this middleware from `app`'s stack
        //

        next()
    }
    else    res.status(403).json({message: "Email not verified"})
}

module.exports = verifyEmail