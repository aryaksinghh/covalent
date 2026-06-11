"use client";
import { useState } from "react";
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from "@/states/userState";

interface Session {
  id: string;
  name: string;
  tag: string;
}

// --- Notebook Data Type ---
interface Notebook {
  id: string;
  title: string;
  urgency: "High" | "Medium" | "Low";
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();

  // --- Sample States for Layout Demonstration ---
  const [sessions, setSessions] = useState<Session[]>([
    { id: "1", name: "Next.js Advanced Routing", tag: "Frontend" },
    { id: "2", name: "PostgreSQL Index Optimization", tag: "Database" },
    { id: "3", name: "Dockerizing Express Microservices", tag: "DevOps" },
  ]);

  // Sample Notebooks State (Clear array to test empty create state)
  const [notebooks, setNotebooks] = useState<Notebook[]>([
    { id: "1", title: "Core Architecture Quirks", urgency: "High" },
    { id: "2", title: "Production Build Checklist", urgency: "Medium" },
  ]);

  const [hasTakenRevision, setHasTakenRevision] = useState(false);

  // Expanded to 77 nodes (11 columns x 7 rows) to fill horizontal space perfectly
  const contributionGrid = Array.from({ length: 77 }, (_, i) => ({
    day: i,
    hasActivity: i % 3 === 0 || i % 7 === 0 || i % 11 === 0,
  }));

  // Shared Neo-Brutalist transparent box style
  const brutalBoxStyle = "bg-transparent border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200";

  // Helper colors for notebook urgency indicators
  const getUrgencyStyles = (level: "High" | "Medium" | "Low") => {
    switch (level) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-400 text-black";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-black text-white";
    }
  };

  return (
    <div className="bg-[#f0f0f0] w-full overflow-x-hidden min-h-screen text-black font-mono antialiased">
      {/* Navigation Layer */}
      <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        Avatar={avatar}
        logout={logoutUser}
      />

      {/* Main Container Layout - Expanded for full page scale */}
      <main className="w-full mx-auto px-6 py-10 space-y-10 md:px-12 lg:px-16 max-w-[1800px]">
        
        {/* ================= UPPER METRICS SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Notebook Highlights Section */}
          <div className={`${brutalBoxStyle} p-8 flex flex-col justify-between min-h-[300px]`}>
            <div className="w-full">
              <h3 className="text-base font-black tracking-wider uppercase border-b-2 border-black pb-1 self-start inline-block">
                Notebook Highlights
              </h3>
            </div>

            <div className="flex-1 flex flex-col justify-center w-full mt-4">
              {notebooks.length === 0 ? (
                /* Empty Notebook State */
                <div className="text-center space-y-3 py-4">
                  <p className="text-xs font-bold text-black/60 italic">[ No active logs found ]</p>
                  <button className="px-4 py-2 text-xs font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all">
                    Create Notebook
                  </button>
                </div>
              ) : (
                /* Listed Notebook Stack matching the Session Card layout look */
                <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                  {notebooks.map((notebook) => (
                    <div 
                      key={notebook.id}
                      className="p-3 bg-white/50 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4"
                    >
                      <span className="font-bold text-sm truncate tracking-tight">
                        {notebook.title}
                      </span>
                      <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 border border-black shrink-0 ${getUrgencyStyles(notebook.urgency)}`}>
                        {notebook.urgency}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[10px] font-bold text-black/50 mt-2">
              System Total: {notebooks.length} Active Records
            </p>
          </div>

          {/* Card 2: Learning Behavior */}
          <div className={`${brutalBoxStyle} p-8 flex flex-col min-h-[300px]`}>
            <h3 className="text-base font-black tracking-wider uppercase mb-4 border-b-2 border-black pb-1 self-start">
              Learning Behavior
            </h3>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              {!hasTakenRevision ? (
                <div className="space-y-3">
                  <p className="text-sm font-bold text-black/60 italic">
                    [ Waiting for your first revision session ]
                  </p>
                  <p className="text-xs text-black/50 max-w-xs leading-relaxed">
                    Complete at least one core execution to map custom baseline capabilities.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 w-full text-left">
                  <span className="text-xs font-black text-white bg-black px-2 py-1 uppercase tracking-wider">
                    SYSTEM: OPTIMAL
                  </span>
                  <p className="text-sm font-bold leading-relaxed border-l-4 border-black pl-3 mt-2">
                    Visual structures mapped. Current recursive interval retention is trending +42%.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: GitHub-Style Grid Spread */}
          <div className={`${brutalBoxStyle} p-8 flex flex-col justify-between min-h-[300px]`}>
            <div>
              <h3 className="text-base font-black tracking-wider uppercase border-b-2 border-black pb-1 self-start inline-block">
                Learning Activity
              </h3>
              <p className="text-xs text-black/60 mt-2 font-bold">Metrics: Daily execution matrix</p>
            </div>
            
            {/* Expanded Grid Frame to fill width */}
            <div className="w-full overflow-x-auto py-2 my-auto">
              <div className="grid grid-flow-col grid-rows-7 gap-2 min-w-full justify-between p-2 border-2 border-black bg-white/40">
                {contributionGrid.map((node) => (
                  <div
                    key={node.day}
                    className={`w-4 h-4 border border-black/30 transition-all ${
                      node.hasActivity
                        ? "bg-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-transparent hover:bg-black/10"
                    }`}
                    title={node.hasActivity ? "Session Logged" : "Void"}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold px-1">
              <span>[ Less ]</span>
              <div className="flex gap-1.5 items-center">
                <div className="w-3 h-3 border border-black bg-transparent" />
                <div className="w-3 h-3 border border-black bg-black" />
              </div>
              <span>[ More ]</span>
            </div>
          </div>

        </div>

        {/* ================= LOWER SESSIONS SECTION ================= */}
        <div className={`${brutalBoxStyle} p-8 min-h-[400px] flex flex-col justify-between`}>
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Sessions
              </h2>
              <p className="text-xs text-black/60 font-bold mt-1">
                Active workflows and processing grounds
              </p>
            </div>
            
            {sessions.length > 0 && (
              <button className="px-6 py-3 text-xs cursor-pointer font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 active:translate-x-[2px] active:translate-y-[2px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all rounded-none self-start sm:self-center">
                Create New Ground
              </button>
            )}
          </div>

          {/* Core Content Grid Frame */}
          <div className="flex-1 flex flex-col justify-center">
            {sessions.length === 0 ? (
              <div className="text-center space-y-6 py-12">
                <div className="text-4xl">[-]</div>
                <div>
                  <p className="text-sm font-black uppercase">No active operations initialized.</p>
                  <p className="text-xs text-black/50 mt-1">System standby mode.</p>
                </div>
                <button className="px-6 py-3 text-sm cursor-pointer font-black uppercase tracking-wider text-white bg-black hover:bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] mx-auto block">
                  Create New Ground
                </button>
              </div>
            ) : (
              /* Big blocks mapping full page row capacity */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 align-top auto-rows-start">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-6 bg-white/40 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 flex flex-col justify-between space-y-4 min-h-[140px]"
                  >
                    <h4 className="font-black text-base tracking-tight leading-snug">
                      {session.name}
                    </h4>
                    <div className="flex">
                      <span className="text-[10px] font-black tracking-widest uppercase bg-black text-white px-2.5 py-1">
                        {session.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}