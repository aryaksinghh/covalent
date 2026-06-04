"use client"
import React from 'react'
import Image from 'next/image'
import { type Provider } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();
const provider = 'google' as Provider

export default function Login() {
  
  const googleauth = async()=>{
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_HOST}/auth/callback`,
      },
    })
  }

  return (
    <div className="bg-[#f0f0f0] w-screen overflow-x-hidden h-screen text-black font-source flex items-center justify-center p-4 md:p-12">

      <div className="w-full max-w-7xl  grid grid-cols-1 md:grid-cols-12 border border-black divide-y md:divide-y-0 md:divide-x divide-black bg-transparent">

        <div className="md:col-span-6 hidden md:flex flex-col justify-between p-8 md:p-12 bg-transparent relative min-h-[300px] md:min-h-[500px]">
         

          <div className="my-auto space-y-6 flex flex-col items-center justify-center text-center">
          
            <div className="w-full max-w-xs aspect-square border border-dashed border-black bg-white/50 flex flex-col items-center justify-center p-4 relative">
              <div className="font-source text-xs text-gray-500 space-y-1">
                <Image src={"https://sothebys-com.brightspotcdn.com/dims4/default/6bc67a5/2147483647/strip/true/crop/640x640+0+0/resize/684x684!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F1c%2F9d%2F373f5cbf41acab7e598824c501e6%2Ffeynman-back-cover-image.jpg"} alt='feynman_image' width={450} height={450} />
              </div>
            </div>

            <div className="space-y-2 max-w-sm">
              <p className="font-source font-bold text-lg leading-tight">
                &quot;If you want to master something, teach it.&quot;
              </p>
              <p className="font-source text-[10px] text-gray-400 uppercase tracking-wider">
                — The Feynman Methodology
              </p>
            </div>
          </div>


        </div>

    
        <div className="md:col-span-6 flex flex-col justify-center p-8 md:p-12 bg-transparent">
          <div className="w-full max-w-sm mx-auto space-y-8">

            {/* Header copy establishing your product line */}
            <div className="space-y-5 text-center md:text-center">
              <h1 className="font-source text-3xl font-bold tracking-tight">Login/Register</h1>
              <p className="font-source text-xs text-gray-600 leading-normal">
                Use your google or github account to login or register safely with your details.
              </p>
            </div>

           
            <div className="space-y-3 pt-2">

            
              <button onClick={googleauth} className="w-full cursor-pointer font-source text-xs uppercase tracking-wider font-bold py-3 px-4 bg-white text-black border border-black rounded-none flex items-center justify-center gap-3 transition-all duration-150 hover:bg-black hover:text-white group">
             
                <svg className="w-4 h-4 shrink-0 transition-colors duration-150 group-hover:bg-white group-hover:p-0.5 group-hover:rounded-sm" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

          
              <button className="w-full cursor-pointer font-source text-xs uppercase tracking-wider font-bold py-3 px-4 bg-white text-black border border-black rounded-none flex items-center justify-center gap-3 transition-all duration-150 hover:bg-black hover:text-white group">
               
                <svg
                  className="w-4 h-4 shrink-0 fill-current text-black group-hover:text-white transition-colors duration-150"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.06.069-.06 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
                <span>Continue with GitHub</span>
              </button>

            </div>


          </div>
        </div>

      </div>
    </div>
  )
}