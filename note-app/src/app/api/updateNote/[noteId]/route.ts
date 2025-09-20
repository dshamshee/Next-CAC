import dbConnect from "@/lib/dbConnections";
import { NextRequest, NextResponse } from "next/server";
import { GetServerSessionHere } from "../../auth/[...nextauth]/options";
import NoteModel from "@/models/Note";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ noteId: string }> }
) {
  const noteId = (await params).noteId;
  const { updatedNote } = await request.json();
  dbConnect();

  try {
    console.log("update route is called")
    const session = await GetServerSessionHere();
    const user = session?.user;
    if (!session || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }

    const updatedResult = await NoteModel.findOneAndUpdate(
        { _id: noteId, userId: user?.id as string },
        {
          title: updatedNote.title,
          content: updatedNote.content,
        },
        {new: true}
      );

    if(!updatedResult){
        return NextResponse.json(
            {
              success: false,
              message: "Note not found or already deleted",
            },
            { status: 404 }
          );
    }

    return NextResponse.json(
        {
          success: true,
          message: "Note updated successfully",
        },
        { status: 200 }
      );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
        {
          success: false,
          message: "Error in updating note",
          error: error.message
        },
        { status: 500 }
      );
  }
}
