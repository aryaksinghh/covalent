import Learningengineui from "./learningengineui"
import { prisma } from "@/prisma_setup/main"
import { createClient } from "@/lib/supabase/server"
import Groq from "groq-sdk";
import { Redis } from '@upstash/redis'
import { notFound } from "next/navigation";
import FallbackSessionDone from "@/components/ui/fallbacksessiondone";

type ConceptNode = {
    id: number;
    type: "concept";
    title: string;
    solution: string;
};

type MCQNode = {
    id: number;
    type: "mcq";
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
};

type StudyNode = ConceptNode | MCQNode;

interface searchProps {
    searchParams: Promise<{ type?: string, quesno?: string }>,
    params: { id: string, sessionid: string }
}

export default async function Learningengine({ searchParams, params }: searchProps) {
    const { type, quesno } = await searchParams;
    const { id, sessionid } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const redis = Redis.fromEnv();
    let slidedata: StudyNode[];

    const groundobj = await prisma.grounds.findUnique({
        where: { id },
        include: { session: { where: { id: sessionid } } }
    })
    if(!groundobj?.session[0] || !groundobj){
      notFound();
    }

    if(groundobj?.session[0]?.iscompleted){
        return <FallbackSessionDone groundid={id} sid={sessionid}/>
    }

    const redisFetch: StudyNode[] | null = await redis.get(`node:${sessionid}`);
    if (!redisFetch) {
        const chatcomp = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `
              You are an elite software engineer, technical mentor, curriculum designer, and learning scientist.
              
              Your job is to generate a structured revision workflow for developers.
              
              The purpose is NOT interviewing.
              The purpose is helping a developer revise important concepts, strengthen retention, and verify understanding through targeted questions.
              
              You must personalize the content using:
              
              - Technology Stack
              - Topic Name
              - Experience Level
              - Skill Grade
              - Session Type
              
              GRADE SYSTEM
              
              1 = Beginner
              2 = Intermediate
              3 = Good Understanding
              
              DIFFICULTY RULES
              
              If Grade = 1:
              - Focus on fundamentals.
              - Use simple language.
              - Explain jargon.
              - Use analogies and examples.
              - Prioritize understanding.
              
              If Grade = 2:
              - Assume basic knowledge exists.
              - Focus on practical concepts.
              - Reinforce important fundamentals.
              - Introduce real-world developer thinking.
              
              If Grade = 3:
              - Include deeper concepts.
              - Include debugging, performance, architecture, best practices.
              - Still keep explanations concise.
              
              CONTENT GENERATION RULES
              
              Generate exactly the requested number of concepts.
              
              After every 5 concepts, generate exactly 5 questions related to those concepts.
              
              Questions must verify understanding of concepts that were just taught.
              
              The workflow pattern must be:
              
              5 concepts
              5 questions
              5 concepts
              5 questions
              
              and continue until all concepts are covered.
              
              CONCEPT RULES
              
              Each concept must:
              
              - Teach one important idea.
              - Have a short title.
              - Be easy to understand.
              - Be useful for real developers.
              - Include practical examples when helpful.
              - Include analogies when helpful.
              - Explain WHY the concept matters.
              - Avoid unnecessary theory.
              - Avoid huge paragraphs.
              - Focus on retention.
              
              QUESTION RULES
              
              Questions may be:
              
              - MCQ
              - Code Understanding
              - Output Prediction
              - Debugging
              - Scenario Based
              - Best Practice
              
              Questions must:
              
              - Verify understanding.
              - Reinforce memory.
              - Test practical thinking.
              - Avoid trivia.
              - Avoid trick questions.
              - Have exactly 4 options.
              - Have only one correct answer.
              - Include a short explanation.
              
              EXPLANATION RULES
              
              Question explanations must:
              
              - Be concise.
              - Explain why the answer is correct.
              - Help the learner remember the concept.
              - Avoid excessive depth.
              
              OUTPUT RULES
              
              Return ONLY valid JSON.
              
              Do not use markdown.
              
              Do not wrap response in code fences.
              
              Do not add notes.
              
              Do not add comments.
              
              Do not add text before or after JSON.
              
              SCHEMA
              
              [
                {
                  "id": 1,
                  "type": "concept",
                  "title": "",
                  "solution": ""
                },
                {
                  "id": 2,
                  "type": "mcq",
                  "question": "",
                  "options": ["","","",""],
                  "correctIndex": 0,
                  "explanation": ""
                }
              ]
              
              VALIDATION
              
              - ids must be sequential.
              - type must be either "concept" or "mcq".
              - Every concept requires title and solution.
              - Every question requires question, options, correctIndex and explanation.
              - Options length must always be 4.
              - correctIndex must be between 0 and 3.
              - Return only the JSON array.
              `
                },
                {
                    role: "user",
                    content: `
              Create a personalized revision workflow.
              
              Technology Stack:
              ${groundobj?.stack}
              
              Category:
              ${groundobj?.category}
              
              Experience Level:
              ${groundobj?.experience}
              
              Current Skill Grade:
              ${groundobj?.grade}
              
              
              Total Concepts Required:
              ${quesno}
              
              Additional Requirements:
              
              - Select the most important concepts for this topic and skill level.
              - Prioritize concepts developers actually use in projects.
              - Concepts should build progressively.
              - Explanations should be easy to understand.
              - Use examples when useful.
              - Questions should directly test understanding of generated concepts.
              - Help the learner remember and apply knowledge, not just memorize definitions.
              
              Generate the revision workflow now.
              `
                }
            ],
            model: "openai/gpt-oss-120b",
        });
        const res = chatcomp.choices[0]?.message?.content || "";
        const quesobject = JSON.parse(res);
        await redis.set(`node:${sessionid}`, quesobject)
        const conceptarr: ConceptNode[] = quesobject.filter((s: StudyNode) => s.type == "concept");
        const conceptdbarr: string[] = []
        conceptarr.forEach((s) => {
            conceptdbarr.push(s.title)
        })
        const quesarr: MCQNode[] = quesobject.filter((s: StudyNode) => s.type == "mcq");
        const ansdbarr: string[] = []
        const quesdbarr: string[] = []
        quesarr.forEach((s) => {
            quesdbarr.push(s.question)
            ansdbarr.push(s.options[s.correctIndex]);
        })

        try {
            const insertNode = await prisma.sessions.update({
                where: { id: sessionid },
                data: {
                    topics: conceptdbarr,
                    questions: quesdbarr,
                    answers: ansdbarr,
                    xp: conceptarr.length * 4
                }
            })
            const updatinguser = await prisma.user.update({
                where: { id: user?.id },
                data: {
                    xp: {
                        increment: conceptarr.length * 4
                    }
                }
            })

        } catch (err) {
            console.log("error occured while updating database for conceptnodes", err)
        }

        slidedata = quesobject
    } else {
        slidedata = redisFetch
    }

    return (
        <Learningengineui Nodeworkflow={slidedata} sid={sessionid} />
    )
}

