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
  
  
      const session = await prisma.sessions.create({
        data: {
          name: body.name,
          userid: user.id,
          groundid: body.groundid,
          type: body.type
        },
      });
  
      return NextResponse.json(
        { message: session, status:201 },
      );
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

