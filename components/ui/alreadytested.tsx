"use client"
import React from 'react';

export default function Alreadytested() {

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#1A1A1A] flex items-center justify-center p-6 font-mono">
   
      <div className="max-w-md w-full bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
  
        <h1 className="text-3xl font-black uppercase text-center leading-none mb-4 tracking-tight">
          Already Tested
        </h1>

        <div className="space-y-4 text-sm font-medium border-t-2 border-black pt-4 mb-8">
          <p>
            You have already completed your evaluation. Our system confirms that you are fully tested and appointed with your official <span className="underline decoration-2 font-bold">Brain Grade</span>.
          </p>
          <p className="text-gray-600">
            No further testing is required for this revision ground. You can review your previous step or return to the main dashboard.
          </p>
        </div>

  
        <button
          onClick={handleGoBack}
          className="w-full bg-white cursor-pointer text-black font-black uppercase border-2 border-black py-3 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center block text-sm tracking-wide"
        >
          ← Go Back to Previous Step
        </button>
        
      </div>
    </div>
  );
}