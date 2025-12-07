import {z} from 'zod';

export const applicationSchema = z.object({
    firstName: z.string().min(3, {error: "First name must be at least 3 characters"}),
    lastName: z.string().min(3, {error: "Last name must be at least 3 characters"}),
    email: z.email({error: "Invalid email address"}),
    phone: z.string().min(10, {error: "Phone number must be at least 10 digits"}),
    status: z.enum(["pending", "shortlisted", "rejected"], {error: "Invalid status"}),
})

export type ApplicationType = z.infer<typeof applicationSchema>