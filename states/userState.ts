"use client";
import { createClient } from "@/lib/supabase/client";
import { create } from "zustand";

const supabase = createClient();


interface userState {
  name: string | null;
  email: string | null;
  avatar: string | null;
  id: string | null;
  fetchUser: () => Promise<void>;
  logoutUser: () => Promise<void>; 
}

export const useUserState = create<userState>((set) => ({
  name: null,
  email: null,
  avatar: null,
  id: null,

  fetchUser: async () => {
    const res = await supabase.auth.getUser();
    const userMetadata = res.data.user?.user_metadata;

    if (userMetadata) {
      set({
        name: userMetadata.name || null,
        email: userMetadata.email || null,
        avatar: userMetadata.avatar_url || null,
        id: res.data.user?.id || null,
      });
    }
  },
  logoutUser: async()=>{
    await supabase.auth.signOut();
    set({ name: null, email: null, avatar: null, id: null });
    window.location.href = `${process.env.NEXT_PUBLIC_HOST}`
  }
}));