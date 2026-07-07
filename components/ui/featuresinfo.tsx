"use client";

import React, {useEffect, useState} from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  const[shown, setshown] = useState<boolean>(false)  
 
  useEffect(()=>{
    const show = sessionStorage.getItem("isshown")
    if(show) setshown(true);
  },[])
  if (!isOpen || shown) return null;
  
  const handleonclose = ()=>{
   sessionStorage.setItem("isshown", "true")
   onClose();
  }
  

  return (
    <div className="fixed inset-0 z-50 font-source flex items-center justify-center p-4">
      
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md transform bg-white border-[3px] border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all font-mono">
        
        <div className="inline-block bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-4">
          FEATURE COMING
        </div>

        <button
          onClick={handleonclose}
          className="absolute top-4 cursor-pointer right-4 border-2 border-black bg-white px-2 py-0.5 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-red-500 transition-all active:bg-gray-100"
        >
          ✕
        </button>

        <h3 className="text-xl font-black uppercase tracking-tight border-b-2 border-black pb-2 mb-4">
          Spaced Repetition mechanics
        </h3>

        <div className="space-y-4 text-sm leading-relaxed text-black">
          <p>
           Spaced repetition mechanics feature will soon be implemented. This is one of the great learning trick to learn things forever and clearly. You will get notified. 
          </p>
          
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleonclose}
            className="w-full sm:w-auto cursor-pointer bg-black text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] outline-none hover:bg-neutral-900 active:translate-x-[1px] active:translate-y-[1px]"
          >
            ACKNOWLEDGE
          </button>
        </div>
      </div>
    </div>
  );
}