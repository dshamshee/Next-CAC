"use client"
import { signInSchemaType } from "@/schemas/signInSchema"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

export default function SignupPage(){

    const { register, handleSubmit } = useForm<signInSchemaType>()
    const onSubmit: SubmitHandler<signInSchemaType> = async (data) => {
        console.log(data)
        const response = await axios.post('/api/signup', data)
        console.log("response", response.data)
    }

    return(
        <div className="maincontainer">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 min-h-screen justify-center items-center">
            <h1 className="text-2xl font-bold text-blue-500 mb-8">Please signup to continue</h1>

                <label htmlFor="username">Username</label>
                <input {...register('username')} placeholder="Username" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" />
                <label htmlFor="email">Email</label>
                <input {...register('email')} placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" />
                <label htmlFor="password">Password</label>
                <input {...register('password')} placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" />
                <button type="submit" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white">Sign Up</button>

            </form>
        </div>
    )
}