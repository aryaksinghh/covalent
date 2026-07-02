import Profile from "./profileui"
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"

export default async function Profilepage(){
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    const userdata = await prisma.user.findUnique({
        where:{id:user?.id}
    })

    return <Profile profileDetails={userdata}/>
}