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
  
  
      const ground = await prisma.grounds.create({
        data: {
          name: body.name,
          category: body.category,
          stack: body.stack,
          userid: body.userid,
          experience: body.experience 
        },
      });
  
      return NextResponse.json(
        { message: "ground created", ground },
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

