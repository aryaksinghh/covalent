import Profile from "./profileui"
import { prisma } from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"

console.log("database url", process.env.DATABASE_URL)

export default async function Profilepage() {
    console.log("database url", process.env.DATABASE_URL)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userdata = await prisma.user.findUnique({
        where: { id: user?.id }
    })

    if (!userdata) {
        return <div>User not found</div>;
    }


    return <Profile profileDetails={userdata} />
}