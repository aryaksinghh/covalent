import "dotenv/config"
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server";
 
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){
    return NextResponse.json({status:400, message:"User is not authorized"})
  }
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
          avatar: body.avatar,
          role: body.role || "none",
          country: body.country  || "none",
          experience: body.experience  || "none"
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

