import "dotenv/config"
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server";
 
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){
    return NextResponse.json({message:"User is not authorized"}, {status:401})
  }
    try {
      const body = await request.json();

      interface dataobjtype {
        score?: number,
        xp?: number,
        timespentmin? : number,
        iscompleted?: boolean 
      }
  
      const dataobj: dataobjtype = {}
      if(body.score) dataobj.score = body.score;
      if(body.grade) dataobj.xp = body.xp
      if(body.timespentmin) dataobj.timespentmin = body.timespentmin
      if(body.iscompleted) dataobj.iscompleted = body.iscompleted

      const up = await prisma.sessions.update({
        where: {
            id: body.sessionid
        },
        data: dataobj,
      });
  
      return NextResponse.json(
        { message: up, }, {status:200}
      );
    } catch (error) {
      console.error(error);
  
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

