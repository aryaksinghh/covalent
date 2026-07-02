import Sessionui from "./sessionui";
import {prisma} from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


interface paramsType{
    params: Promise<{sessionid:string, id: string}>
}

const appreciationMessages = [
    "Keep learning! Every mistake is a step closer to mastering the topic.",
    "Good effort! You're building the foundation—keep practicing and you'll improve quickly.",
    "Nice progress! You're understanding the concepts well. Stay consistent!",
    "Great job! Your hard work is clearly paying off. Keep up the momentum!",
    "Outstanding! You've demonstrated an excellent understanding—you're mastering this topic!"
  ];


export default async function Session({params} : paramsType){
    const {sessionid, id} = await params;
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    const fetch_session = await prisma.sessions.findUnique({
        where:{id:sessionid}
    })
    if(fetch_session?.userid != user?.id){
      notFound();
    }

    const questions = fetch_session?.questions.length
    const accpercentage = ((fetch_session?.score ?? 0) / (questions ?? 1)) * 100
    let apm;
    if (accpercentage > 1 && accpercentage <= 20) {
        apm = appreciationMessages[0];
    } else if (accpercentage > 20 && accpercentage <= 40) {
        apm = appreciationMessages[1];
    } else if (accpercentage > 40 && accpercentage <= 60) {
        apm = appreciationMessages[2];
    } else if (accpercentage > 60 && accpercentage <= 80) {
        apm = appreciationMessages[3];
    } else if (accpercentage > 80) {
        apm = appreciationMessages[4];
    }

    return (
        <Sessionui xpGained={fetch_session?.xp || 0} timeSpent={fetch_session?.timespentmin || 0} scoreAccuracy={accpercentage} revisedTopics={fetch_session?.topics || []}  appreciationText={apm || ""} groundid={id}/>
    )
}