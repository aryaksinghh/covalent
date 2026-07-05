"use client";

import React, { useState } from "react";
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from "@/states/userState";
import NotebookModal from "./notebookmodal";
import NoteModal from "./noteeditingmodal";
import { useRouter } from "next/navigation";



interface Note {
  id: string;
  title: string;
  preview: string;
  description: string;
  createdAt: Date;
}

export default function NotebookUI({ notes }: { notes: Note[] }) {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [isEditingOpen, setisEditingOpen] = useState<boolean>(false);
  const router = useRouter()
  

  return (
    <>
  
      {isOpen && <NotebookModal onClose={() => {
        setisOpen(false)
        setSelectedNote(null)
        }} note={selectedNote} onClickEdit={()=>{setisOpen(false); setisEditingOpen(true);}} />}

      {isEditingOpen && <NoteModal onClose={()=> {setisEditingOpen(false); setSelectedNote(null); router.refresh()}}  note={selectedNote} /> }  

      <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        Avatar={avatar}
        logout={logoutUser}
      />

      <div className="min-h-screen bg-[#ebebeb] p-6 md:p-12 font-source text-black">
        <div className="max-w-2xl mx-auto">
          {/* Header Bar */}
          <div className="border-2 border-black bg-white p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black tracking-wider uppercase font-mono">
                NOTEBOOK RECORDS
              </h1>
              <p className="text-xs font-mono text-gray-600 mt-1">
                TOTAL: {notes?.length} notes
              </p>
            </div>
            <button onClick={()=> setisEditingOpen(true)} className="border-2 cursor-pointer border-black bg-black text-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all hover:bg-white hover:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              + NEW NOTE
            </button>
          </div>

          {/* --- SCROLLABLE NOTEBOOK CONTAINER --- */}
          <div className="border-2 border-black bg-[#f8f8f8] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {/* Inner scroll box: max-h-[520px] gives an optimal medium height */}
            <div className="max-h-[520px] min-h-[520px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {notes.length === 0 && <div className="text-black text-2xl font-source text-center mt-30">No note is created yet!</div>}
              {notes?.map((note) => {
                const date = new Date(note.createdAt);
                const day = date.toLocaleDateString("en-us", {
                  weekday: "long",
                })
                const month = date.toLocaleDateString("en-us", {
                  month: "long",
                })
                return (
                  <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note)
                    setisOpen(true);
                  }}
                  className="group border-2 border-black bg-white p-4 transition-all duration-150 cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 relative"
                >
                  {/* Structured Calendar Date Box */}
                  <div className="border-2 border-black bg-white flex flex-col items-center justify-between min-w-[70px] select-none shrink-0 font-mono">
                    {/* Day Name Header */}
                    <div className="bg-black text-white text-[10px] font-bold w-full text-center py-0.5 uppercase tracking-wider">
                      {day}
                    </div>
                    {/* Big Day Number */}
                    <div className="text-2xl font-black py-1 leading-none">
                      {String(date.getDate()).padStart(2, "0")}
                    </div>
                    {/* Month & Year Footer */}
                    <div className="border-t-2 border-black w-full text-center py-0.5 bg-gray-100 text-[9px] font-bold uppercase tracking-tighter">
                      {month} {date.getFullYear()}
                    </div>
                  </div>
                
                  {/* Note Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold truncate group-hover:underline decoration-2 underline-offset-4">
                      {note.title}
                    </h3>
                    {/* <p className="text-xs font-mono text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                      {note.description.slice(0, 30) + "..."}
                    </p> */}
                  </div>
                
                  {/* Action Indicators (Arrow & Delete) */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Action Indicator Arrow */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity font-mono font-bold text-lg">
                      →
                    </div>
                
                    {/* Neo-Brutalist Delete Button */}
                    
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}