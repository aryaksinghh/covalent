import Groundpageui from "./groundui"
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server";

export default async function Groundpage(){
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    const ground = await prisma.grounds.findMany({
        where:{userid: user?.id}
    });
    return (
        <Groundpageui grounds={ground}/>
    )
}