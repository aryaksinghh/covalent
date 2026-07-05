"use client";
import DeleteModal from "./isdelete";
import React, {useState} from "react";
import { useRouter } from "next/navigation";

interface Note {
    id: string;
    title: string;
    preview: string;
    description: string;
    createdAt: Date;
}

interface NotebookModalProps {
    onClose: () => void;
    onClickEdit: () => void;
    note: Note | null;
}

export default function NotebookModal({ onClose, note, onClickEdit }: NotebookModalProps) {

    const router = useRouter()
    const date = new Date(note?.createdAt ?? "");
    const day = date.toLocaleDateString("en-us", {
        weekday: "long",
    });
    const month = date.toLocaleDateString("en-us", {
        month: "long",
    });
    const [isdelete, setisdelete] = useState<boolean>(false)
    
      const handledelete = async()=>{
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/notebook_insert_db?type=delete`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: note?.id }),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to delete note: ${response.statusText}`);
          }
    
          const result = await response.json();
          console.log('Note deleted successfully:', result);
          setisdelete(false);
          router.refresh();
        } catch (error) {
          console.error('Error deleting note:', error);
          alert('Failed to delete the note. Please try again.');
        }
      }
    

    return (<>
    {isdelete && <DeleteModal onClose={()=> {setisdelete(false); router.refresh(); onClose() }} title={note?.title} onConfirm={handledelete} />}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
            <div className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden text-black">

                {/* Modal Header */}
                <div className="border-b-4 border-black bg-gray-100 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="border-2 border-black bg-black text-white px-2 py-1 font-mono text-xs font-bold">
                            {day}, {date.getDate()} {month} {date.getFullYear()}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="border-2 cursor-pointer border-black bg-white hover:bg-red-500 hover:text-black w-8 h-8 font-mono font-black text-sm flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        title="Close Modal"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-4 font-mono">
                    <h2 className="text-2xl font-black font-poppins border-b-2 border-black pb-3">
                        {note?.title}
                    </h2>

                    <div dangerouslySetInnerHTML={{ __html: note?.description }} className="bg-gray-50 border-2 border-black p-4 text-sm whitespace-pre-line leading-relaxed">
                     
                    </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="border-t-4 border-black bg-white p-4 flex justify-end gap-3">
                <button
                      onClick={()=> {setisdelete(true)}}
                      className="border-2 z-30 border-black cursor-pointer bg-red-400 p-1.5 text-black hover:bg-red-500 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
                      aria-label="Delete note"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength="1"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                        onClick={() => onClickEdit()}
                        className="cursor-pointer border-2 border-black bg-black text-white px-5 py-2 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] hover:bg-white hover:text-black transition-all"
                    >
                        Edit Ground
                    </button>
                </div>

            </div>
        </div>
   </> );
}