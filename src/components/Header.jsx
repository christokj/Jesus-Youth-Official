import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SVGComponent from "./svg/Logo";
const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white shadow-md w-full sm:h-24 h-14 relative">
            <div className="container mx-auto flex justify-between items-end h-full">

                <div className="relative flex justify-center sm:justify-normal w-full">
                    <div className="flex flex-row absolute -bottom-8 z-10 w-fit">
                        <SVGComponent />
                        <Link to="/" className="text-2xl font-bold sm:block hidden">
                            <span className="text-blue-400">DEEP</span> NET <br />
                            <span className="text-gray-400">SOFT</span>
                        </Link>
                    </div>
                </div>


                <nav className="hidden sm:flex gap-6 w-full p-4">
                    <Link to="/" className="hover:text-gray-300">HOME</Link>
                    <Link to="/menu-page" className="hover:text-gray-300">MENU</Link>
                    <Link className="hover:text-gray-300">MAKE A RESERVATION</Link>
                    <Link to="/contact" className="hover:text-gray-300">CONTACT US</Link>
                </nav>
                <button onClick={() => setMenuOpen(true)} className="sm:hidden text-white">
                    <FaBars size={24} />
                </button>
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
