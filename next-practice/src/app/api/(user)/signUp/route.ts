import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnection";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/sendEmaiil";

export async function POST(request: NextRequest){
    await dbConnect();

    try {
        const {name, email, password} = await request.json();
        console.log(name, email, password);

        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const existingUserByEmail = await UserModel.findOne({email})

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return NextResponse.json({
                    success: false,
                    message: "User already exists with this email"
                }, {status: 400})
            }else {
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        }else{

            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: new Date(Date.now() + 3600000),
            })

            await newUser.save();
            const token = jwt.sign({id: newUser._id, name: newUser.name, email: newUser.email}, process.env.JWT_SECRET || "", {expiresIn: "1h"})
            
            const cookie = (await cookies()).set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600000,
                sameSite: "strict",
            })
        }


        // Send Verification Email
        const type = "VERIFY";
        const emailResponse = await sendEmail(email, name, verifyCode, type);

        if(!emailResponse.success){
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }
        
        return NextResponse.json({
            success: true,
            message: "User created successfully"
        }, {status: 201})


    } catch (error) {
        console.error("Error creating user", error);
        return NextResponse.json({
            success: false,
            message: "Error creating user"
        }, {status: 500})
    }
}