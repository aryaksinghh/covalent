import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest){
   const supabase = await createClient();
   const {data:{user}} = await supabase.auth.getUser();
   if(!user){
    return NextResponse.json({message: "user is not authorized"}, {status: 401})
   }

   const searchParams = request.nextUrl.searchParams;
   const body = await request.json();
   const type = searchParams.get("type")



   if(type=="insert"){
    try {
      const insert_notebook = await prisma.notebook.create({
      data: {
        userid: user.id,
        title: body.title,
        description: body.description
      }
      });
      return NextResponse.json({ message: "Notebook created successfully", notebook: insert_notebook }, { status: 201 });
    } catch (error) {
      console.error("Error creating notebook:", error);
      return NextResponse.json({ message: "Failed to create notebook", error }, { status: 500 });
    }
   }

   if(type=="update"){
    const datachange: {title?: string, description?: string} = {};
    if(body.title) datachange.title = body.title
    if(body.description) datachange.description = body.description

    try {
      const update_notebook = await prisma.notebook.update({
      where: { id: body.id },
      data: datachange
      });
      return NextResponse.json({ message: "Notebook updated successfully", notebook: update_notebook }, { status: 200 });
    } catch (error) {
      console.error("Error updating notebook:", error);
      return NextResponse.json({ message: "Failed to update notebook", error }, { status: 500 });
    }
   }

   if(type=="delete"){
    try {
      const delete_notebook = await prisma.notebook.delete({
        where: { id: body.id },
      });
      return NextResponse.json({ message: "Notebook deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting notebook:", error);
      return NextResponse.json({ message: "Failed to delete notebook", error }, { status: 500 });
    }
   }
   

}