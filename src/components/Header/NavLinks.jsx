import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ onClick = () => { }, mobile = false }) => {
    const linkClass = mobile ? "block hover:text-blue-400" : "font-bold hover:text-gray-300 transition-all duration-300 transform hover:scale-110 hover:underline";

    return (
        <>
            <Link to="/" className={linkClass} onClick={onClick}>HOME</Link>
            <Link to="/register-page" className={linkClass} onClick={onClick}>REGISTER</Link>
            <Link to="/admin-login" className={linkClass} onClick={onClick}>ADMIN</Link>
            <Link to="/contact-page" className={linkClass} onClick={onClick}>CONTACT US</Link>
        </>
    );
};

export default NavLinks;
