
import { NextResponse } from "next/server";
import User from "@/model/user";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const POST = async (request)=>{
    const {username,email,password,confirmPassword}=await request.json();
    
    if(password !== confirmPassword){
        return new NextResponse(
            JSON.stringify({error:"password does not matched"},{status:4000})
        );
    }
    await connectDB();

    const existingUser = await User.findOne({email});
    if(existingUser){
        return new NextResponse(JSON.stringify({error:"User already exist"},{status:400}));
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({username,email,password:hashedPassword});

    try {
        await newUser.save();
        return new NextResponse('User successfully registered',{status:200},{data:newUser});
    } catch (error) {
        return new NextResponse(error,{status:500});
    }

}