import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { createClient } from "@/lib/supabase/server";


export async function POST(request: NextRequest) {
    const body = await request.json()
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ status: 400, message: "User is not authorized" })
    }

    try {
        const chatcomp = await groq.chat.completions.create({
            messages: [
                {
                    "role": "system",
                    "content": "You are an encouraging computer science mentor evaluating a student's understanding of a coding concept. Your task is to review the student's explanation against the topic title. Focus purely on whether they grasped the core logic and first principles of the idea. Be highly forgiving of incorrect terminology as long as the fundamental concept is correct. \n\nYour output must be strictly two elements:\n1. A score out of 10 (e.g., 8/10)\n2. A single appreciation word paired with an emoji (e.g., Stellar! 🚀 or Nice! 🔥).\n\nDo not provide any additional feedback, sentences, or explanations. provide me this in json. json keys will be score and appreciation"
                },
                {
                    "role": "user",
                    "content": `Title: ${body.title}\nExplanation: ${body.explanation}`
                }
            ],
            model: "openai/gpt-oss-120b",
        });
        const res = chatcomp.choices[0]?.message?.content || "";
        const fpt_evaluation = JSON.parse(res);

        return NextResponse.json({ data: fpt_evaluation }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 404 });
    }
}

