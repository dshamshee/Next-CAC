/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/lib/dbConnection";
import UserModel from "@/models/user";
import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        CredentialsProvider({
          id: "credentials",
          name: "Credentials",
          credentials: {
            email: {label: "Email/Username", type: "text"},
            password: {label: "Password", type: "password"},
          },

          async authorize(credentials: any): Promise<any>{
            await dbConnect();
            console.log('credentials', credentials)

            // Check if Email/Username and Password are not provided then throw an error
            if(!credentials?.email || !credentials?.password){
              throw new Error("Missing credentials");
            }

            // If Email/Username and Password are provided then search for the user in the database
            try {
              // Search for user by email or username
              const user = await UserModel.findOne({
                $or:[
                  {email: credentials.email},
                  // {username: credentials.identifier},
                ]
              })

              if(!user){
                throw new Error ("No user found with this email or username");
              }

              // If user is found then check if the password is correct
              const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
              if(isPasswordCorrect){
                return user;
              }else{
                throw new Error("Incorrect Password");
              }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
              throw new Error(error);
            }


          }
        })
      ],

      callbacks: {


        async signIn({user}){
          console.log(user);
          await dbConnect();

          let existingUser = await UserModel.findOne({email: user.email});

          if(!existingUser){
            console.log("User not found, creating new user");
            existingUser = await UserModel.create({
              username: user.name,
              email: user.email,
              avatar: user.image
            })
          }

          console.log("User found, saving user");
          await existingUser.save();
          return true;
        },

        async jwt({token, user}){
          if(user){
            token.id = user.id?.toString();
            token.username = user.username;
            token.avatar = user.avatar;
            token.email = user.email;
          }

          return token;
        },


        async session({session, token}){

          if(token?.email){
            const loggedInUser = await UserModel.findOne({email: token.email});

            if(loggedInUser && session.user){
              // normal ye error dega, fix: create type/next-auth.d.ts file then overwrite/add some configs
              session.user.id = loggedInUser._id.toString(); 
              session.user.username = loggedInUser.username;
              session.user.email = loggedInUser.email;
              session.user.avatar = loggedInUser.avatar;
            }
          }
          return Promise.resolve(session);
        }

        
      },


      secret: process.env.NEXTAUTH_SECRET // This is a secret key for the authentication which is come with nextAuth library
}


// This is the user define function to get the user data in the server side
export async function GetServerSessionHere() {
  return await getServerSession(authOptions);
}