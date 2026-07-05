import Notebookui from "./notebookui"
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"

export default async function Notebook(){
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();

    const fetch_notes = await prisma.notebook.findMany({
        where:{userid: user?.id},
        orderBy: {
            createdAt: "desc",
          },
    })
    return <Notebookui notes={fetch_notes}/>
}