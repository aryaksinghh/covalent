"use client"
import Image from "next/image";
import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero";
import Midsection from "@/components/ui/midsection";
import Footer from "@/components/ui/footer";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
 

  return (
    <div className="bg-[#f0f0f0] w-full overflow-x-hidden h-full">
      <Navbar/>
      <HeroSection/>
      <Midsection/>
      <Footer/>
    </div>
  );
}
