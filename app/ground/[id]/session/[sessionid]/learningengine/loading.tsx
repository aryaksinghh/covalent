export default function Loading() {
    return (
      <div className="flex h-screen items-center justify-center bg-[#EBEBEB]">
        <div className="relative h-12 w-12 rounded-full border-[3px] border-black">
          {/* Hour hand */}
          <div
            className="absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-full origin-bottom bg-black animate-[spin_6s_linear_infinite]"
          />
  
          {/* Minute hand */}
          <div
            className="absolute left-1/2 top-1/2 h-4 w-[2px] -translate-x-1/2 -translate-y-full origin-bottom bg-black animate-[spin_1.5s_linear_infinite]"
          />
        </div>
      </div>
    );
  }