import {dbConnect} from "@/lib/dbConnection"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    
    try {
        await dbConnect();
    return NextResponse.json({
        message: "Database connection successful"
    })
    } catch (error) {
        return NextResponse.json({
            message: "Database connection failed",
            error: error
        }, {status: 500})
    }
}