import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#eeeeee] text-black p-6 md:p-12 font-mono text-xs selection:bg-black selection:text-white">
      <div className="max-w-3xl mx-auto border-2 border-black bg-white p-6 md:p-10 shadow-[8px_8px_0px_0px_#000000] space-y-8">
        
        {/* System Logs Style Header */}
        <div className="border-b-2 border-black pb-4">
          <h1 className="text-lg font-bold uppercase tracking-widest">COVALENT // TERMS_OF_SERVICE</h1>
          <div className="text-zinc-500 mt-1 space-y-0.5">
            <p>REF_ID: TOS-2026-v1</p>
            <p>STATUS: ACTIVE_ENFORCEMENT</p>
          </div>
        </div>

        {/* Rule Blocks */}
        <div className="space-y-4">
          
          <div className="border border-black p-4 bg-[#eeeeee]/40">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked readOnly className="accent-black w-4 h-4 rounded-none border-2 border-black" />
              <span className="font-bold uppercase">[01] ACCEPTANCE OF ARCHITECTURE</span>
            </div>
            <p className="text-zinc-700 pl-6 leading-relaxed">
              By accessing the Covalent core engine via web terminals or mobile client interfaces, you authorize adherence to all behavioral verification guidelines laid down herein.
            </p>
          </div>

          <div className="border border-black p-4 bg-[#eeeeee]/40">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked readOnly className="accent-black w-4 h-4 rounded-none border-2 border-black" />
              <span className="font-bold uppercase">[02] COMPILATION ENVIRONMENT ABUSE</span>
            </div>
            <p className="text-zinc-700 pl-6 leading-relaxed">
              You are granted access to live code sandboxes. Any deployment of automated scripts to stress execution layers, escape containers, or inject destructive vectors terminates your access key immediately.
            </p>
          </div>

          <div className="border border-black p-4 bg-[#eeeeee]/40">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked readOnly className="accent-black w-4 h-4 rounded-none border-2 border-black" />
              <span className="font-bold uppercase">[03] SYSTEM WARRANTY REJECTION</span>
            </div>
            <p className="text-zinc-700 pl-6 leading-relaxed">
              Covalent delivers metrics as-is. We assume no legal or programmatic liability for memory data point synchronization failures or any individual cloud storage system loss.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}