import mongoose, {Schema} from 'mongoose'
import {User} from '@/types/userType'

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        default: null,
    },
    avatar:{
        type: String,
        default: "https://via.placeholder.com/150",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default UserModel;