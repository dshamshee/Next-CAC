"use client";
import { signIn } from "next-auth/react";

export default function SignInPage (){

    return(
        <div className="mainContainer flex flex-col items-center justify-center min-h-screen">
            <h1>Sign In</h1>
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" onClick={()=>signIn('google', {callbackUrl: "/"})}>Sign In with Google</button>
        </div>
    )
}