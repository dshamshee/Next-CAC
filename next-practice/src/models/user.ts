import mongoose, {Document, Schema} from "mongoose";


interface User extends Document{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    passwordVerifyCode: string;
    passwordVerifyCodeExpiry: Date;
}


const userSchema: Schema<User> = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyCode: String,
    verifyCodeExpiry: Date,
    passwordVerifyCode: String,
    passwordVerifyCodeExpiry: Date,
})


const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;