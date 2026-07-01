import React from 'react';
import Link from 'next/link';

export default function FallbackSessionDone() {
  return (
    <div className="w-full max-w-md bg-gray-50 p-6 flex justify-center items-center">
      {/* Neo-brutalist card container: 
        Sharp corners, thick black border, and a solid offset black shadow 
      */}
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-8 w-full flex flex-col gap-6">
        <p className="font-mono text-black text-sm md:text-base font-bold tracking-tight">
          This session is already completed.
        </p>
        
        <Link 
          href="/session-feedback"
          className="bg-black text-white font-mono text-xs md:text-sm font-bold px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 text-center uppercase tracking-wide inline-block"
        >
          Session Feedback Page
        </Link>
      </div>
    </div>
  );
}