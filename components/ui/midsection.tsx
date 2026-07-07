"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function Midsection() {
  return (
    <div className="w-full border-b-1 text-black">
      <div className="max-w-5xl mx-auto md:border-x-1 border-black bg-transparent">

        <section className="font-source p-6 md:p-10 space-y-10 border-b-1 border-black">

          <div className="space-y-4">
            <span className="font-source text-xs uppercase tracking-wider text-gray-500 block text-center">
              Product Walkthrough
            </span>

            <div className="w-full aspect-video px-5 border-2 border-black bg-white flex flex-col items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {/* Play symbol mockup */}
              <video
                className="w-full rounded-xl outline"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/covalent_demo_edit.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="font-source text-3xl font-bold text-center border-b-1 border-black pb-2 max-w-md mx-auto">
              Featured Engine Tools
            </h2>

            <div className="flex flex-col border-t-2 border-black">
              {[
                "Scientific proven revision workflow with suitable tools.",
                "First principle thinking learning with evaluation through explanation.",
                "Personalized revision content based on your current developer state.",
                "XP points and score provided to keep you motivated towards your revision"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-4 py-3 px-2 border-b-2 border-black bg-white">
                  <div className="w-5 h-5 border-2 border-black flex items-center justify-center shrink-0 bg-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-source text-xs font-bold leading-none select-none">&#10003;</span>
                  </div>
                  <p className="font-source text-sm tracking-tight text-gray-800">{text}</p>
                </div>
              ))}
            </div>
          </div>

        </section>


        <section className="font-source p-6 md:p-10 space-y-8 border-b-1 border-black">
          <h2 className="font-source border-b-1 max-w-xs mx-auto pb-2 text-3xl font-bold text-center tracking-tight">
            Techniques Applied
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">


            <div className="w-full aspect-square border-2 border-black bg-white flex flex-col items-center justify-center p-6 text-center relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]" />
              <Image src={"/brain1.png"} width={350} height={350} alt='brain1' />

            </div>


            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Learn with First Principles",
                  desc: "Break difficult concepts into simple explanations using first-principles thinking, analogies, examples, and summaries until the topic becomes intuitive."
                },
                {
                  step: "2",
                  title: "Teach Back (Feynman Technique)",
                  desc: "Explain the concept in your own words. The AI evaluates your explanation, identifies knowledge gaps, and provides targeted feedback."
                },
                {
                  step: "3",
                  title: "Active Recall Practice",
                  desc: "Strengthen memory with progressively challenging questions after every set of concepts, reinforcing understanding without passive rereading."
                },
                {
                  step: "4",
                  title: "Spaced Repetition Engine",
                  desc: "Concepts you struggle with are automatically scheduled for future revision at optimal intervals until they're retained in long-term memory."
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-source font-bold shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-source font-bold text-base leading-tight">{item.title}</h4>
                    <p className="font-source text-xs text-gray-600 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
        <section className="font-source p-6 md:p-10  border-b-1 space-y-8">
          <h2 className="font-source text-3xl font-bold text-center tracking-tight border-b-1 border-black pb-2 max-w-sm mx-auto">
            Things to Revise
          </h2>

          {[
            {
              title: "Programming Languages",
              items: [
                "JavaScript",
                "TypeScript",
                "Python",
                "Java",
                "C++",
                "Go",
              ],
            },
            {
              title: "Frontend Development",
              items: [
                "HTML",
                "CSS",
                "Tailwind CSS",
                "React",
                "Next.js",
                "Redux",
              ],
            },
            {
              title: "Backend Development",
              items: [
                "Node.js",
                "Express.js",
                "REST APIs",
                "Authentication",
                "WebSockets",
                "Microservices",
              ],
            },
            {
              title: "Databases",
              items: [
                "PostgreSQL",
                "MongoDB",
                "MySQL",
                "Redis",
                "Prisma ORM",
                "Drizzle ORM",
              ],
            },
            {
              title: "Computer Science",
              items: [
                "DSA",
                "DBMS",
                "Operating Systems",
                "Computer Networks",
                "System Design",
                "OOP",
              ],
            },
            
          ].map((section, index) => (
            <div
              key={index}
              className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="border-b-2 border-black bg-black text-white px-4 py-3 font-bold">
                {section.title}
              </div>

              <div className="p-4 flex flex-wrap gap-3">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="border-2 border-black bg-white px-3 py-2 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {item}
                  </div>
                ))}

                
                  <div className="border-2 border-dashed border-black px-3 py-2 text-sm font-semibold bg-gray-100">
                    + Many More...
                  </div>
                
              </div>
            </div>
          ))}
        </section>

        <section className="font-source p-6 md:p-10 space-y-6 pb-20">
          <h2 className="font-source text-3xl font-bold text-center tracking-tight border-b-1 border-black pb-2 max-w-30 mx-auto">
            FAQ&apos;s
          </h2>

          <div className="space-y-4 pt-4">
            {[
              {
                q: "How does the AI evaluate my explanation?",
                a: "Instead of checking for exact wording, the AI analyzes whether you've correctly explained the core concepts, identified important relationships, and demonstrated genuine understanding. It then points out knowledge gaps and suggests what to improve."
              },
              {
                q: "Is this suitable for beginners or only experienced developers?",
                a: "Both. Beginners can learn difficult concepts using first-principles explanations, while experienced developers can use Active Recall and Spaced Repetition to retain advanced topics and prepare for interviews or daily development."
              },
              {
                q: "What makes this different from watching YouTube or reading documentation?",
                a: "Most learning resources are passive. This platform makes you actively learn by understanding concepts deeply, explaining them in your own words, answering recall questions, and revisiting weak topics until they become long-term knowledge."
              },
              {
                q: "How does Spaced Repetition work?",
                a: "Whenever you struggle with a concept or mark it as 'Not Understood', the system automatically schedules it for future revision at scientifically timed intervals to maximize long-term retention."
              },
              {
                q: "Can I revise any programming language or computer science subject?",
                a: "Yes. You can revise topics from JavaScript, TypeScript, React, Next.js, Node.js, Python, Java, DSA, DBMS, Operating Systems, Computer Networks, System Design, and many more."
              },
              {
                q: "Will the difficulty level increase as I improve?",
                a: "Yes. Questions become progressively more challenging as your understanding grows, helping you move from remembering concepts to applying and mastering them."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] open:translate-x-[2px] open:translate-y-[2px] open:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 select-none"
              >
                <summary className="p-4 flex items-center justify-between cursor-pointer font-source font-bold text-base md:text-lg list-none">
                  <span className='w-60 md:w-full'>{faq.q}</span>
                  <span className="font-source text-sm border-2 border-black w-6 h-6 flex items-center justify-center bg-white group-open:bg-black group-open:text-white transition-colors duration-150">
                    +
                  </span>
                </summary>
                <div className="p-4 pt-0 border-t-2 border-black font-source text-xs text-gray-700 bg-gray-50 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}