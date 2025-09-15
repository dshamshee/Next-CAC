import dbConnect from "@/lib/dbConnections";
import UserModel from "@/models/User";
import { getServerSession, NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";




export const authOptions: NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          })
    ],
    
    callbacks:{
        async signIn({user}: {user: User}){
            console.log(user);
            await dbConnect();
            let existingUser = await UserModel.findOne({email: user.email});

            if(!existingUser){
                console.log("User not found, creating new user");
                existingUser = await UserModel.create({
                    name: user.name,
                    email: user.email,
                    avatar: user.image,
                })
            }
            console.log("User found, saving user");
            await existingUser.save();
            return true;
        },

        async session ({session, token}){
            
            if(token?.email){
                const loggedInUser = await UserModel.findOne({email: token.email});

                if(loggedInUser && session.user){
                    session.user.id = loggedInUser._id.toString();
                    session.user.name = loggedInUser.name;
                    session.user.email = loggedInUser.email;
                    session.user.avatar = loggedInUser.avatar;
                }
            }
            return Promise.resolve(session);
        }
    },

    // pages:{
    //     signIn: '/sign-in',
    // }
}


// This is the user define function to get the user data in the server side
export async function GetServerSessionHere() {
    return await getServerSession(authOptions);
  }