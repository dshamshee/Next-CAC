'use client'

import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const DashboardPage = ()=>{
  const [messages, setMessages ] = useState<Message[]>([]);
  const [isLoading, setIsLoading ] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading ] = useState(false);

  const handleDeleteMessage = async(messageId: string)=>{
    setMessages(messages.filter((message)=> message._id !== messageId))
  }

  const {data: session} = useSession();
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema)
  })

  const {register, watch, setValue} = form;

  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async()=>{
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse<boolean>>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessage as boolean)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<null>>
      toast.error(axiosError.response?.data.message || "Failed to fetch message settings")
    }finally{
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse<Message[]>>('/api/get-messages')
      setMessages(response.data.messages || [])
      if(refresh){
        toast.success("Showing latest messages")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse<null>>
      toast.error(axiosError.response?.data.message || "Failed to fetch message settings")
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  }, [setIsLoading, setMessages])

  return (
    <div className="mainContainer">
      Dashboard Page
    </div>
  )
}

export default DashboardPage