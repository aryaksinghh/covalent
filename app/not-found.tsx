'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-center p-4 font-mono select-none">
      
      {/* Main Error Box */}
      <div className="w-full max-w-md bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center relative">
        
        {/* Decorative Top Bar to mimic a terminal or widget look */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-black text-white text-xs flex items-center px-3 justify-between font-black uppercase tracking-wider">
          <span>SYSTEM_ERROR_LOG</span>
          <span>[!]</span>
        </div>

        {/* Big Code Error */}
        <h1 className="text-7xl font-black text-black mt-6 mb-2 tracking-tighter">
          404
        </h1>
        
        {/* Title Indicator */}
        <div className="inline-block bg-black text-white text-xs font-black px-2 py-0.5 uppercase tracking-widest mb-6">
          PAGE NOT FOUND
        </div>

        {/* Console / Status Message */}
        <div className="border-2 border-black bg-[#f3f3f3] p-4 text-left mb-8 relative">
          <div className="text-xs font-black text-black uppercase mb-1 border-b border-black/20 pb-1">
            Status Report:
          </div>
          <p className="text-sm text-zinc-800 font-medium leading-relaxed">
            This page could not be found
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
          <Link 
            href="/"
            className="border-2 border-black bg-black text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-zinc-900 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] inline-block active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Return to Dashboard
          </Link>
        </div>

      </div>

    </div>
  );
}