import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SVGComponent from "./svg/Logo";
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header style={{ colorScheme: 'light' }} className="shadow-md w-full sm:h-24 h-14 text-white bg-gradient-to-br from-green-300 via-blue-400 to-purple-400">
            <div className="container mx-auto flex items-end ">
                <div className="flex justify-center items-center  sm:justify-normal w-full">
                    <div className="flex flex-row z-10 justify-center items-center  h-full">
                        <div className=" w-24 h-24 py-3.5 sm:py-4">
                            <SVGComponent />
                        </div>
                        <Link to="/" className="sm:text-2xl sm:font-bold font-bold ">
                            <h2 className="">Jesus Youth Chengaloor</h2>
                        </Link>
                    </div>
                </div>

                <nav className="hidden sm:flex gap-6 w-full p-4 justify-center ">
                    <Link to="/" className="hover:text-gray-300">HOME</Link>
                    <Link to="/menu-page" className="hover:text-gray-300">ADMIN</Link>
                    <Link to="/contact" className="hover:text-gray-300">CONTACT US</Link>
                </nav>
                <div className="flex sm:hidden z-10">
                    <button onClick={() => setMenuOpen(true)} className=" text-white">
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg p-5 flex flex-col transform transition-transform ease-in-out duration-300">
                    <button onClick={() => setMenuOpen(false)} className="self-end mb-4">
                        <FaTimes size={24} />
                    </button>

                    <nav className="mt-5 space-y-4">
                        <Link to="/" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/menu-page" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Menu</Link>
                        <Link to="/contact" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Contact</Link>
                        <Link className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Make a Reservation</Link>
                    </nav>
                </div>
            </Dialog>
        </header>
    );
};

export default Header;
