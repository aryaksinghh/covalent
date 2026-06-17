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

      interface dataobjtype {
        name?: string,
        grade?: number
      }
  
      const dataobj: dataobjtype = {}
      if(body.name) dataobj.name = body.name;
      if(body.grade) dataobj.grade = body.grade

      const up = await prisma.grounds.update({
        where: {
            id: body.groundid
        },
        data: dataobj,
      });
  
      return NextResponse.json(
        { message: "ground updated", up },
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

