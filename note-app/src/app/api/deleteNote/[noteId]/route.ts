import dbConnect from "@/lib/dbConnections";
import { NextResponse } from "next/server";
import { GetServerSessionHere } from "../../auth/[...nextauth]/options";
import NoteModel from "@/models/Note";



export async function DELETE(request: Request, {params}: {params: Promise<{noteId: string}>}){
    const noteId = (await params).noteId;
    // const noteIdObjectId = new mongoose.Types.ObjectId(noteId);
    // console.log("noteIdObjectId: ", noteIdObjectId);
    await dbConnect();
    const session = await GetServerSessionHere();
    const user = session?.user;
    if(!session || !user){
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, {status: 401})
    }

    try {
        const updateResult = await NoteModel.deleteOne({_id: noteId, userId: user.id});
        if(updateResult.deletedCount === 0){
            return NextResponse.json({
                success: false,
                message: "Note not found or already deleted"
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            message: "Note deleted successfully"
        }, {status: 200})
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error in deleting note",
            error: error.message
        }, {status: 500})
    }

}



