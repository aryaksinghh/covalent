"use client"
import { useState } from 'react';
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from '@/states/userState';
import Link from 'next/link';

interface SessionUIProps {
    xpGained: number ;
    timeSpent: number;
    scoreAccuracy: number | string;
    appreciationText: string;
    revisedTopics: string[];
    groundid: string;
}

export default function Sessionui({
    xpGained,
    timeSpent,
    scoreAccuracy,
    appreciationText,
    revisedTopics,
    groundid
}: SessionUIProps) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();

    return (<div className='overflow-x-hidden'>
        <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />
        <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            Avatar={avatar}
            logout={logoutUser}
        />
        <div className=' w-screen h-screen overflow-x-hidden bg-[#F0F0F0]'>

            <div className="w-full max-w-5xl mt-10 mx-auto font-mono bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black">

                <h2 className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-wide">
                    Session Results
                </h2>
                <hr className="border-t-2 border-black mb-6" />

                {/* Top Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="border-2 border-black bg-white p-6 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs md:text-sm font-bold uppercase mb-2 tracking-wider">
                            XP Gained
                        </span>
                        <span className="text-4xl md:text-5xl text-green-600 font-extrabold">
                            ↑{xpGained}
                        </span>
                    </div>

                    <div className="border-2 border-black bg-white p-6 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs md:text-sm font-bold uppercase mb-2 tracking-wider">
                            Time Spent Learning
                        </span>
                        <span className="text-4xl md:text-5xl text-green-600 font-extrabold">
                            {timeSpent} m
                        </span>
                    </div>

                    <div className="border-2 border-black bg-white p-6 flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs md:text-sm font-bold uppercase mb-2 tracking-wider">
                            Score Accuracy (%)
                        </span>
                        <span className="text-4xl md:text-5xl text-green-600 font-extrabold">
                            {scoreAccuracy}%
                        </span>
                    </div>

                </div>

                <div className="border-2 border-black bg-white p-4 md:p-6 mb-10 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider">
                        {appreciationText}
                    </h3>
                </div>

                <h2 className="text-lg md:text-xl font-bold uppercase mb-2 tracking-wide">
                    Topics Revised
                </h2>
                <hr className="border-t-2 border-black mb-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {revisedTopics.map((topic, index) => (
                        <div
                            key={index}
                            className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-center"
                        >
                            <span className="font-bold text-sm md:text-base uppercase tracking-wide">
                                {topic}
                            </span>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center items-center w-full pt-7'>
                <Link href={`/ground/${groundid}`}><button className='p-3  text-white text-md bg-black px-6 font-source cursor-pointer hover:bg-gray-900 transition-all'>GROUND →</button></Link>
                </div>
            </div>
           
        </div></div>);
}