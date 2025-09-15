import dbConnect from "@/lib/dbConnections";
import NoteModel from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";
import { GetServerSessionHere } from "../auth/[...nextauth]/options";




export async function POST(request: NextRequest){
    await dbConnect();
    const {title, content} = await request.json();
    const session = await GetServerSessionHere();    
    const user = session?.user;

    if(!session){
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, {status: 401})
    }

    try {
        const newNote = await NoteModel.create({
            title,
            content,
            userId: user?.id as string,
        })

        await newNote.save();

        return NextResponse.json({
            success: true,
            message: "New Note Added Successfully"
        }, {status: 201})
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        }, {status: 500})
    }

}