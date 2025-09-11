"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";


const SignInPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Zod Implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });


 

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  console.log(data.identifier, data.password)

   try {
     setIsSubmitting(true);
     const response = await signIn('credentials', {
       redirect: false,
       identifier: data.identifier,
       password: data.password
     })
     console.log("response", response)
 
     if(response?.error){
       toast.error("Invalid Credentials",{
        description: response.error
       })
     }
 
     if(response?.url){
       router.replace('/dashboard')
     }
     setIsSubmitting(false);
   } catch (error) {
    setIsSubmitting(false);
    toast.error("Login Failed",{
      description: error as string
    })
   }
  };

  return (
    <div className="mainContainer flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-normal lg:text-5xl mb-6">
            Join Mistry Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email/username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait 
                  </>
                ) : ('Signin')
              }
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{''}
            <Link href={'/sign-up'} className="text-blue-600 hover:text-blue-800">
            Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

