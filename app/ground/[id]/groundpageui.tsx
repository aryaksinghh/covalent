"use client"
import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import Sidebar from '@/components/ui/sidebar';
import InfoBar from '@/components/ui/infobar';
import { useUserState } from '@/states/userState';
import CreateSessionModal from '@/components/ui/sessionmodal';
import Link from 'next/link';
interface Session {
  id: string;
  groundid: string;
  name: string;
  userid: string;
  type: string;
  score: number;
  createdAt: Date;
  questions: string[];
  answers: string[];
  topics: string[];
  topic_level: string[];
}

interface GroundInfo {
  ground: {
    id: string;
    name: string;
    experience: string;
    grade: number;
    userid: string;
    category: string;
    stack: string;
    session: Session[];
    createdAt: Date;
  };
}

export default function Groundpageui({ ground }: GroundInfo) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();

  return (<>
    {isOpen && <CreateSessionModal isOpen onClose={() => setisOpen(false)} currentTechStack={ground.stack} groundid={ground.id} />}
    <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />

    <Sidebar
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      Avatar={avatar}
      logout={logoutUser}
    />
    <div className="min-h-screen bg-[#f0f0f0] p-6 font-mono text-black antialiased">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* UPPER CONTAINER */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[100px]">Name:</span>
                <span className="bg-black text-white px-2 py-0.5 text-xs font-black tracking-wider uppercase">
                  {ground.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[100px]">Tech Stack:</span>
                <span className="font-medium tracking-tight uppercase">{ground.stack}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[100px]">Experience:</span>
                <span className="font-medium uppercase">{ground.experience}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold min-w-[100px]">Grade:</span>
                <span className="font-medium">{ground.grade}</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <span className="block text-xs font-black uppercase tracking-wider mb-2">Grade (Provided by your evaluation test)</span>
              <div className="flex border-2 border-black">
                {/* Giant current grade score block */}
                <div className="w-1/3 bg-white flex items-center justify-center text-4xl font-black border-r-2 border-black p-4">
                  {ground.grade}
                </div>
                {/* Descriptions mapping columns next to it */}
                <div className="w-2/3 bg-[#f5f5f5] divide-y-2 divide-black text-[11px] font-bold">
                  <div className={`p-1.5 flex items-center gap-2 ${ground.grade === 1 ? 'bg-black text-white' : ''}`}>
                    <span className="w-4 border border-current text-center text-[10px]">1</span> CORE
                  </div>
                  <div className={`p-1.5 flex items-center gap-2 ${ground.grade === 2 ? 'bg-black text-white' : ''}`}>
                    <span className="w-4 border border-current text-center text-[10px]">2</span> ARCHITECT
                  </div>
                  <div className={`p-1.5 flex items-center gap-2 ${ground.grade === 3 ? 'bg-black text-white' : ''}`}>
                    <span className="w-4 border border-current text-center text-[10px]">3</span> MASTERMIND
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col justify-center h-full pt-4 lg:pt-0">
              <button
                onClick={() => setisOpen(true)}
                className="w-full cursor-pointer bg-black text-white font-black text-xs uppercase tracking-widest py-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all"
              >
                Create Session
              </button>

            </div>

          </div>
        </div>

        {/* BOTTOM CONTAINER */}
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-2 border-black pb-3 mb-6">
            <h2 className="text-xl font-black tracking-tight uppercase">Sessions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ground.session.length == 0 && <div className='mt-6 text-2xl text-black'>No session is created yet</div>}
            {ground.session.map((session) => (
              <div
                key={session.id}
                className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between min-h-[120px] hover:-translate-y-0.5 transition-transform"
              >
                <div>
                  <h3 className="font-black text-base uppercase border-b border-gray-200 pb-1 mb-2 tracking-wide">
                    {session.name}
                  </h3>
                  <div className="space-y-0.5 text-xs">
                    <div className="text-gray-600">
                      <span className="font-bold text-black">Tech Stack:</span> {ground.stack}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-bold text-black">Date:</span> {new Date(session.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Link href={`/ground/${ground.id}/session/${session.id}`}><button
                    title="Enter Session"
                    className="p-1.5 bg-white border-2 cursor-pointer border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Link2 className="w-4 h-4 stroke-[2.5]" />
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </>);
}