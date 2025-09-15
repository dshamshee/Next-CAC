import mongoose, {Schema} from "mongoose";
import {Note} from '@/schemas/NoteSchema'


const NoteSchema: Schema<Note> = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"],
    },
    content: {
        type: String,
        required: [true, "Please enter a content"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter a user id"],
    }
})


const NoteModel = mongoose.models.Note || mongoose.model<Note>("Note", NoteSchema);
export default NoteModel;