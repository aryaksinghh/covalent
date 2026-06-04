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
        
            <div className="w-full aspect-video border-2 border-black bg-white flex flex-col items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {/* Play symbol mockup */}
              <div className="w-16 h-16 border-2 border-black rounded-none bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-transform active:scale-95">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-black border-b-[10px] border-b-transparent ml-1" />
              </div>
              <span className="font-source text-xs mt-4 uppercase tracking-widest font-bold">
                In-Engine Demo Video
              </span>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="font-source text-3xl font-bold text-center border-b-1 border-black pb-2 max-w-md mx-auto">
              Featured Engine Tools
            </h2>
       
            <div className="flex flex-col border-t-2 border-black">
              {[
                "AST-driven logic checks checking code correctness patterns dynamically.",
                "Semantic gap parsing highlighting missing code parameters real-time.",
                "Recursive complexity refactoring loops to boil down dense jargon elements.",
                "Deterministic spaced repetition schedules custom calibrated to memory structures."
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
                { step: "1", title: "Concept Atomization", desc: "Isolate complex architectural modules into standalone modules." },
                { step: "2", title: "Plain-text Formulation", desc: "Compose semantic logic translations void of technical boilerplate terminology." },
                { step: "3", title: "Recursive Correction", desc: "Execute compilation checks against logic patterns to catch cognitive errors." },
                { step: "4", title: "Recursive Correction", desc: "Execute compilation checks against logic patterns to catch cognitive errors." }
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

        <section className="font-source p-6 md:p-10 space-y-6 pb-20">
          <h2 className="font-source text-3xl font-bold text-center tracking-tight border-b-1 border-black pb-2 max-w-30 mx-auto">
            FAQ&apos;s
          </h2>
          
          <div className="space-y-4 pt-4">
            {[
              { q: "How exactly does the AI assess my technical accuracy expressions?", a: "The compiler models use structural semantic dependency mapping to read your language descriptions against parsed Abstract Syntax Trees (AST) definitions to highlight accurate logic implementations." },
              { q: "Is this tool suited for complete language newcomers or advanced devs?", a: "It targets production engineers refactoring specialized domain mechanics, but scales dynamically based on the codebase blueprints injected into the project context space." },
              { q: "Can I directly integrate local private repository contexts safely?", a: "Yes. Context strings clean completely from memory caches during validation engine sessions, keeping your backend architecture secure." },
              { q: "Can I directly integrate local private repository contexts safely?", a: "Yes. Context strings clean completely from memory caches during validation engine sessions, keeping your backend architecture secure." }
            ].map((faq, idx) => (
              <details 
                key={idx} 
                className="group border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] open:translate-x-[2px] open:translate-y-[2px] open:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 select-none"
              >
                <summary className="p-4 flex items-center justify-between cursor-pointer font-source font-bold text-base md:text-lg list-none">
                  <span>{faq.q}</span>
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