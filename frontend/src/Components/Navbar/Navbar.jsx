import React, { useState } from "react";
import "./Navbar.css";

// ==============================
// LOGO
// ==============================
import steelKraftLogo from "../../assets/Steel Kraft Logo.png";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  // ==============================
  // CLOSE MOBILE MENU
  // ==============================
  const closeMenu = () => {
    setMenuOpen(false);
  };


  // ==============================
  // OPEN MOBILE MENU
  // ==============================
  const openMenu = () => {
    setMenuOpen(true);
  };


  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="sk-navbar">

        <div className="sk-navbar-container">


          {/* =================================================
              LOGO
          ================================================= */}
          <a
            href="/"
            className="sk-logo"
            onClick={closeMenu}
          >
            <img
              src={steelKraftLogo}
              alt="Steel Kraft"
            />
          </a>


          {/* =================================================
              DESKTOP MENU
          ================================================= */}
          <nav className="sk-desktop-menu">

            {/* HOME */}
            <a
              href="/"
              onClick={closeMenu}
            >
              Home
            </a>


            {/* HOMES & COTTAGES */}
            <a
              href="/#homes-cottages"
              onClick={closeMenu}
            >
              Homes & Cottages
            </a>


            {/* PROJECTS */}
            <a
              href="/#projects"
              onClick={closeMenu}
            >
              Projects
            </a>


            {/* CONTACT */}
            <a
              href="/contact"
              onClick={closeMenu}
            >
              Contact Us
            </a>

          </nav>


          {/* =================================================
              DESKTOP GET A QUOTE
          ================================================= */}
          <a
            href="/contact"
            className="sk-quote-btn"
            onClick={closeMenu}
          >
            <span>Get a Quote</span>
            <span>→</span>
          </a>


          {/* =================================================
              MOBILE HAMBURGER
          ================================================= */}
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
        className={`sk-mobile-overlay ${
          menuOpen ? "active" : ""
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      ></div>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}
      <aside
        id="sk-mobile-menu"
        className={`sk-mobile-menu ${
          menuOpen ? "active" : ""
        }`}
        aria-hidden={!menuOpen}
      >


        {/* =================================================
            MOBILE HEADER
        ================================================= */}
        <div className="sk-mobile-header">


          {/* MOBILE LOGO */}
          <a
            href="/"
            className="sk-mobile-logo"
            onClick={closeMenu}
          >
            <img
              src={steelKraftLogo}
              alt="Steel Kraft"
            />
          </a>


          {/* CLOSE BUTTON */}
          <button
            type="button"
            className="sk-close-button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>

        </div>


        {/* =================================================
            MOBILE NAVIGATION LINKS
        ================================================= */}
        <nav className="sk-mobile-links">


          {/* HOME */}
          <a
            href="/"
            className="sk-mobile-link"
            onClick={closeMenu}
          >
            <span>Home</span>
          </a>


          {/* HOMES & COTTAGES */}
          <a
            href="/#homes-cottages"
            className="sk-mobile-link"
            onClick={closeMenu}
          >
            <span>Homes & Cottages</span>
          </a>


          {/* PROJECTS */}
          <a
            href="/#projects"
            className="sk-mobile-link"
            onClick={closeMenu}
          >
            <span>Projects</span>
          </a>


          {/* CONTACT */}
          <a
            href="/contact"
            className="sk-mobile-link"
            onClick={closeMenu}
          >
            <span>Contact Us</span>
          </a>

        </nav>


        {/* =================================================
            MOBILE GET A QUOTE
        ================================================= */}
        <div className="sk-mobile-cta">

          <a
            href="/contact"
            onClick={closeMenu}
          >
            <span>Get a Quote</span>
            <span>→</span>
          </a>

        </div>


      </aside>
    </>
  );
};


export default Navbar;