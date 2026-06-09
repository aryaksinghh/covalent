'use client';

import React from 'react';
import { LayoutDashboard, Box, Newspaper, User, LogOut, X, BookAIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  Avatar : string | null
  logout : ()=> void
}

export default function Sidebar({ isOpen, onClose, Avatar, logout }: SidebarProps) {
  return (
    <>
      {/* Background overlay (tap to close) */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div className={`fixed top-0 left-0 h-[calc(100vh)] w-72 bg-[#eeeeee] border-r-2 border-black z-50 transform transition-transform duration-300 ease-in-out font-mono ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="p-4 border-b-2 border-black flex justify-between items-center bg-white">
          <span className="font-bold text-xs uppercase tracking-tighter text-zinc-500 underline decoration-black">System Menu</span>
          <button 
            onClick={onClose}
            className="border-2 cursor-pointer border-black p-1 hover:bg-black hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          {[
            { name: 'Dashboard', icon: <LayoutDashboard size={20} />, ref:'/dashboard' },
            { name: 'Clusters', icon: <Box size={20} />, ref:'/clusters' },
            { name: 'Blogs', icon: <Newspaper size={20} />, ref:'/blogs' },
            { name: 'Notebook', icon: <BookAIcon size={20} />, ref:'/notebook' },
            { name: 'Profile', icon: <User size={20} />, ref:'/profile' },
          ].map((item) => (
            <Link href={item.ref} key={item.name}><button
              
              className="w-full cursor-pointer flex items-center gap-3 border-2 border-transparent hover:border-black hover:bg-white p-3 transition-all hover:shadow-[4px_4px_0px_0px_#000000] group"
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold uppercase text-sm">{item.name}</span>
            </button></Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <button onClick={logout} className="w-full cursor-pointer flex items-center justify-between border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_#000000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all group">
            <div className="flex items-center  gap-3">
              <div className="w-8 h-8 border-2 border-black bg-zinc-200 overflow-hidden">
                 <Image width={80} height={80} src={Avatar || "/api/placeholder/32/32"} alt="User" />
              </div>
              <span className="font-bold uppercase text-xs">Logout</span>
            </div>
            <LogOut size={18} className="text-zinc-400 group-hover:text-black" />
          </button>
        </div>
      </div>
    </>
  );
}