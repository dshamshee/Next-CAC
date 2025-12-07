import mongoose from 'mongoose';


// Type Definition for the User Schema
export interface User extends mongoose.Document{
    username: string;
    email: string;
    password: string;
}


// Schema Definition for the User Model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    password: {
        type: String,
    },
    avatar: {
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


// Model Definition for the User Model
const userModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

// Export the User Model
export default userModel;