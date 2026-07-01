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
  const grounds = await prisma.grounds.findMany({
    where:{userid:user.id},
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })
  const notebook = await prisma.notebook.findMany({
    where:{userid:user.id},
  })
  return(
    <Dashboardui ground={grounds} notebooks={notebook}/>
  )
}