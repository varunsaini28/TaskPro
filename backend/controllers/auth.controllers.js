import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    const {name, email, password}=req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

       let user=await User.findOne({email});
       if(user){
        return res.status(400).json({message:"User already exists"});
       }
        const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(password, salt);

        user=await User.create({
            name,
            email,
            password:hashedPassword
        })

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
        res.cookie('token',token,{
            httpOnly:true,
          secure:process.env.NODE_ENV==='production',
          maxAge:2*24*60*60*1000
        });
        res.status(200).json({message:"User registered successfully"})
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}

export const login=async(req, res)=>{
    const {email, password}=req.body;
    try {
        if(!email||!password){
            return res.status(400).json({message:"all filed are required"});
        }
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        let isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'2d'});
         res.cookie('token',token,{
            httpOnly:true,
          secure:process.env.NODE_ENV==='production',
          maxAge:2*24*60*60*1000
        });

        res.status(200).json({message:"Login succesfully",user})

    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    } 
}

export const logout=async(req, res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0)
    });

    res.status(200).json({message:"Logged out successfully"})
}

export const profile=(req, res)=>{
    res.status(200).json({
        user:req.user
    })
}

