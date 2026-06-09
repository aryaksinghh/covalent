import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] text-black p-6 md:p-12 font-mono text-xs selection:bg-black selection:text-white">
      <div className="max-w-3xl mx-auto border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_#000000] space-y-8">
        
        {/* Document Header */}
        <div className="border-b-2 border-black pb-4">
          <h1 className="text-lg font-bold uppercase tracking-widest">COVALENT // PRIVACY_PROTOCOL</h1>
          <div className="text-zinc-500 mt-1 space-y-0.5">
            <p>DOC_TYPE: DATA_TELEMETRY_POLICY</p>
            <p>UPDATED: JUNE_2026</p>
          </div>
        </div>

        {/* Content Modules */}
        <div className="space-y-4">
          
          <div className="border border-black p-4">
            <span className="font-bold uppercase block mb-2">1.0 SECURE INTAKE REQUIRING MAPS</span>
            <p className="text-zinc-700 leading-relaxed mb-2">
              To plot your progress inside the dynamic Brain Dashboard system, the platform processes:
            </p>
            <div className="pl-4 space-y-1 text-zinc-600 font-sans text-xs">
              <p>• Explanations provided during Feynman active review loops.</p>
              <p>• Code performance diagnostics inside native sandbox instances.</p>
              <p>• Telemetry surrounding response times and structural accuracy indices.</p>
            </div>
          </div>

          <div className="border border-black p-4">
            <span className="font-bold uppercase block mb-2">2.0 LOCALIZED PROCESSING INSULATION</span>
            <p className="text-zinc-700 leading-relaxed">
              Your structural syntax submissions, technical text explanations, and programming frameworks are isolated directly into localized logic streams to keep your product development processes secure.
            </p>
          </div>

          <div className="border border-black p-4">
            <span className="font-bold uppercase block mb-2">3.0 ABSOLUTE PROFILE DISPOSAL</span>
            <p className="text-zinc-700 leading-relaxed">
              Data sovereignty belongs to you. You can issue a direct deletion event to instantly flush out all logged history, metrics, and recorded brain snapshots entirely from our physical clusters.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}