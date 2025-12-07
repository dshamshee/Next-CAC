import mongoose from 'mongoose';

export interface Application extends mongoose.Document{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: "pending" | "shortlisted" | "rejected";
    createdAt: Date;
    updatedAt: Date;
}


const applicationSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    status: {type: String, enum: ["pending", "shortlisted", "rejected"], default: "pending"},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

const applicationModel = mongoose.models.Application || mongoose.model<Application>("Application", applicationSchema);
export default applicationModel;