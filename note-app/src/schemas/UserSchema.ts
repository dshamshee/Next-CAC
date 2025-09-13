import { Document } from "mongoose";

export interface User extends Document{
    name: string;
    email: string;
    avatar: string;
    createdAt: Date;
}