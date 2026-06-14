import Dashboardui from "./dashboardui";
import { createClient } from "@/lib/supabase/server";
import {prisma} from "@/prisma_setup/main"
import NoUserPage from "@/components/ui/notlogged";

export default async function Dashboard(){
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){
    return <NoUserPage/>
  }
  const sessions = await prisma.sessions.findMany({
    where:{userid:user.id},
    include: {
      ground: true,
    },
  })
  const notebook = await prisma.notebook.findMany({
    where:{userid:user.id},
  })
  return(
    <Dashboardui session={sessions} notebooks={notebook}/>
  )
}