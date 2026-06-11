import { createClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import {prisma} from "@/prisma_setup/main"
export async function GET(req:NextRequest){
   const supabase = await createClient();
   const {data:{user}} = await supabase.auth.getUser();
   if(!user){
    return NextResponse.json({status: 400, message:"user is not authenticated"})
   }

   try{
   const userDataPg = await prisma.user.findUnique({
    where:{id:user.id}
   })

   return NextResponse.json({status: 200, userData: userDataPg})
   }
   catch(error){
     console.error("error while getting user data", error)
     return NextResponse.json({status:500, message:"something went wrong fetching the user data"})
   }
}