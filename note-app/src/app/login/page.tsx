'use client'

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";



const LoginPage = ()=>{
    const { data: session, status } = useSession();
    console.log(session);
    const router = useRouter();

    useEffect(() => {
        if (session) {
        //   window.location.href = "/dashboard";
        router.push("/dashboard");
        }
      }, [session, router]);



      if (status === "loading") {
        return (
          <h1>Loading...</h1>
        );
      }



    const handleLogin = async ()=>{
        signIn("google", {callbackUrl: "/dashboard"})
    }

    


    return(
        <div className="mainContainer flex flex-col justify-center items-center">
            <h1>Login Pgae</h1>
            <Button onClick={handleLogin} className="w-full md:w-auto">
            <FaGoogle /> Login with Google
            </Button>
        </div>
    )
}

export default LoginPage;