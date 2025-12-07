import { dbConnect } from "@/lib/dbConfig";
import applicationModel from "@/models/Application";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){

    try {
        dbConnect();

        const {firstName, lastName, email, phone, status} = await request.json();

        const existingApplication = await applicationModel.findOne({email});

        if(existingApplication) {
            return NextResponse.json({message: "Applicationa alread exists"}, {status: 400})
        }

        const newApplication = await applicationModel.create({
            firstName,
            lastName,
            email,
            phone,
            status
        });

        await newApplication.save();
        return NextResponse.json({message: "Application submitted successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error", error: error}, {status: 500})
    }
}