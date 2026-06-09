'use client';

import React, { useEffect, useState } from 'react';


const emojiArray = ['👾', '🚀', '🐊', '🔥', '🏈', '😎'];

// 1. Define the interface so it can receive the toggle action from your page
interface InfoBarProps {
  onMenuClick: () => void;
  FetchUser: ()=> void;
  Name: string | null
}

export default function InfoBar({ onMenuClick, Name, FetchUser }: InfoBarProps) {

  const [randomEmoji, setRandomEmoji] = useState<string>('');

  useEffect(() => {
    FetchUser(); // Fetch user data
    const randomIndex = Math.floor(Math.random() * emojiArray.length); 
    setRandomEmoji(emojiArray[randomIndex]); 
  }, [FetchUser]);

  return (
    <div className="w-full bg-[#eeeeee] text-black font-source border-b-2 border-black selection:bg-black selection:text-white">
      <div className="max-w-8xl mx-auto h-12 px-8 flex items-center justify-between">
        
        {/* Left Side: Welcome String */}
        <div className="text-sm font-bold tracking-tight flex items-center gap-1.5 select-none">
          <span>Welcome,</span>
          <span className="underline decoration-1 underline-offset-4">{Name?.split(' ')[0]}</span>
          <span>{randomEmoji}</span> {/* Render the random emoji */}
        </div>

        {/* Right Side: Hamburger Button connected to prop */}
        <button
          onClick={onMenuClick} // 2. Trigger the toggle here!
          aria-label="Toggle Sidebar Menu"
          className="h-8 w-9 border-2 cursor-pointer border-black bg-white flex flex-col items-center justify-center gap-1 transition-transform active:translate-x-[2px] active:translate-y-[2px] shadow-[2px_2px_0px_0px_#000000] active:shadow-none focus:outline-none"
        >
          <span className="w-4 h-[2px] bg-black block"></span>
          <span className="w-4 h-[2px] bg-black block"></span>
          <span className="w-4 h-[2px] bg-black block"></span>
        </button>
      </div>
    </div>
  );
}