import Groundpageui from "./groundpageui"
import { createClient } from "@/lib/supabase/server";
import {prisma} from "@/prisma_setup/main"
import { notFound } from "next/navigation";
import Braintesting from "./braintesting/page";

interface paramstype{
    params: Promise<{id:string}>
}

export default async function GroundPage({params}:paramstype){
    const dynamicParams = await params;
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    const dbuser = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
        include: {
          ground: {
            include: {
              session: true,
            },
          },
        },
      });

   const specificGround =  dbuser?.ground.find((s)=> s.id == dynamicParams.id)
   if (!specificGround){
    notFound();
   }

   if (specificGround.grade == 0){
    return <Braintesting gid={dynamicParams.id}/>
   }

    return <Groundpageui ground={specificGround}/>

  
}