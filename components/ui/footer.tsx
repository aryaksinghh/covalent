import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="font-source w-full text-black bg-transparent pt-12 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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
          <div className="md:col-span-3 space-y-3">
            <span className="font-source text-[11px] uppercase tracking-widest text-gray-400 block">Index</span>
            <div className="flex flex-col space-y-2 font-source text-xs">
              <Link href="/docs" className="hover:text-gray-500 transition-colors">Privacy Policy</Link>
              <Link href="/changelog" className="hover:text-gray-500 transition-colors">Terms & condition</Link>
              <Link href="/privacy" className="hover:text-gray-500 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}