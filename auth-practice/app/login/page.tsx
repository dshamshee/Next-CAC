'use client'
import { signIn } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { signInSchema } from "@/schemas/signInSchema"
import { z } from "zod"
import { useRouter } from "next/navigation"



export default function LoginPage(){

    const router = useRouter();
    const { register, handleSubmit } = useForm<z.infer<typeof signInSchema>>()
    const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (data) => {
        console.log(data)
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        
        if(response?.error){
            console.log("error", response.error)
        }else{
            router.push('/')
        }
    }

    const handleLogin = async()=>{
        signIn('google', {callbackUrl: "/"})
        console.log("login successful")
    }

    return(
        <div className="mainContainer flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center text-2xl font-bold text-blue-500 mb-8">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

                {/* <label htmlFor="username">Username</label>
                <input {...register("username")} placeholder="Username" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" /> */}
                <label htmlFor="email">Email</label>
                <input {...register("email")} placeholder="Email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" />
                <label htmlFor="password">Password</label>
                <input {...register("password")} placeholder="Password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" />
                <button type="submit" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white">Sign In</button>
            </form>            


            <button onClick={handleLogin}>Login with Google</button>
        </div>
    )
}