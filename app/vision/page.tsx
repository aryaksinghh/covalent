import React from 'react';

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] text-black p-6 md:p-12 font-mono selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12 border-l border-r border-black/10 px-4 md:px-8">
        
        <div className="text-center py-4">
          <h1 className="text-2xl md:text-3xl font-bold inline-block border-b-2 border-black pb-2 uppercase tracking-wide">
            Techniques & Philosophy
          </h1>
        </div>

        <div className="border-2 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_#000000] space-y-4">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <span className="w-3 h-3 bg-black block"></span>
            <h2 className="text-lg font-bold uppercase tracking-tight">The Richard Feynman Paradigm</h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-800">
            True technical competence is proven when you can distill complex system mechanics into plain, stark assertions. 
            Covalent utilizes AI workflows inspired directly by the Feynman Technique—demanding you break down algorithms, 
            explain engine loops simply, and dynamically expose hidden knowledge gaps in your logic.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-6 md:p-8 shadow-[6px_6px_0px_0px_#000000] space-y-4">
          <div className="flex items-center gap-2 border-b border-black pb-2">
            <span className="w-3 h-3 bg-black block"></span>
            <h2 className="text-lg font-bold uppercase tracking-tight">Personalized Brain Dashboard</h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-800">
            Stop guessing your level of mastery. The Personalized Brain Dashboard tracks your real-time input telemetry, 
            calculating intellectual retention over specified intervals. It registers exactly when your recall of programming 
            concepts begins to decay, triggering automated spaced-repetition spikes to keep your edge razor-sharp.
          </p>
        </div>

      </div>
    </div>
  );
}