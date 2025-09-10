"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Page = ({params}: {params: Promise<{username: string}>}) => {


  const {username} = use(params);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async()=>{

    setIsLoading(true);
    try {
      const response = await axios.post('/api/send-message', {
        username,
        content
      })
      toast.success(response.data.message)

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<null>>
      toast.error(axiosError.response?.data.message || "Failed to send message")
    }finally{
      setIsLoading(false);
    }
  }




  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl border">
      <h1 className="text-center text-4xl font-bold mt-12 mb-12">Public Profile Link</h1>

        <h1 className="w-[90%] mx-auto font-semibold mb-1">Send Anonymous message to @{username}</h1>
      <div className="flex flex-col items-center gap-4">
      <Input className="py-6 w-[90%] mx-auto" type="text" placeholder="Write your anonymous message here" value={content} onChange={(e)=>setContent(e.target.value)} />
      <Button className="cursor-pointer" onClick={handleSendMessage}>{isLoading ? <Loader2 className="animate-spin" /> : "Send It"}</Button>
      </div>
    </div>
  )
}

export default Page
