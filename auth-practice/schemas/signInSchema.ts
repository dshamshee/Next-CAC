import {z} from 'zod'

export const usernameValidation = z
.string()
.min(4, {error: "username must be at least 4 characters"})
.max(20, {error: "username must be no more than 20 characters"})
.regex(/^[a-zA-Z0-9]+$/, {error: "Username must not contain special characters"})
.trim()

export const signInSchema = z.object({
    username: usernameValidation,
    email: z.email({error: "Invalid email address"}),
    password: z.string().min(6, {error: "Password must be at least 6 characters"}),
})

export type signInSchemaType = z.infer<typeof signInSchema>