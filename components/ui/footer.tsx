import Link from 'next/link';

export default function Footer() {
  return (
    // The component wrapper is completely full-width with a clean, thin top baseline rule
    <footer className="font-source w-full text-black  bg-transparent pt-12 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* UPPER DASHBOARD: Minimalist layout split by clean text blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Main Statement (Takes up 6 out of 12 columns) */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="font-source text-2xl font-bold tracking-tight">Aryak Singh</h3>
            <p className="font-source text-xs text-gray-600 leading-relaxed max-w-sm">
              I am an 18-year-old software engineer building the projects no one else talks about. 
              You can connect with me on X for any query.
            </p>
            <div className="pt-2">
              <a 
                href="https://x.com/aryakceo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-source text-xs uppercase tracking-wider font-bold border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
              >
                Connect on X &rarr;
              </a>
            </div>
          </div>

          {/* Directory Navigation (Takes up 3 out of 12 columns) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-source text-[11px] uppercase tracking-widest text-gray-400 block">/ Index</span>
            <div className="flex flex-col space-y-2 font-source text-xs">
              <Link href="/docs" className="hover:text-gray-500 transition-colors">Privacy Policy</Link>
              <Link href="/changelog" className="hover:text-gray-500 transition-colors">Terms & condition</Link>
              <Link href="/privacy" className="hover:text-gray-500 transition-colors">About</Link>
              <Link href="/terms" className="hover:text-gray-500 transition-colors">Vision</Link>
            </div>
          </div>

          {/* Minimalist Interactive Trigger (Takes up 3 out of 12 columns) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center h-full">
            <button className="font-source cursor-pointer text-xs uppercase tracking-wider font-bold py-3 px-6 border border-black bg-black text-white rounded-none hover:bg-transparent hover:text-black transition-colors duration-200">
              Start Revising Now
            </button>
          </div>

        </div>

        {/* BOTTOM BASELINE: Meta details and copyright parameter alignment */}
        <div className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 font-source text-[10px] uppercase tracking-widest text-gray-400">
          <span>&copy; {new Date().getFullYear()} COVALENT. ALL RIGHTS RESERVED.</span>
          <span className="text-black font-bold">v1.0.0</span>
        </div>

      </div>
    </footer>
  );
}