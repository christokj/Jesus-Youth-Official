import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SVGComponent from "./svg/Logo";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header style={{ colorScheme: 'light' }} className="shadow-md w-full sm:h-20 h-14 text-white bg-gradient-to-br from-white via-gray-600 to-white">
            <div className="container mx-auto flex items-center justify-between sm:h-full h-14">
                <div className="flex justify-center items-center sm:justify-start w-full">
                    <div className="flex items-center sm:space-x-3 space-x-2">
                        <div className="w-24 h-24 py-8 sm:py-5">
                            <SVGComponent />
                        </div>
                        <Link to="/" className="sm:text-2xl sm:font-bold font-bold text-center sm:text-left">
                            <h2 className="text-lg sm:text-xl">Jesus Youth Chengaloor</h2>
                        </Link>
                    </div>
                </div>

                {/* Navigation for desktop */}
                <nav className="hidden sm:flex gap-6 w-full p-6 justify-center">
                    <Link to="/" className="hover:text-gray-300 font-bold">HOME</Link>
                    <Link to="/register-page" className="hover:text-gray-300 font-bold">REGISTER</Link>
                    <Link to="/admin-login" className="hover:text-gray-300 font-bold">ADMIN</Link>
                    <Link to="/contact" className="hover:text-gray-300 font-bold">CONTACT US</Link>
                </nav>

                {/* Hamburger menu button for mobile */}
                <div className="flex sm:hidden z-10 mx-6">
                    <button onClick={() => setMenuOpen(true)} className="text-white">
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Dialog Menu */}
            <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg p-5 flex flex-col transform transition-transform ease-in-out duration-300">
                    <button onClick={() => setMenuOpen(false)} className="self-end mb-4">
                        <FaTimes size={24} />
                    </button>
                    <nav className="mt-5 space-y-4">
                        <Link to="/" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>HOME</Link>
                        <Link to="/register-page" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>REGISTER</Link>
                        <Link to="/admin-login" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>ADMIN</Link>
                        <Link to="/contact" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
                    </nav>
                </div>
            </Dialog>
        </header>
    );
};

export default Header;
