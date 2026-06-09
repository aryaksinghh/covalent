import "dotenv/config"
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma_setup/main"
 
export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
  
      const existingUser = await prisma.user.findUnique({
        where: {
          id: body.id,
        },
      });
  
      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 200 }
        );
      }
  
      const user = await prisma.user.create({
        data: {
          id: body.id,
          name: body.name,
          email: body.email,
          avatar: body.avatar_url,
          role: body.role,
          country: body.country,
          experience: body.experience
        },
      });
  
      return NextResponse.json(
        { message: "User created", user },
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

