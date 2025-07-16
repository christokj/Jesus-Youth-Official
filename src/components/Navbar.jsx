import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full fixed top-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 sm:py-5">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="https://res.cloudinary.com/dfm6raue1/image/upload/v1750397101/20211229_221839__1_-removebg-preview_sayl4j.png"
            alt="logo"
            className="w-12 sm:w-14 h-12 sm:h-14 object-contain"
          />
          <p className="text-white text-[16px] sm:text-[20px] font-bold cursor-pointer">
            Jesus Youth <span className="hidden sm:inline">&nbsp;Chengaloor</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-8">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`text-[16px] font-medium cursor-pointer transition-colors ${active === nav.title ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-7 h-7 object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile Dropdown */}
          <div
            className={`${toggle ? "flex" : "hidden"
              } absolute top-16 right-4 bg-black bg-opacity-90 px-6 py-4 rounded-xl z-50`}
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`text-[16px] font-medium cursor-pointer ${active === nav.title ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
