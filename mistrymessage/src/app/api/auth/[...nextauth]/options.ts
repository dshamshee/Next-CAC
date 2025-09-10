import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email/Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any): Promise<any>{
        await dbConnect();
        
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        
        console.log("Received identifier:", credentials.identifier)
        try {
            // Search for user by email or username
            const user = await UserModel.findOne({
                $or:[
                    {email: credentials.identifier},
                    {username: credentials.identifier},
                ]
            })

            if(!user){
                throw new Error("No user found with this email or username");
            }

            if(!user.isVerified){
                throw new Error("Please verify your account first before login");
            }


            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
            console.log("checking correct password", isPasswordCorrect)
            if(isPasswordCorrect){
               return user; 
            }else{
                throw new Error("Incorrect Password")
            }
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error(error);
        }
      }
    }),
  ],

  callbacks:{
      async jwt({ token, user }) {

        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessage;
            token.username = user.username;
        }


        return token
    },
    async session({ session, token }) {

        if(token){
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
        }


        return session
    },
  },

  pages:{
    signIn: '/sign-in',
  },
  session:{
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};
