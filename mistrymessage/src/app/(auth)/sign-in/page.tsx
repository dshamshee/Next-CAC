'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, {AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


const SignInPage = ()=>{
  
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceValue(username, 300)
  const router = useRouter()


  // Zod Implementation 
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username: '',
      email: '', 
      password: '',
    }
  })


  useEffect(() => {
    // checking unique username on every 300ms
    const checkUsernameUnique = async ()=>{
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse<null>>
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking username")
        } finally{
          setIsCheckingUsername(false)
        }
      }
    }    
    checkUsernameUnique()
  }, [debouncedUsername])

  const onSubmit = async(data: z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/sign-up", data)
      toast.success(response.data.message)
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in sign-up of user", error)
      const axiosError = error as AxiosError<ApiResponse<null>>
      const errorMessage = axiosError.response?.data.message ?? "Something went wrong"
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }
  

  return(
    <div className="mainContainer flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-normal lg:text-5xl mb-6">Join MistryMessage</h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignInPage