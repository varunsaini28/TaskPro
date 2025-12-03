import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authMiddleware=async (req, res, next)=>{
    try {
       const token= req.cookies.token
       if(!token){
        return res.status(401).json({message:"unauthorisehed"})
       }

       const decoded=jwt.verify(token,process.env.JWT_SECRET);
      req.user=await User.findById(decoded.id);
      next();
    } catch (error) {
        res.status(401).json({message:'unauthorized'})
    }
}