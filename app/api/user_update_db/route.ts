import { createClient } from "@/lib/supabase/server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma_setup/main"
export async function POST(req: NextRequest) {
    const body = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ status: 400, message: "user is not authenticated" })
    }
    type dt = {name?: string, role?: string, country?: string, experience?: string}

    const data: dt = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.role !== undefined) data.role = body.role;
    if (body.country !== undefined) data.country = body.country;
    if (body.experience !== undefined) data.experience = body.experience;

    try {
        const updateUser = await prisma.user.update({
            where: { id: user.id },
            data,
        })

        return NextResponse.json({ status: 200, message: "user updated successfully" })
    }
    catch (error) {
        console.error("error while getting user data", error)
        return NextResponse.json({ status: 500, message: "something went wrong updating the user data" })
    }
}