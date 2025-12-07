import GoogleProvider from "next-auth/providers/google";
import { getServerSession, NextAuthOptions } from "next-auth";
import userModel from "@/models/user";
import { dbConnect } from "./dbConfig";

export const authOptions: NextAuthOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          })
    ],

    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async signIn({user}: {user: any}){
            await dbConnect();
            
            let existingUser = await userModel.findOne({email: user.email})
            
            if(!existingUser){
                console.log("User not found, creating new user");
                existingUser = await userModel.create({
                    username: user.name,
                    email: user.email,
                    avatar: user.image
                })
            }

            console.log("User found, saving user");
            await existingUser.save();
            return true;
        },


        async session({session, token}){
            if(token?.email){
                const loggedInUser = await userModel.findOne({email: token.email});

                if(loggedInUser && session.user){
                    session.user._id = loggedInUser._id.toString();
                    session.user.username = loggedInUser.username;
                    session.user.email = loggedInUser.email;
                    session.user.avatar = loggedInUser.avatar;
                }
            }

            return Promise.resolve(session);
        }
    },


    pages: {
        error: '/auth/error'
    }
}


export const getServerSessionHere  = async ()=>{
    return await getServerSession(authOptions);
}