import React, { useState, useEffect } from "react";
import "./Navbar.css";

// ==============================
// LOGO
// ==============================
import steelKraftLogo from "../../assets/Steel Kraft Logo.png";


// ==============================
// NAV LINKS
// ==============================
const NAV_LINKS = [
  { key: "home", label: "Home", href: "/" },
  { key: "homes", label: "Homes & Cottages", href: "/#homes-cottages" },
  { key: "projects", label: "Projects", href: "/#projects" },
  { key: "contact", label: "Contact Us", href: "/contact" },
];


// ==============================
// FIND ACTIVE LINK FROM URL
// ==============================
const getActiveKey = () => {
  const { pathname, hash } = window.location;

  if (pathname.startsWith("/contact")) return "contact";
  if (hash === "#homes-cottages") return "homes";
  if (hash === "#projects") return "projects";

  return "home";
};


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState(getActiveKey());


  // ==============================
  // MENU HELPERS
  // ==============================
  const closeMenu = () => setMenuOpen(false);
  const openMenu = () => setMenuOpen(true);

  const handleLinkClick = (key) => {
    setActiveKey(key);
    closeMenu();
  };


  // ==============================
  // DARKER GLASS AFTER SCROLLING
  // (keeps white text readable on light sections)
  // ==============================
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  // ==============================
  // KEEP ACTIVE LINK IN SYNC WITH URL
  // ==============================
  useEffect(() => {
    const sync = () => setActiveKey(getActiveKey());

    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);


  // ==============================
  // LOCK PAGE SCROLL + ESCAPE KEY
  // ==============================
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);


  return (
    <>
      {/* =====================================================
          NAVBAR (GLASS)
      ===================================================== */}
      <header className={`sk-navbar ${scrolled ? "scrolled" : ""}`}>

        <div className="sk-navbar-container">

          {/* LOGO */}
          <a
            href="/"
            className="sk-logo"
            onClick={() => handleLinkClick("home")}
          >
            <img src={steelKraftLogo} alt="Steel Kraft" />
          </a>


          {/* DESKTOP MENU */}
          <nav className="sk-desktop-menu">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className={activeKey === link.key ? "active" : ""}
                onClick={() => handleLinkClick(link.key)}
              >
                {link.label}
              </a>
            ))}
          </nav>


          {/* DESKTOP GET A QUOTE */}
          <a
            href="/contact"
            className="sk-quote-btn"
            onClick={() => handleLinkClick("contact")}
          >
            <span>Get a Quote</span>
            <span>→</span>
          </a>


          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            className="sk-menu-button"
            onClick={openMenu}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="sk-mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      <div
        className={`sk-mobile-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      ></div>


      {/* =====================================================
          MOBILE DRAWER (GLASS)
      ===================================================== */}
      <aside
        id="sk-mobile-menu"
        className={`sk-mobile-menu ${menuOpen ? "active" : ""}`}
        aria-hidden={!menuOpen}
      >

        {/* MOBILE HEADER */}
        <div className="sk-mobile-header">

          <a
            href="/"
            className="sk-mobile-logo"
            onClick={() => handleLinkClick("home")}
          >
            <img src={steelKraftLogo} alt="Steel Kraft" />
          </a>

          <button
            type="button"
            className="sk-close-button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>

        </div>


        {/* MOBILE LINKS */}
        <nav className="sk-mobile-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`sk-mobile-link ${
                activeKey === link.key ? "active" : ""
              }`}
              onClick={() => handleLinkClick(link.key)}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>


        {/* MOBILE GET A QUOTE */}
        <div className="sk-mobile-cta">
          <a href="/contact" onClick={() => handleLinkClick("contact")}>
            <span>Get a Quote</span>
            <span>→</span>
          </a>
        </div>

      </aside>
    </>
  );
};


export default Navbar;
