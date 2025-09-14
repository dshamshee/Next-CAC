'use client'

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";




const LoginPage = ()=>{

    const { data: session, status } = useSession();
    console.log(session);
    const router = useRouter();


    useEffect(() => {
        if (session) {
        //   window.location.href = "/dashboard";
        router.push("/");
        }
      }, [session, router]);



      if (status === "loading") {
        return (
          <h1>Loading...</h1>
        );
      }



    const handleLogin = async ()=>{
        signIn("google", {callbackUrl: "/"})
    }

    


    return(
        <div className="mainContainer w-screen h-screen flex flex-col justify-center items-center">


          <div className="flex flex-col py-5 px-3 items-center border shadow-gray-900 shadow-md rounded-md w-[500px] h-[500px]">
            <h1 className="text-2xl mt-5 font-bold text-center from-blue-500 to-purple-500 bg-gradient-to-r bg-clip-text text-transparent">Login your accound</h1>

            <form action="" className=" flex flex-col items-center gap-3 justify-center w-[70%] h-[50%]">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button type="submit" className="w-[90%] cursor-pointer">Login</Button>
            </form>
            {/* <hr className="w-full mb-2" /> */}
            <Button onClick={handleLogin} className="cursor-pointer">
              <FaGoogle /> Login with Google
            </Button>
            <p className="text-sm mt-2 text-gray-500">Don&apos;t have an account? <Link href="/signup" className="text-blue-500 cursor-pointer">Sign up</Link></p>
          </div>


            {/* <Button onClick={handleLogin} className="w-full md:w-auto">
            <FaGoogle /> Login with Google
            </Button> */}



            
        </div>
    )
}

export default LoginPage;