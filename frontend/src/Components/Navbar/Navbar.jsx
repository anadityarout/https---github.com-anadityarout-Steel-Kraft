
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import steelKraftLogo from "../../assets/logo2.png";

// =====================================================
// NAVIGATION LINKS
// =====================================================

const NAV_LINKS = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About Us", href: "/about" },
  {
    key: "homes",
    label: "Homes & Cottages",
    href: "/homes-cottages",
  },
  { key: "projects", label: "Projects", href: "/projects" },
  { key: "work", label: "Work" },
  { key: "contact", label: "Contact Us", href: "/contact" },
];

// =====================================================
// WORK DROPDOWN LINKS
// =====================================================

const WORK_LINKS = [
  { key: "1bhk", label: "1 BHK", href: "/work/1bhk" },
  { key: "2bhk", label: "2 BHK", href: "/work/2bhk" },
  { key: "3bhk", label: "3 BHK", href: "/work/3bhk" },
  { key: "4bhk", label: "4 BHK", href: "/work/4bhk" },
];

// =====================================================
// ACTIVE NAVIGATION
// =====================================================

const getActiveKey = (pathname, hash) => {
  if (pathname === "/contact") return "contact";
  if (pathname === "/about") return "about";
  if (pathname === "/projects") return "projects";
  if (pathname === "/homes-cottages") return "homes";
  if (pathname.startsWith("/work")) return "work";

  if (
    hash === "#homes-cottages-cards" ||
    hash === "#homes-cottages"
  ) {
    return "homes";
  }

  if (hash === "#project-cards" || hash === "#projects") {
    return "projects";
  }

  return "home";
};

// =====================================================
// HOME ICONS
// =====================================================

const HomeIcon = ({ type }) => {
  const paths = {
    "1bhk": (
      <>
        <path d="M3 10 12 3l9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </>
    ),

    "2bhk": (
      <>
        <path d="M3 10 12 3l9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M8 13h3v3H8z" />
        <path d="M14 13h2v3h-2z" />
      </>
    ),

    "3bhk": (
      <>
        <path d="M3 10 12 3l9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M8 12h2v3H8z" />
        <path d="M14 12h2v3h-2z" />
        <path d="M10 20v-4h4v4" />
      </>
    ),

    "4bhk": (
      <>
        <path d="M3 10 12 3l9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M8 12h2v2H8z" />
        <path d="M14 12h2v2h-2z" />
        <path d="M8 16h2v2H8z" />
        <path d="M14 16h2v2h-2z" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[type] || paths["1bhk"]}
    </svg>
  );
};

