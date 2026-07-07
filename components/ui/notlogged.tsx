'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, ShieldAlert } from 'lucide-react';

export default function NoUserPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0e12] px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="w-full max-w-md border-2 border-slate-800 bg-[#16181f] p-8 text-center shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(245,158,11,1)] duration-200">
        
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center border-2 border-slate-700 bg-[#1e222b] text-amber-500 shadow-[4px_4px_0px_0px_rgba(51,65,85,1)]">
            <ShieldAlert size={32} strokeWidth={2} />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
          Access Denied
        </h1>
        
        <p className="mb-8 text-sm leading-relaxed text-slate-400">
          You are not logged in. Please authenticate your account to view this secure dashboard and manage your projects.
        </p>

        <Link href="/login" passHref>
          <button className="flex w-full items-center justify-center gap-3 border-2 border-amber-500 bg-amber-500 py-3 px-6 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-transparent hover:text-amber-500 active:translate-y-0.5">
            <LogIn size={18} strokeWidth={2.5} />
            Sign In to Account
          </button>
        </Link>

        <div className="mt-6 text-xs text-slate-500">
          Need help?{' '}
          <a href="#" className="text-slate-400 underline decoration-slate-600 hover:text-amber-500 hover:decoration-amber-500">
            Contact support
          </a>
        </div>

      </div>
    </div>
  );
}