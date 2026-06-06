"use client"
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserState } from '@/states/userState'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [ismenu, setismenu] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { name, email, avatar, fetchUser, logoutUser } = useUserState();
    const router = useRouter();

    useEffect(() => {
     
        fetchUser();
    }, [fetchUser, logoutUser]);

    const handlelogout = async ()=>{
        setIsDropdownOpen(false);
        await logoutUser();
        router.refresh();
    }
 
    const isUserLoggedIn = !!name || !!email; 

    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    return (
        <nav className='w-screen h-17 border-b-1 font-source relative flex justify-between items-center px-7' ref={dropdownRef}>
            <div className='font-source text-2xl font-extrabold'>Covalent</div>

            {/* Mobile Actions: Only shows Hamburger if Logged Out. Shows Profile Dropdown if Logged In */}
            <div className='flex items-center md:hidden'>
                {isUserLoggedIn ? (
                    /* Mobile Profile Dropdown (Same as Desktop Style) */
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-3 py-1.5 cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                        >
                            <img
                                src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                                alt="profile"
                                className="w-6 h-6 border border-black object-cover"
                            />
                            <span className="text-sm max-w-[80px] truncate">{name?.split(' ')[0] || 'Developer'}</span>
                            <svg
                                className={`w-4 h-4 text-black transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Mobile Dropdown Menu Card */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors border-b border-black last:border-0"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors border-b border-black last:border-0"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/upgrade"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-bold text-black bg-amber-50 hover:bg-amber-400 transition-colors border-b border-black last:border-0 flex items-center justify-between"
                                    >
                                        <span>Upgrade Plan</span>
                                        <span className="text-[10px] bg-black text-white px-1 py-0.5 uppercase tracking-wider">PRO</span>
                                    </Link>
                                    <button
                                        onClick={handlelogout}
                                        className="w-full text-left cursor-pointer block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-b border-black last:border-0"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Hamburger icon ONLY when logged out */
                    <button onClick={() => setismenu(!ismenu)} className='cursor-pointer hover:border border-black transition-all p-1'>
                        <Image src="/menu_burger.png" width={27} height={27} alt='hamburger_menu' />
                    </button>
                )}
            </div>

            {/* Mobile Menu Links Drawer (Only for Unauthenticated Users) */}
            {ismenu && !isUserLoggedIn && (
                <div className={`flex transition-all z-10 duration-500 flex-col w-full absolute px-5 bg-black text-white py-4 gap-6 md:hidden right-0 top-17 items-start`}>
                    <ul className='flex flex-col items-start justify-center gap-6'>
                        <li>About</li>
                        <li>pricing</li>
                        <li>vision</li>
                    </ul>
                    <div className='flex w-full flex-col'>
                        <Link href={"/login"} onClick={() => setismenu(false)}>
                            <button className="px-4 py-2 text-sm w-full cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                                Login/Register
                            </button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Desktop Navigation Links */}
            <div className='hidden md:flex'>
                <ul className='flex items-center gap-8'>
                    <Link href={'/about'}><li>About</li></Link>
                    <Link href={'#pricing'}><li>pricing</li></Link>
                    <Link href={'vision'}><li>vision</li></Link>
                </ul>
            </div>

            {/* Desktop Action Section */}
            <div className='flex items-center px-3 hidden md:flex'>
                {isUserLoggedIn ? (
                    /* Desktop Profile Box with Dropdown Menu */
                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-4 py-2 cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                        >
                            <img
                                src={avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                                alt="profile"
                                className="w-6 h-6 border border-black object-cover"
                            />
                            <span className="text-sm">{name?.split(' ')[0] || 'Developer'}</span>
                            <svg
                                className={`w-4 h-4 text-black transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors border-b border-black last:border-0"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors border-b border-black last:border-0"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/upgrade"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block px-4 py-2 text-sm font-bold text-black bg-amber-50 hover:bg-amber-400 transition-colors border-b border-black last:border-0 flex items-center justify-between"
                                    >
                                        <span>Upgrade Plan</span>
                                        <span className="text-[10px] bg-black text-white px-1 py-0.5 uppercase tracking-wider">PRO</span>
                                    </Link>
                                    <button
                                        onClick={handlelogout}
                                        className="w-full cursor-pointer text-left block px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors border-b border-black last:border-0"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Default Login Button */
                    <Link href={"/login"}>
                        <button className="px-4 py-2 cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                            Login/Register
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar