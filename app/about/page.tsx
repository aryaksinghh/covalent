import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] text-black p-6 md:p-12 font-mono selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12 border-l border-r border-black/10 px-4 md:px-8">
        
        {/* Main Header Block */}
        <div className="border-2 border-black bg-white p-8 shadow-[6px_6px_0px_0px_#000000]">
          <h1 className="text-3xl font-bold tracking-tight uppercase border-b-2 border-black pb-4 mb-4">
            About Covalent
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-zinc-800">
            In chemistry, a covalent bond represents the strongest connection formed by shared elements. 
            In software engineering, Covalent is a high-performance, active-revision engine built to 
            help developers permanently lock in syntax, paradigms, and system architectures while 
            completely systematically eliminating imposter syndrome.
          </p>
        </div>

        {/* Core Pillars Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-center underline decoration-2 underline-offset-8 uppercase tracking-wider mb-8">
            Core Mechanics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000000] flex gap-4">
              <div className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-base mb-2">Cross-Platform Training</h3>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Engineered with frictionless transition architectures. Access micro-quizzes, core programming syntax flashcards, and structural challenges fluidly across mobile views or desktop terminals.
                </p>
              </div>
            </div>

            <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_#000000] flex gap-4">
              <div className="bg-black text-white font-bold w-8 h-8 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-base mb-2">Native Compilation</h3>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  Write code within live mobile and web environments. No synthetic mock tests—just real execution structures meant to cultivate genuine, functional memory retention from anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}