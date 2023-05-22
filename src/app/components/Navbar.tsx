"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {

    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`z-10 fixed top-0 w-full transition-colors duration-300 ${isScrolled ? 'bg-white  dark:bg-gray-900  border-b-[1px] border-[#D2D9EE] dark:border-[#2E3443]' : 'bg-transparent'}`}>
            <nav className="p-5 h-18 z-2 px-4 py-4 flex justify-between lg:items-center z-100">
                <div className="font-semibold text-md dark:font-bold dark:text-md flex items-center" >
                    <Image alt={"Medical Logo"} src={'/img/medical.webp'} width={80} height={80}
                        className="hover:cursor-pointer"
                        style={{ clipPath: "polygon(49% 27%, 80% 25%, 63% 47%, 58.50% 79.00%, 43.75% 79%, 34% 48%, 18% 25%)" }}
                        onClick={() => router.push('/')} />
                    <a className="text-black border border-gray-700 m-2 hover:text-white dark:text-white hover:bg-gray-300 hover:dark:bg-gray-800 hover:bg-opacity-50 hover:cursor-pointer p-3 rounded-xl" target="_blank" onClick={() => router.push('/')}>Home</a>
                    <a className="text-black border border-gray-700 m-2 hover:text-white dark:text-gray-400 hover:bg-gray-300 hover:dark:bg-gray-800 hover:bg-opacity-50 hover:cursor-pointer p-3 rounded-xl" onClick={() => router.push('/list')}>Medical Records</a>
                    <a className="text-black border border-gray-700 m-2 hover:text-white dark:text-gray-400 hover:bg-gray-300 hover:dark:bg-gray-800 hover:bg-opacity-50 hover:cursor-pointer p-3 rounded-xl" onClick={() => router.push('/patient-portal')}>Provide Portal</a>
                </div>
                <ConnectButton accountStatus="address" label="Sign in" />
            </nav >
        </div >
    )
}

export default Navbar;