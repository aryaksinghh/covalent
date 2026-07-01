import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Redis } from "@upstash/redis";
import { createClient } from "@/lib/supabase/server";


export async function POST(request: NextRequest) {
  const body = await request.json()
  const fpt_title = body.title;
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const redis = Redis.fromEnv()
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ status: 400, message: "User is not authorized" })
  }
  let fpt;

  const fetch_redis = await redis.get(`session/${body.sessionid}/${body.conceptid}`)
  if (!fetch_redis) {
    const chatcomp = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a world-class educator, senior software engineer, and expert in First Principles Thinking.
                    
          Your goal is to help the learner truly understand the concept from its absolute fundamentals so they never have to memorize it again.
                    
          Always teach using First Principles Thinking.
                    
          Return ONLY valid JSON.
          Do NOT return markdown.
          Do NOT wrap JSON inside code blocks.
          Do NOT write anything before or after the JSON.
                    
          --------------------------------------------------
          TEACHING METHODOLOGY
          --------------------------------------------------
          1. Start from the most basic truth.
          2. Explain the actual problem that led to the creation of this concept.
          3. Explain why that problem exists.
          4. Explain why older or simpler approaches fail.
          5. Build the concept step-by-step until the requested topic naturally appears.
          6. Never assume prior knowledge.
          7. Explain every technical term before using it.
          8. Use extremely simple English.
          9. Make the explanation conversational and beginner-friendly.
          10. Avoid textbook definitions whenever possible.
          11. If the topic involves programming, include a tiny code example only if it genuinely helps understanding.
          12. Make the learner feel like they discovered the concept themselves.
                    
          --------------------------------------------------
          OUTPUT JSON SCHEMA
          --------------------------------------------------
          {
            "title": "",
            "difficulty": "Beginner",
            "mentalModel": "",
            "firstPrincipleExplanation": {
              "problem": "",
              "whyProblemExists": "",
              "whyOlderApproachesFail": "",
              "coreIdea": "",
              "stepByStepExplanation": [
                "",
                "",
                ""
              ]
            },
            "realWorldExample": {
              "title": "",
              "description": ""
            },
            "isCodeRelated": false,
            "codeExample": {
              "language": null,
              "code": null,
              "explanation": null
            },
            "revisionSummary": ""
          }
                    
          --------------------------------------------------
          VALIDATION RULES
          --------------------------------------------------
          - Return exactly ONE JSON object.
          - Every field must exist exactly as shown in the schema.
          - IMPORTANT: Assess if the topic is a programming/coding concept.
            - If YES: Set "isCodeRelated" to true, and populate the "codeExample" object with relevant data.
            - If NO (e.g., it is a science, math, or history topic): Set "isCodeRelated" to false, and set "language", "code", and "explanation" to null.
          - The explanation should be easy enough for a beginner to understand.
          - Return valid JSON only, with no formatting or backticks.`
        },
        {
          role: "user",
          content: `Topic: ${fpt_title}
                    
          The learner got stuck on this revision slide.
          Teach this topic completely from First Principles Thinking.
          Assume the learner is intelligent but has forgotten the concept.
          Your goal is that after reading this explanation, the learner should be able to explain the topic confidently to someone else without memorizing it.
                    
          Return only the JSON object.`
        }
      ],
      model: "openai/gpt-oss-120b",
    });
    const res = chatcomp.choices[0]?.message?.content || "";
    const fpt_content = JSON.parse(res);
    await redis.set(`session/${body.sessionid}/${body.conceptid}`, fpt_content)
    fpt = fpt_content
    return NextResponse.json({ data: fpt }, { status: 200 })
  } else {
    fpt = fetch_redis
    return NextResponse.json({ data: fpt }, { status: 200 })
  }

}