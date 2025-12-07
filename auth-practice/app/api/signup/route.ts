import { dbConnect } from "@/lib/dbConnection";
import UserModel from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request: Request){

    await dbConnect();

    try {
        const {username, email, password} = await request.json();

        // check if user already exists
        const existingUser = await UserModel.findOne({email});
        if(existingUser) {
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }

        // If user does not exists then create a new user with hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            username, 
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return NextResponse.json({message: "User created successfully"},{ status: 201});
    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}