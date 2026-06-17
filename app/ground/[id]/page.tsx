import Groundpageui from "./groundpageui"
import { createClient } from "@/lib/supabase/server";
import {prisma} from "@/prisma_setup/main"
import { notFound } from "next/navigation";

interface paramstype{
    params: Promise<{id:string}>
}

export default async function GroundPage({params}:paramstype){
    const dynamicParams = await params;
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    const dbuser = await prisma.user.findUnique({
        where:{id:user?.id},
        include:{
            ground: true
        }
    })

   const specificGround =  dbuser?.ground.find((s)=> s.id == dynamicParams.id)
   if (!specificGround){
    notFound();
   }

    return <Groundpageui/>

  
}