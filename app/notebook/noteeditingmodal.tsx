'use client';

import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import "quill/dist/quill.core.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  () => import("react-quill-new"),
  { ssr: false }
);

interface Note {
  id: string;
  title: string;
  preview: string;
  description: string;
  createdAt: string;
}
interface noteprops {
  onClose: () => void;
  note: Note
}
interface Date {
  day: string,
  date: number,
  month: string,
  year: number
}

export default function NoteModal({ onClose, note }: noteprops) {

  const [value, setValue] = useState(note ? note.description : "");
  const [title, settitle] = useState(note ? note.title : "")
  const [date, setdate] = useState<Date>({ day: "", date: 0, month: "", year: 0 })
  const [loading, setloading] = useState<boolean>(false)
  useEffect(() => {
    if (note) {
      const createdAt = new Date(note?.createdAt ?? "");
      setdate({
        day: createdAt.toLocaleString('en-US', { weekday: 'long' }),
        date: createdAt.getDate(),
        month: createdAt.toLocaleString('en-US', { month: 'long' }),
        year: createdAt.getFullYear(),
      });
    } else {
      const createdAt = new Date();
      setdate({
        day: createdAt.toLocaleString('en-US', { weekday: 'long' }),
        date: createdAt.getDate(),
        month: createdAt.toLocaleString('en-US', { month: 'long' }),
        year: createdAt.getFullYear(),
      });
    }
  }, [])

  const handlesavenote = async () => {
    setloading(true)
    console.log("val", value)
    if (note && (note.title != title || note.description != value)) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/notebook_insert_db?type=update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: note.id,
              title,
              description:value,
            }),
          }
        );
        setloading(false);
        onClose()

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to update notebook");
        }

        const data = await response.json();

        console.log("Successfully updated");
      } catch (error) {
        console.error(error);
      }
    }
    if(!note && (title!="" && value!="")){
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/notebook_insert_db?type=insert`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              description:value,
            }),
          }
        );
        setloading(false);
        onClose()

        if (!(response.status == 201)) {
          const error = await response.json();
          throw new Error(error.message || "Failed to update notebook");
        }

        console.log("Successfully created");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]">
      {/* Main Modal Card with Neobrutalist Hard Shadow */}
      <div className="w-full max-w-3xl bg-white h-[50vh] border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col animate-in fade-in zoom-in-95 duration-150">

        {/* Top Bar: Date Badge & Close Button */}
        <div className="flex items-center justify-between p-5 pb-2">
          <div className="bg-black text-white px-3 py-1 font-mono text-xs font-bold tracking-wide uppercase">
            {date.day}, {date.date} {date.month} {date.year}
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center cursor-pointer justify-center w-8 h-8 bg-white border-2 border-black font-bold text-lg hover:bg-red-500  hover:text-black transition-colors duration-150"
          >
            ✕
          </button>
        </div>

        {/* Modal Header / Title */}
        <div className="px-6 pt-2 pb-4 border-b-2 border-black">
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="enter note title..."
            className="w-full font-bold text-2xl sm:text-3xl tracking-tight text-black placeholder:text-gray-400 focus:outline-none bg-transparent"
          />
        </div>

        {/* Content Area for Rich Text Editor */}
        <div id='editor' className=" p-6 container  flex-1">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ height: "100px" }}
          />
        </div>

        {/* Footer Area */}
        <div className="flex items-center justify-end px-6 py-4 border-t-2 border-black bg-white">
          <button
            onClick={handlesavenote}
            className="cursor-pointer border-2 border-black bg-black text-white px-5 py-2 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:bg-white hover:text-black transition-all"
          >
            {loading? "Saving...": "Save note"}
          </button>
        </div>

      </div>
    </div>
  );
}