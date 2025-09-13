import mongoose, { Schema } from "mongoose";
import { User } from "@/schemas/UserSchema";


const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default UserModel;