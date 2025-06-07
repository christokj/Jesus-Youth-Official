import React from "react";
import logo from "../../assets/logo.png"; // adjust path based on your project structure

const Logo = () => {
    return (
        <img
            src={logo}
            alt="Logo"
            loading="lazy"
            className="w-full h-auto object-contain"
        />
    );
};

export default Logo;
