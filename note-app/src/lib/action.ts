import { GetServerSessionHere } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "./dbConnections";
import NoteModel from "@/models/Note";

export async function getNotes(){
    dbConnect();
    const session = await GetServerSessionHere();
        const user = session?.user;
        if(!session || !user) return "Not Authenticated"

        const notes = await NoteModel.find({userId: user.id});
        return notes;


}