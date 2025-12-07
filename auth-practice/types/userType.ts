import { Document } from "mongoose";



export interface User extends Document{
    username: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: Date
    updatedAt: Date
}







// import {z} from 'zod'

// export const usernameValidation = z
// .string()
// .min(4, "username must be at least 4 characters")
// .max(20, "username must be no more than 20 characters")
// .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters")
// .trim();

// export const userSchema = z.object({
//     username: usernameValidation,
//     email: z.string().email({message: "Invalid email address"})
// })

