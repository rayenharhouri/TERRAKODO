import jwt from "jsonwebtoken";
import User from "../models/user.js";


export async function protect (req,res,next) { //auth required
    if(!req.headers.authorization){
        return res.status(302).json({success : false , message: "no auth"});
    }

    const token = req.headers.authorization.replace("Bearer","").trim();

    try {
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         const user = await User.findById(decoded.id);
         req.user = user;
         next();
    } catch (err) {
        res.status(302).json({success: false, message: "not logged in"});
    }
}