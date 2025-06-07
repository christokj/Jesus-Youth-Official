import React, { lazy, Suspense, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const Logo = lazy(() => import("./Logo"));
const NavLinks = lazy(() => import("./NavLinks"));
const AnimatedTitle = lazy(() => import("./AnimatedTitle"));
import "./Header.scss";

import SkeletonLogo from "./skeletons/SkeletonLogo";
import SkeletonText from "./skeletons/SkeletonText";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 shadow-2xl w-full  sm:h-20 h-14 text-black bg-gradient-to-br from-white via-gray-400 to-white z-2">
            <div className="container mx-auto flex items-center justify-between sm:h-full h-14">
                <div className="flex justify-center items-center sm:justify-start w-full">
                    <div className="flex items-center sm:space-x-3 space-x-2 ">
                        <Link to="/" className="w-8 sm:w-14 h-auto py-5 ms-2">
                            <Suspense fallback={<SkeletonLogo />}>
                                <Logo />
                            </Suspense>
                        </Link>
                        <Link to="/" >
                            <Suspense fallback={<SkeletonText />}>
                                <AnimatedTitle />
                            </Suspense>
                        </Link>
                    </div>
                </div>

                <nav className="hidden sm:flex gap-8 w-full p-6 justify-center">
                    <Suspense fallback={
                        <div className="flex gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="w-16 h-5 bg-gray-300 rounded animate-pulse" />
                            ))}
                        </div>
                    }>
                        <NavLinks />
                    </Suspense>
                </nav>

                {/* Mobile hamburger */}
                <div className="flex sm:hidden z-10 mx-6">
                    <button onClick={() => setMenuOpen(true)} className="text-black">
                        <FaBars size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg p-5 flex flex-col">
                    <button onClick={() => setMenuOpen(false)} className="self-end mb-4">
                        <FaTimes size={24} />
                    </button>
                    <nav className="mt-5 space-y-4">
                        <NavLinks onClick={() => setMenuOpen(false)} mobile />
                    </nav>
                </div>
            </Dialog>
        </header>
    );
};

export default Header;
