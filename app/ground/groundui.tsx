"use client"
import {useState} from 'react';
import { ArrowUpRight } from 'lucide-react';
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from '@/states/userState';
import CreateGroundModal from '@/components/ui/groundbuildmodal';
import Link from 'next/link';

// Define the Ground Interface
interface GroundInfo {
  id: string;
  name: string;
  experience: string;
  grade: number;
  userid: string;
  category: string;
  stack: string;
  createdAt: string;
}

interface GroundpageUiProps {
  grounds: GroundInfo[]; 
}


export default function GroundpageUi({ grounds }: GroundpageUiProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();
    const [isopen, setisopen] = useState<boolean>(false);

  return (<>
  {isopen && <CreateGroundModal isOpen onClose={()=> setisopen(false)}/>}
    <div className="min-h-screen bg-[#ebebeb] text-black font-mono  selection:bg-black selection:text-white">
      <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />
      
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  Avatar={avatar}
                  logout={logoutUser}
                />
      <main className='p-6'>
        
        <section className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-black pb-4 mb-6">
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Grounds</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Active workflows and processing grounds</p>
            </div>
            <button onClick={()=> setisopen(true)} className="bg-black cursor-pointer text-white text-xs font-bold uppercase px-4 py-2.5 shadow-[3px_3px_0px_0px_rgba(115,115,115,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(115,115,115,1)] transition-all shrink-0 self-start sm:self-center">
              Create New Ground
            </button>
          </div>

          {/* Grounds Mapping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grounds.map((ground) => (
              <div 
                key={ground.id} 
                className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between min-h-[140px] group relative"
              >
                {/* Title & Action Button Row */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-sm leading-snug">{ground.name}</h3>
                  
                  {/* Click to open button */}
                  <Link href={`/ground/${ground.id}`}><button 
                    className="border-2 cursor-pointer border-black p-1.5 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0"
                    title="Open Ground"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button></Link>
                </div>

                {/* Category Badge */}
                <div className="mt-4">
                  <span className="inline-block bg-black text-white text-[9px] font-black tracking-wide px-2 py-1 uppercase">
                    {ground.stack}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
        </section>
      </main>
    </div>
  </>);
}