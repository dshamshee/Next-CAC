import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: NextRequest){
    const {name, email, password} = await request.json();

    try {
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })

        return NextResponse.json({
            success: true,
            message: "User created successfully",
            user
        }, {status: 201})




    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          // P2002: Unique constraint violation
          if (error.code === 'P2002') {
            console.error('An account with that email already exists.');
            // You can also send a user-friendly response, e.g., res.status(409).json(...)
          } else {
            console.error('A database error occurred:', error.message);
          }
        } else {
          // Handle other types of errors (e.g., network errors, validation errors)
          console.error('An unexpected error occurred:', error);
        }
      }
}