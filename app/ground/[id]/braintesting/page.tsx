import Braintestingui from "./braintestingui"
import { prisma } from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"
import Alreadytested from "@/components/ui/alreadytested"
import Groq from "groq-sdk";
import { Redis } from '@upstash/redis'
import { notFound } from "next/navigation";


interface paramstype {
  params: Promise<{ id: string }>
}

interface optionobj {
  option: string,
  text: string
}

interface Question {
  id: number;
  questionText: string;
  options: optionobj[];
  answer: string
  code:{language: string|null, codeString: string|null}
}

export default async function Braintesting({ params }: paramstype) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;
  const redis = Redis.fromEnv()
  let qb: Question[];
  if (!id || id === "undefined" || id === "null" || id === "") {
    return notFound()
  }
  const groundobj = await prisma.grounds.findUnique({
    where: { id },
    include: { user: true }
  })
  if (groundobj?.user.id != user?.id) {
    notFound();
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


  const stack = groundobj?.stack;
  if ((groundobj?.grade || 0) > 0) {
    return <Alreadytested />
  }

  const redisFetch: Question[] | null = await redis.get(`ques:${id}`);
  if (!redisFetch) {

    const chatcomp = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
          You are a senior ${stack} engineer, technical interviewer, and educator.
          
          Your task is to generate high-quality multiple-choice questions that accurately assess a developer's knowledge and practical skill level.
          
          Return ONLY valid JSON.
          
          Rules:
          - Return a JSON array.
          - If you include code section in question then provide in code key of object not as string in question
          - Do not include markdown.
          - Do not include explanations.
          - Do not include notes.
          - Do not include any text before or after the JSON.
          - Generate exactly 5 questions.
          - Difficulty must progressively increase from Question 1 to Question 5.
          - Avoid duplicate concepts.
          - Cover different areas of the technology whenever possible.
          - Focus on real-world developer knowledge rather than trivia.
          - Questions may test concepts, debugging, performance, architecture, best practices, APIs, or practical development scenarios.
          
          Required JSON Schema:
          
          [
            {
              "id": 1,
              "questionText": "",
              "options": [
                {
                  "option": "A",
                  "text": ""
                },
                {
                  "option": "B",
                  "text": ""
                },
                {
                  "option": "C",
                  "text": ""
                },
                {
                  "option": "D",
                  "text": ""
                }
              ],
              "answer": "A",
              "code": {"language": "string|null", "codeString":"string|null"}
            }
          ]
          
          Validation Rules:
          - id must be sequential starting from 1.
          - Each question must have exactly 4 options.
          - option values must be A, B, C, D.
          - answer must contain only the correct option letter.
          - Exactly one option must be correct.
          - should have a easy to understand code if reuired and not included in question string give in code key acordingly in schema i gave.
          `
        },
        {
          role: "user",
          content: `
          Technology: ${stack}
          Question Count: 5
          Purpose: Skill Assessment
          
          Difficulty Progression:
          1. Beginner
          2. Beginner-Intermediate
          3. Intermediate
          4. Advanced
          5. Expert
          
          Generate the questions now.
          `
        }
      ],
      model: "openai/gpt-oss-120b",
    });
    const res = chatcomp.choices[0]?.message?.content || "";
    const quesobject = JSON.parse(res);
    await redis.set(`ques:${id}`, quesobject)
    qb = quesobject
  } else {
    qb = redisFetch
  }



  return <Braintestingui groundid={id} ques={qb} />
}