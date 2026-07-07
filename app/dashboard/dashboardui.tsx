"use client";
import { useState, useEffect } from "react";
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from "@/states/userState";
import Link from "next/link";
import { LinkIcon } from 'lucide-react';
import CreateGroundModal from "@/components/ui/groundbuildmodal";
import ComingSoonModal from "@/components/ui/featuresinfo";

interface Ground {
  id: string;
  userid: string;
  name: string;
  stack: string;
  experience: string;
  grade: number;
  createdAt: Date;
}

interface DashboarduiProps {
  ground: Ground[];
  notebooks: Notebook[];
  topic: string[];
}

interface Notebook {
  id: string;
  userid: string;
  title: string | null;
  description: string | null;
}

export default function Dashboardui({ ground, notebooks, topic }: DashboarduiProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();
  const [isgroundopen, setisgroundopen] = useState<boolean>(false);
  const [isNoticeOpen, setisNoticeOpen] = useState<boolean>(true);

  const brutalBoxStyle = "bg-transparent border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200";

  return (
    <>
      {isNoticeOpen && <ComingSoonModal isOpen={isNoticeOpen} onClose={() => { setisNoticeOpen(false); }} />}
      {isgroundopen && <CreateGroundModal isOpen={isgroundopen} onClose={() => setisgroundopen(false)} />}
      {ground.length > 0 ? (
        <div className="bg-[#f0f0f0] w-full overflow-x-hidden min-h-screen text-black font-mono antialiased">
          <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            Avatar={avatar}
            logout={logoutUser}
          />

          <main className="w-full mx-auto px-6 py-10 space-y-10 md:px-12 lg:px-16 max-w-[1800px]">

           {/* upper metrics column*/}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Notebook Highlights Section*/}
                  <div className={`${brutalBoxStyle} p-8 flex flex-col justify-between min-h-[300px]`}>
                    <div className="w-full">
                      <h3 className="text-base font-black tracking-wider uppercase border-b-2 border-black pb-1 self-start inline-block">
                        Notebook Highlights
                      </h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-start w-full mt-4">
                      {notebooks.length === 0 ? (
                        <div className="text-center space-y-3 py-4 my-auto">
                          <p className="text-xs font-bold text-black/60 italic">No note is created yet</p>
                          <Link href={'/notebook'}>
                            <button className="px-4 py-2 text-xs font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all">
                              Create Notebook
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3 h-[180px] min-h-[180px] max-h-[180px] overflow-y-auto pr-1">
                          {notebooks.map((notebook) => (
                            <div
                              key={notebook.id}
                              className="p-3 bg-white/50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4"
                            >
                              <span className="font-bold text-sm truncate tracking-tight">
                                {notebook.title}
                              </span>
                              <Link href={`/notebook?shownotemodal=true&noteq=${encodeURIComponent(
                                JSON.stringify(notebook)
                              )}`}>
                                <LinkIcon size={20} />
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-[10px] font-bold text-black/50 mt-2">
                      Total: {notebooks.length} Notes
                    </p>
                  </div>

                 {/* topics revised*/}
                  <div className={`${brutalBoxStyle} p-8 flex flex-col justify-between min-h-[300px]`}>
                    <div className="w-full">
                      <h3 className="text-base font-black tracking-wider uppercase border-b-2 border-black pb-1 self-start inline-block">
                        Topics Revised
                      </h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-start w-full mt-4">
                      {topic.length === 0 ? (
                        <div className="text-center py-4 my-auto">
                          <p className="text-xs font-bold text-black/60 italic">No topics recorded yet. Please create session.</p>
                        </div>
                      ) : (
                        <div className="flex flex-wrap content-start items-start justify-start gap-3 h-[180px] min-h-[180px] max-h-[180px] overflow-y-auto pr-1 py-1">
                          {topic.map((topic, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 bg-black text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
                            >
                              {topic}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-[10px] font-bold text-black/50 mt-2">
                      Total topics: {topic.length}
                    </p>
                  </div>

            </div>

            {/* grounds box */}
            <div className={`${brutalBoxStyle} p-8 min-h-[400px] flex flex-col justify-between`}>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-6 mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    TOP RECENT GROUNDS
                  </h2>
                </div>

                {ground.length > 0 && (
                  <button onClick={() => setisgroundopen(true)} className="px-6 py-3 text-xs cursor-pointer font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-none self-start sm:self-center">
                    Create New Ground
                  </button>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {ground.length === 0 ? (
                  <div className="text-center space-y-6 py-12">
                    <div className="text-4xl">[-]</div>
                    <div>
                      <p className="text-sm font-black uppercase">No active operations initialized.</p>
                      <p className="text-xs text-black/50 mt-1">System standby mode.</p>
                    </div>
                    <button onClick={() => setisgroundopen(true)} className="px-6 py-3 text-sm cursor-pointer font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] mx-auto block">
                      Create New Ground
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 align-top auto-rows-start">
                      {ground.map((s) => (
                        <Link href={`/ground/${s.id}`} key={s.id}>
                          <div className="p-6 bg-white/40 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex flex-col justify-between space-y-4 min-h-[140px]">
                            <h4 className="font-black text-base tracking-tight leading-snug">
                              {s.name}
                            </h4>
                            <div className="flex">
                              <span className="text-[10px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1">
                                {s.stack}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="flex justify-end pt-2">
                      <Link href={'/ground'}>
                        <button className="flex items-center cursor-pointer gap-2 bg-black text-white border-2 border-black font-mono text-xs font-black uppercase px-4 py-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] transition-all">
                          <span>View More</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-4 h-4"
                            color="#ffffff"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </main>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono text-black">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-6">
            No ground is created yet.
          </h1>
          <p className="text-sm font-bold uppercase tracking-tight text-gray-600 mb-10 text-center">
            Initialize your first workspace and learning to begin.
          </p>
          <button
            onClick={() => setisgroundopen(true)}
            className="bg-white text-black cursor-pointer text-lg font-black uppercase tracking-[0.2em] px-10 py-5 border-4 border-black hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:text-black transition-all duration-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Create New
          </button>
        </div>
      )}
    </>
  );
}