"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { X, Layers, HelpCircle } from 'lucide-react'; // Added clear indicator icons for inputs

interface CreateSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTechStack: string;
    groundid: string // Dynamic tech stack passed from the active ground
}

export default function CreateSessionModal({
    isOpen,
    onClose,
    currentTechStack,
    groundid
}: CreateSessionModalProps) {
    const [sessionName, setSessionName] = useState('');
    const [conceptSlides, setConceptSlides] = useState('10');
    const [revisionType, setRevisionType] = useState('random'); // 'random' or 'particular'
    const [particularTopic, setParticularTopic] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionName.trim()) return;
        if (revisionType === 'particular' && !particularTopic.trim()) return;


        try {
            const insertSession = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/session_insert_db`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: sessionName,
                    type: revisionType,
                    topic: particularTopic,
                    groundid
                })
            })
            const res = await insertSession.json();
            if (res.status == 201) {
                 window.location.href = `${process.env.NEXT_PUBLIC_HOST}/ground/${groundid}/session/${res.message.id}/learningengine?type=${revisionType}&ques=${conceptSlides}`
            }
        } catch (error) {
            console.error("error occuring while inserting session", error)
        } 
    };

    return (
        // Backdrop: Fixed, blurred background keeping the brutalist window centered
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 animate-in fade-in duration-150">

            {/* Boxy Modal Box */}
            <div className="bg-white border-4 border-black p-6 w-full max-w-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative font-mono text-black animate-in zoom-in-95 duration-150">

                {/* Close Button Cross */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 p-1 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    title="Close Modal"
                >
                    <X className="w-4 h-4 stroke-[2.5]" />
                </button>

                {/* Modal Header */}
                <div className="border-b-2 border-black pb-3 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tight">INITIALIZE REVISION</h2>
                </div>

                {/* Outer Split Layout: Form & Feynman Frame */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                    {/* Left Column: Form Inputs */}
                    <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">

                        {/* Tech Stack Info Block */}
                        <div className="border-2 border-black bg-[#f5f5f5] p-3">
                            <span className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-0.5">
                                Tech Stack
                            </span>
                            <span className="bg-black text-white px-2 py-0.5 text-xs font-black tracking-wider uppercase inline-block">
                                {currentTechStack}
                            </span>
                        </div>

                        {/* Input 1: Concept Slides Select Options */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black uppercase tracking-wide">
                                Concept Slides:
                            </label>
                            <div className="relative flex items-center">
                                {/* Visual Entry Icon */}
                                <div className="absolute left-3 pointer-events-none text-black z-10">
                                    <Layers className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <select
                                    value={conceptSlides}
                                    onChange={(e) => setConceptSlides(e.target.value)}
                                    className="w-full bg-white border-2 border-black p-2.5 pl-10 text-sm font-bold tracking-wide rounded-none appearance-none focus:outline-none focus:bg-[#f5f5f5] cursor-pointer"
                                >
                                    <option value="5">5 SLIDES (FAST RUN)</option>
                                    <option value="10">10 SLIDES (BALANCED)</option>
                                    <option value="15">15 SLIDES (DEEP FOCUS)</option>
                                    <option value="20">20 SLIDES (COMPREHENSIVE)</option>
                                </select>
                                {/* Custom boxy drop arrow indicator */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none border-l-2 border-black bg-white px-2.5 font-black text-xs">
                                    ↓
                                </div>
                            </div>
                        </div>

                        {/* Input 2: Type Select Options */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black uppercase tracking-wide">
                                Revision Type:
                            </label>
                            <div className="relative flex items-center">
                                {/* Visual Entry Icon */}
                                <div className="absolute left-3 pointer-events-none text-black z-10">
                                    <HelpCircle className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <select
                                    value={revisionType}
                                    onChange={(e) => setRevisionType(e.target.value)}
                                    className="w-full bg-white border-2 border-black p-2.5 pl-10 text-sm font-bold tracking-wide rounded-none appearance-none focus:outline-none focus:bg-[#f5f5f5] cursor-pointer"
                                >
                                    <option value="random">RANDOM REVISION ENGINE</option>
                                    <option value="custom">REVISE PARTICULAR CONCEPT</option>
                                </select>
                                {/* Custom boxy drop arrow indicator */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none border-l-2 border-black bg-white px-2.5 font-black text-xs">
                                    ↓
                                </div>
                            </div>
                        </div>

                        {/* Conditional Input: Particular Topic Text Field */}
                        {revisionType === 'particular' && (
                            <div className="space-y-1.5 animate-in fade-in duration-100">
                                <label className="block text-xs font-black uppercase tracking-wide">
                                    Enter Topic:
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={particularTopic}
                                    onChange={(e) => setParticularTopic(e.target.value)}
                                    placeholder="E.G., HOISTING, CLOSURES, ASYNC AWAIT"
                                    className="w-full bg-white border-2 border-black p-2.5 text-sm font-bold placeholder-gray-400 rounded-none focus:outline-none focus:bg-[#f5f5f5] uppercase tracking-wide"
                                />
                            </div>
                        )}

                        {/* Input 3: Text input for Name of Session */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black uppercase tracking-wide">
                                Session Name:
                            </label>
                            <input
                                type="text"
                                required
                                value={sessionName}
                                onChange={(e) => setSessionName(e.target.value)}
                                placeholder="E.G., revision1, session1, next learning deep"
                                className="w-full bg-white border-2 border-black p-2.5 text-sm font-bold placeholder-gray-400 rounded-none focus:outline-none focus:bg-[#f5f5f5] uppercase tracking-wide"
                            />
                        </div>

                        {/* Action Trigger Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-black text-white font-black text-xs uppercase tracking-widest py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all text-center"
                            >
                                Start Revision
                            </button>
                        </div>
                    </form>

                    {/* Right Column: Feynman Image Presentation Frame */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center h-full">
                        <div className="border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-[200px] aspect-square relative">
                            <div className="w-full h-full relative bg-[#e5e5e5] border border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
                                <Image
                                    src="https://wordlift.io/blog/en/wp-content/uploads/sites/3/2017/03/Richard-feynman.jpg"
                                    alt="Richard Feynman Engine Core"
                                    fill
                                    sizes="(max-w-7xl) 200px"
                                    priority
                                    className="object-cover contrast-125 grayscale"
                                />
                            </div>
                        </div>
                        <div className="text-center mt-3 max-w-[180px]">
                            <span className="block text-[10px] font-black uppercase bg-black text-white px-1.5 py-0.5 tracking-wider">
                                Feynman Engine
                            </span>
                            <p className="text-[9px] text-gray-500 font-bold mt-1 italic tracking-tight">
                                &quot;If you want to master something, teach it.&quot;
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}