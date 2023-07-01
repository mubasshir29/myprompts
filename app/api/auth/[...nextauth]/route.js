import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB } from "@utils/database";
import { User } from "@models/users";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async session({session}){
                const sessionUser = await User.findOne({
                    email: session.user.email
                })
                session.user.id = sessionUser._id.toString()
                console.log("Logged User", session.user)
                return session
        },
        async signIn({profile}){
            try{
                await connectDB();
                //check if any user exist
                const userExists = await User.findOne({
                    email : profile.email
                })

                //if not, create a new user
                if(!userExists){
                    await User.create({
                        email : profile.email,
                        username: profile.email.split("@")[0],
                        image: profile.picture
                    })
                    console.log("User created")
                }
                return true
            }  
            catch(error){
                console.log(error)
                return false
            }
        }
    }
})

export {handler as GET, handler as POST}