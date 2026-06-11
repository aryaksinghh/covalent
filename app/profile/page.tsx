"use client"
import { useState, useEffect } from "react";
import InfoBar from "@/components/ui/infobar";
import Sidebar from "@/components/ui/sidebar";
import { useUserState } from "@/states/userState";
import Image from "next/image";

interface ProfileDetails {
    name: string | undefined;
    email: string | undefined;
    role: string | undefined;
    country: string | undefined;
    experience: string | undefined;
}

export default function Profile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [triggereffect, settriggereffect] = useState<boolean>(true);

    const { name, fetchUser, logoutUser, email, id, avatar } = useUserState();


    const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
        name: name || undefined,
        email: email || undefined,
        role: "N/A",
        country: "N/A",
        experience: "N/A",
    });

    useEffect(() => {
        const dataFetching = async () => {
            const userDatapg = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user_fetch_db`, { method: "GET" });
            const user = await userDatapg.json()
            setProfileDetails({
                name: user.userData.name || null,
                email: user.userData.email || null,
                role: user.userData.role || null,
                country: user.userData.country || null,
                experience: user.userData.experience || null,
            })
        }
        dataFetching();
    }, [triggereffect])


    const [formData, setFormData] = useState<ProfileDetails>({ ...profileDetails });
    const [isSaving, setIsSaving] = useState(false);

    const handleOpenModal = () => {
        setFormData({ ...profileDetails });
        setIsEditModalOpen(true);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user_update_db`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name || profileDetails.name,
                        role: formData.role || profileDetails.role,
                        country: formData.country || profileDetails.country,
                        experience: formData.experience || profileDetails.experience
                    })
                })
            setIsSaving(false);
            setIsEditModalOpen(false);
            settriggereffect(!triggereffect);
        } catch (error) {
            console.error("error occured while updating data through api in profile form", error)
        }

    };

    return (
        <div className="bg-[#f0f0f0] w-full min-h-screen font-source text-black antialiased">
            <InfoBar onMenuClick={() => setIsSidebarOpen(true)} Name={name} FetchUser={fetchUser} />

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} Avatar={avatar} logout={logoutUser} />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                    {/* Header: Avatar + Intro */}
                    <div className="flex flex-col md:flex-row items-center gap-8 border-b-4 border-dashed border-black pb-8 mb-8">
                        <Image
                            src={avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=covalent"}
                            alt="Avatar"
                            className="w-32 h-32 bg-[#e0e0e0] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] object-cover"
                            width={33} height={33}
                        />
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tight">Profile Settings</h1>
                            <p className="text-gray-600 mt-2">Manage your developer identity and professional details for Covalent.</p>
                        </div>
                    </div>

                    {/* Unified Grid: All details now here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {[
                            { label: "Full Name", value: profileDetails.name, color: "bg-yellow-200" },
                            { label: "Email Address", value: profileDetails.email, color: "bg-gray-200" },
                            { label: "Developer Role", value: profileDetails.role, color: "bg-white" },
                            { label: "Country", value: profileDetails.country, color: "bg-white" },
                            { label: "Experience", value: profileDetails.experience, color: "bg-white" },
                        ].map((item, i) => (
                            <div key={i} className={`border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${item.color}`}>
                                <span className="block text-xs uppercase font-bold text-gray-500 mb-1">{item.label}</span>
                                <span className="text-lg font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleOpenModal}
                        className="w-full bg-cyan-400 cursor-pointer hover:bg-cyan-300 border-4 border-black py-4 font-black text-xl uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                    >
                        Edit Profile Details
                    </button>
                </div>
            </main>

            {/* Modal remains the same structure but updated with email locked */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white border-4 border-black w-full max-w-lg p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Edit Details</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold mb-1">Name</label>
                                <input className="w-full border-2 border-black p-3 font-bold" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1 text-gray-400">Email (Cannot be changed)</label>
                                <input className="w-full border-2 border-black p-3 bg-gray-100 cursor-not-allowed font-bold" value={formData.email} disabled />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Role</label>
                                    <input className="w-full border-2 border-black p-3 font-bold" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Country</label>
                                    <input className="w-full border-2 border-black p-3 font-bold" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Experience</label>
                                <input className="w-full border-2 border-black p-3 font-bold" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 cursor-pointer border-2 border-black py-3 font-bold uppercase hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="flex-1 bg-green-400 border-2 border-black cursor-pointer py-3 font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}