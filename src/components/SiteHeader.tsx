import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineBars3BottomRight, HiOutlineXMark } from "react-icons/hi2";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Register", to: "/register-page" },
  { label: "Contact", to: "/contact-page" },
  { label: "Admin", to: "/admin-login" },
];

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <div className="shell">
        <div className="site-header__bar glass-panel">
          <Link to="/" className="brand" aria-label="Jesus Youth Chengaloor">
            <img src={logo} alt="Jesus Youth Chengaloor logo" className="brand__logo" />
            <div>
              <span className="brand__title">Jesus Youth Chengaloor</span>
              <span className="brand__subtitle">Rooted in Christ, walking in His light</span>
            </div>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `site-nav__link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link to="/register-page" className="button button--primary">
              Come Worship With Us
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              {isMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3BottomRight />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu glass-panel ${isMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu__links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `mobile-menu__link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <Link to="/register-page" className="button button--primary button--full">
          Come and Register
        </Link>
      </div>
    </header>
  );
}

export default SiteHeader;