// =====================================================
// NAVBAR COMPONENT
// =====================================================

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeKey, setActiveKey] = useState(() =>
    getActiveKey(location.pathname, location.hash)
  );

  // =====================================================
  // CLOSE MENU
  // =====================================================

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setWorkOpen(false);
  }, []);

  // =====================================================
  // SCROLL TO TOP
  // =====================================================

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });
  }, []);

  // =====================================================
  // HANDLE NAVIGATION CLICK
  // =====================================================

  const handleLinkClick = (key, event) => {
    setActiveKey(key);
    closeMenu();

    if (key === "home") {
      event?.preventDefault();

      if (location.pathname !== "/" || location.hash) {
        navigate("/", { replace: true });
      } else {
        window.history.replaceState(
          window.history.state,
          "",
          "/"
        );
      }

      scrollToTop();
    }
  };

  // =====================================================
  // GET A QUOTE POPUP
  // =====================================================

  const openQuotePopup = () => {
    closeMenu();
    window.dispatchEvent(new Event("open-quote-popup"));
  };

  // =====================================================
  // SCROLL RESTORATION
  // =====================================================

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    scrollToTop();
  }, [location.pathname, scrollToTop]);

  // =====================================================
  // UPDATE ACTIVE NAVIGATION
  // =====================================================

  useEffect(() => {
    setActiveKey(
      getActiveKey(location.pathname, location.hash)
    );
  }, [location.pathname, location.hash]);

  // =====================================================
  // CLOSE MOBILE MENU AFTER NAVIGATION
  // =====================================================

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash, closeMenu]);

  // =====================================================
  // NAVBAR SCROLL EFFECT
  // =====================================================

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

  // =====================================================
  // LOCK BACKGROUND SCROLL ON MOBILE MENU
  // =====================================================

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // =====================================================
  // WORK DROPDOWN
  // =====================================================

  const renderWorkDropdown = (isMobile = false) => (
    <div
      key={isMobile ? "mobile-work" : "desktop-work"}
      className={`sk-work-dropdown ${
        isMobile ? "mobile-work-dropdown" : "desktop-work-dropdown"
      } ${workOpen ? "open" : ""}`}
      onMouseEnter={() => {
        if (!isMobile) {
          setWorkOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          setWorkOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={`sk-work-trigger ${
          activeKey === "work" ? "active" : ""
        }`}
        onClick={() => setWorkOpen((previous) => !previous)}
        aria-expanded={workOpen}
        aria-haspopup="true"
      >
        <span>Work</span>

        <svg
          className={`sk-work-chevron ${
            workOpen ? "rotated" : ""
          }`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`sk-work-dropdown-menu ${
          workOpen ? "show" : ""
        }`}
        aria-hidden={!workOpen}
      >
        {WORK_LINKS.map((item) => (
          <Link
            key={item.key}
            to={item.href}
            className="sk-work-dropdown-item"
            tabIndex={workOpen ? 0 : -1}
            onClick={() => {
              setActiveKey("work");
              closeMenu();
            }}
          >
            <span className="sk-work-item-icon">
              <HomeIcon type={item.key} />
            </span>

            <span className="sk-work-item-label">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  // =====================================================
  // RENDER NAVIGATION LINKS
  // =====================================================

  const renderNavLinks = (isMobile = false) =>
    NAV_LINKS.map((link) => {
      if (link.key === "work") {
        return renderWorkDropdown(isMobile);
      }

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
          onClick={(event) => {
            handleLinkClick(link.key, event);
          }}
          aria-current={isActive ? "page" : undefined}
        >
          <span>{link.label}</span>
        </Link>
      );
    });

  // =====================================================
  // NAVBAR JSX
  // =====================================================

  return (
    <>
      <header
        className={`sk-navbar ${scrolled ? "scrolled" : ""}`}
      >
        <div className="sk-navbar-container">

          {/* LOGO */}

          <Link
            to="/"
            className="sk-logo"
            onClick={(event) => {
              handleLinkClick("home", event);
            }}
            aria-label="Steel Kraft Home"
          >
            <img src={steelKraftLogo} alt="Steel Kraft" />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav
            className="sk-desktop-menu"
            aria-label="Main navigation"
          >
            {renderNavLinks()}
          </nav>

          {/* DESKTOP GET A QUOTE */}

          <button
            type="button"
            className="sk-quote-btn"
            onClick={openQuotePopup}
          >
            <span>Get a Quote</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className={`sk-menu-button ${
              menuOpen ? "active" : ""
            }`}
            onClick={() => {
              setMenuOpen((previous) => !previous);
              setWorkOpen(false);
            }}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="sk-mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}

      <div
        className={`sk-mobile-overlay ${
          menuOpen ? "active" : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* MOBILE MENU */}

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
            onClick={(event) => {
              handleLinkClick("home", event);
            }}
            aria-label="Steel Kraft Home"
          >
            <img src={steelKraftLogo} alt="Steel Kraft" />
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

        {/* MOBILE NAVIGATION */}

        <nav
          className="sk-mobile-links"
          aria-label="Mobile navigation"
        >
          {renderNavLinks(true)}
        </nav>

        {/* MOBILE GET A QUOTE */}

        <div className="sk-mobile-cta">
          <button type="button" onClick={openQuotePopup}>
            <span>Get a Quote</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
