import dbConnect from "@/lib/dbConnections";
import { NextRequest, NextResponse } from "next/server";
import { GetServerSessionHere } from "../auth/[...nextauth]/options";
import NoteModel from "@/models/Note";


export async function GET(request: NextRequest){
    await dbConnect();

    try {
        const session = await GetServerSessionHere();
        const user = session?.user;
        if(!session || !user) return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, {status: 401})

        const notes = await NoteModel.find({userId: user.id});
        return NextResponse.json({
            success: true,
            message: "Notes fetched successfully",
            notes: notes || []
        }, {status: 200})


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Internal Servere Error",
            error: error.message
        }, {status: 500})
    }
}