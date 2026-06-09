"use client"
import { useState } from "react";
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from "@/states/userState";


export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {name, fetchUser, logoutUser, email, id, avatar} = useUserState();
    return (
        <div className="bg-[#f0f0f0] w-full overflow-x-hidden min-h-screen">
            <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser}/>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                Avatar={avatar}
                logout={logoutUser}
            />

        </div>
    )
}