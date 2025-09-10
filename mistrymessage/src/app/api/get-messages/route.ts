import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(){
    await dbConnect();
    
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    
    // console.log("Session:", session)
    // console.log("User from session:", user)

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, {status: 401})
    }

    const userId = new mongoose.Types.ObjectId(user._id)
    // console.log("Looking for user with ID:", userId)
    try {
        // First check if user exists
        const userExists = await UserModel.findById(userId)
        if (!userExists) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {status: 404})
        }

        // Use aggregation to get sorted messages, but handle case where user has no messages
        const result = await UserModel.aggregate([
            {$match: {_id: userId}},
            {
                $addFields: {
                    messages: {
                        $cond: {
                            if: { $eq: [{ $size: "$messages" }, 0] },
                            then: [],
                            else: {
                                $sortArray: {
                                    input: "$messages",
                                    sortBy: { "createdAt": -1 }
                                }
                            }
                        }
                    }
                }
            },
            {$project: { messages: 1 }}
        ])
        
        // console.log("Aggregation result:", result)

        return Response.json({
            success: true,
            messages: result[0]?.messages || []
        }, {status: 200})


    } catch (error) {
        console.log("An unexpected error occured", error)
        return Response.json({
            success: false,
            message: "Error in getting messages"
        }, {status: 500})
    }
}