"use client"
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full border-b-1 font-source px-4 py-12  text-black">
      <div className="max-w-[87vw] mx-auto border-1 border-black grid grid-cols-1 md:grid-cols-2">
        
        <div className="relative min-h-[350px] md:min-h-[500px] bg-gray-100 border-b-2 md:border-b-0 md:border-r-2 border-black flex items-center justify-center overflow-hidden">
          <Image
            src="https://kottke.org/cdn-cgi/image/format=auto,fit=scale-down,width=1200,metadata=none//plus/misc/images/feynman-blackboard.jpg"
            alt="Richard Feynman thinking"
            fill
            priority
            sizes="(max-w-768px) 100vw, 50vw"
            className="object-cover object-top filter grayscale contrast-125"
          />
      
          <div className="absolute bottom-4 left-4 bg-black text-white text-xs px-2 py-1  uppercase tracking-wider">
            Richard Feynman
          </div>
        </div>

    
        <div className="flex flex-col gap-3 justify-center items-center p-8 md:p-12 lg:p-16">
       
          
          
          <h1 className=" text-4xl md:text-5xl text-center font-bold tracking-tight text-black leading-tight mb-6">
            AI oriented revision tool for developers with feynman techniques👾
          </h1>
          
      
          <p className=" text-lg text-center text-gray-700 leading-relaxed mb-8">
            Cure your imposter syndrome by revision and learning of programming languages and frameworks through our AI feynman engine.
          </p>
          
     
          <div>
            <Link href={"/ground"}><button className="
            
               text-sm uppercase tracking-wider font-bold px-6 py-3 bg-white text-black border-2 border-black rounded-none cursor-pointer
              
              
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              
             
              transition-all duration-150 ease-in-out
              
            
              hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
              active:bg-gray-50
            ">
              Start Revising Now &rarr;
            </button></Link>
          </div>
        </div>

      </div>
    </section>
  );
}