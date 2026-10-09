import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Navbar.css";

import steelKraftLogo from "../../assets/Steel Kraft Logo.png";

// ==========================================
// NAVIGATION LINKS
// ==========================================

const NAV_LINKS = [
  {
    key: "home",
    label: "Home",
    href: "/",
  },
  {
    key: "homes",
    label: "Homes & Cottages",
    href: "/homes-cottages",
  },
  {
    key: "projects",
    label: "Projects",
    href: "/projects",
  },
  {
    key: "contact",
    label: "Contact Us",
    href: "/contact",
  },
];

// ==========================================
// FIND ACTIVE LINK
// ==========================================

const getActiveKey = (pathname, hash) => {
  if (pathname === "/contact") {
    return "contact";
  }

  if (pathname === "/projects") {
    return "projects";
  }

  if (pathname === "/homes-cottages") {
    return "homes";
  }

  // Home page section links
  if (
    hash === "#homes-cottages-cards" ||
    hash === "#homes-cottages"
  ) {
    return "homes";
  }

  if (
    hash === "#project-cards" ||
    hash === "#projects"
  ) {
    return "projects";
  }

  return "home";
};

// ==========================================
// NAVBAR COMPONENT
// ==========================================

const Navbar = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeKey, setActiveKey] = useState(() =>
    getActiveKey(location.pathname, location.hash)
  );

  // ========================================
  // MENU HELPERS
  // ========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const handleLinkClick = (key) => {
    setActiveKey(key);
    closeMenu();
  };

  // ========================================
  // SYNC ACTIVE LINK WITH ROUTE
  // ========================================

  useEffect(() => {
    setActiveKey(
      getActiveKey(location.pathname, location.hash)
    );
  }, [location.pathname, location.hash]);

  // ========================================
  // CLOSE MOBILE MENU AFTER NAVIGATION
  // ========================================

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash]);

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ========================================
  // MOBILE MENU SCROLL LOCK
  // ========================================

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [menuOpen]);

  // ========================================
  // RENDER NAVIGATION LINKS
  // ========================================

  const renderNavLinks = (isMobile = false) => {
    return NAV_LINKS.map((link) => {
      const isActive = activeKey === link.key;

      return (
        <Link
          key={link.key}
          to={link.href}
          className={
            isMobile
              ? `sk-mobile-link ${isActive ? "active" : ""}`
              : isActive
              ? "active"
              : ""
          }
          onClick={() => handleLinkClick(link.key)}
          aria-current={isActive ? "page" : undefined}
        >
          <span>{link.label}</span>
        </Link>
      );
    });
  };

  // ========================================
  // RENDER NAVBAR
  // ========================================

  return (
    <>
      {/* =====================================
          MAIN GLASS NAVBAR
      ====================================== */}

      <header
        className={`sk-navbar ${scrolled ? "scrolled" : ""}`}
      >
        <div className="sk-navbar-container">

          {/* LOGO */}

          <Link
            to="/"
            className="sk-logo"
            onClick={() => handleLinkClick("home")}
            aria-label="Steel Kraft Home"
          >
            <img
              src={steelKraftLogo}
              alt="Steel Kraft"
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav
            className="sk-desktop-menu"
            aria-label="Main navigation"
          >
            {renderNavLinks()}
          </nav>

          {/* DESKTOP GET A QUOTE */}

          <Link
            to="/contact"
            className="sk-quote-btn"
            onClick={() => handleLinkClick("contact")}
          >
            <span>Get a Quote</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* MOBILE HAMBURGER */}

          <button
            type="button"
            className={`sk-menu-button ${
              menuOpen ? "active" : ""
            }`}
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

      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}

      <div
        className={`sk-mobile-overlay ${
          menuOpen ? "active" : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* =====================================
          MOBILE DRAWER
      ====================================== */}

      <aside
        id="sk-mobile-menu"
        className={`sk-mobile-menu ${
          menuOpen ? "active" : ""
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        {/* MOBILE HEADER */}

        <div className="sk-mobile-header">
          <Link
            to="/"
            className="sk-mobile-logo"
            onClick={() => handleLinkClick("home")}
            aria-label="Steel Kraft Home"
          >
            <img
              src={steelKraftLogo}
              alt="Steel Kraft"
            />
          </Link>

          <button
            type="button"
            className="sk-close-button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* MOBILE NAVIGATION LINKS */}

        <nav
          className="sk-mobile-links"
          aria-label="Mobile navigation"
        >
          {renderNavLinks(true)}
        </nav>

        {/* MOBILE GET A QUOTE */}

        <div className="sk-mobile-cta">
          <Link
            to="/contact"
            onClick={() => handleLinkClick("contact")}
          >
            <span>Get a Quote</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;