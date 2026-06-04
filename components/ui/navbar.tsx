"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {

    const [ismenu, setismenu] = useState<true | false>(false);

    return (
        <nav className='w-screen h-17 border-b-1 font-source relative flex justify-between items-center px-7'>
            <div className='font-source text-2xl font-extrabold'>Covalent</div>
            <button onClick={() => setismenu(!ismenu)} className='cursor-pointer hover:border border-black transition-all p-1 md:hidden'><Image src="/menu_burger.png" width={27} height={27} alt='hamburger_menu' /></button>

            {ismenu && <div className={` flex transition-all z-10 duration-500 flex-col w-full absolute px-5 bg-black text-white py-4 gap-6 md:hidden right-0 top-17 items-start`}>
                <ul className='flex flex-col items-start justify-center gap-6'>
                    <li>About</li>
                    <li>pricing</li>
                    <li>vision</li>
                </ul>
                <div className='flex w-full flex-col'>
                    <button className="px-4 py-2 text-sm cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">Register
                    </button>
                    <button className="px-4 py-2 text-sm cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">Login
                    </button>
                </div>
            </div>}

            <div className='hidden md:flex'>
                <ul className='flex items-center gap-8'>
                    <Link href={'/about'}><li>About</li></Link>
                    <Link href={'#pricing'}><li>pricing</li></Link>
                    <Link href={'vision'}><li>vision</li></Link>
                </ul>
            </div>
            <div className='flex items-center hidden md:flex gap-5'>
                <button className="px-4 py-2 cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">Register
                </button>
                <button className="px-4 py-2 cursor-pointer font-semibold text-black bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">Login
                </button>
            </div>
        </nav>
    )
}

export default Navbar