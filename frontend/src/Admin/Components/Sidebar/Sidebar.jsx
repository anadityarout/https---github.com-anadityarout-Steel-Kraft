
import React, { useState, useEffect } from "react";
import {
  House,
  FolderKanban,
  HousePlus,
  Search,
  UsersRound,
  ChevronRight,
  Image,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

// ========================================
// MENU CONFIGURATION
// ========================================

const MENU = [
  {
    label: "Home",
    icon: House,
    children: [
      {
        page: "Home Banner",
        label: "Home Banner",
        icon: Image,
      },
    ],
  },
  {
    label: "Projects",
    icon: FolderKanban,
    children: [
      {
        page: "Project Text",
        label: "Project Admin",
        icon: Image,
      },
    ],
  },
  {
    label: "Home & Cottage",
    icon: HousePlus,
    children: [
      {
        page: "Home & Cottage Admin",
        label: "Home & Cottage Admin",
        icon: HousePlus,
      },
    ],
  },
  {
    label: "SEO",
    icon: Search,
    children: [
      {
        page: "SEO Admin",
        label: "SEO Admin",
        icon: Search,
      },
    ],
  },
  {
    label: "Leads",
    icon: UsersRound,
    children: [
      {
        page: "Customer Leads",
        label: "Customer Leads",
        icon: UsersRound,
      },
    ],
  },
];

// Find the parent menu of the selected page.
const findParent = (page) =>
  MENU.find((menu) =>
    menu.children.some((child) => child.page === page)
  )?.label || null;

// ========================================
// SIDEBAR COMPONENT
// ========================================

export default function Sidebar({
  activePage = "Home Banner",
  setActivePage,
  onLogout,
}) {
  const [expandedMenu, setExpandedMenu] = useState(
    findParent(activePage)
  );

  // Keep the selected page's parent menu expanded.
  useEffect(() => {
    setExpandedMenu(findParent(activePage));
  }, [activePage]);

  // Handle submenu selection.
  const handlePageClick = (page) => {
    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  // Expand or collapse a menu.
  const handleMenuClick = (label) => {
    setExpandedMenu((previous) =>
      previous === label ? null : label
    );
  };

  // ========================================
  // LOGOUT HANDLER
  // ========================================

  const handleLogout = () => {
    // Remove the current login session.
    sessionStorage.removeItem("royalKraftAdminLoggedIn");

    // Tell App.jsx to display Login.jsx.
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  return (
    <aside className="admin-sidebar">
      {/* Sidebar heading */}
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      {/* Navigation menus */}
      <nav
        className="sidebar-navigation"
        aria-label="Admin navigation"
      >
        {MENU.map(({ label, icon: Icon, children }) => {
          const isExpanded = expandedMenu === label;

          const isActive = children.some(
            (child) => child.page === activePage
          );

          return (
            <React.Fragment key={label}>
              {/* Parent menu */}
              <button
                type="button"
                className={`sidebar-link ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleMenuClick(label)}
                aria-expanded={isExpanded}
              >
                <span className="sidebar-link-left">
                  <Icon
                    className="sidebar-icon"
                    size={19}
                  />

                  <span className="sidebar-label">
                    {label}
                  </span>
                </span>

                <ChevronRight
                  className={`sidebar-arrow ${
                    isExpanded ? "expanded" : ""
                  }`}
                  size={17}
                />
              </button>

              {/* Submenu items */}
              {isExpanded && (
                <div className="sidebar-submenu">
                  {children.map(
                    ({
                      page,
                      label: childLabel,
                      icon: ChildIcon,
                    }) => (
                      <button
                        key={page}
                        type="button"
                        className={`sidebar-sublink ${
                          activePage === page ? "active" : ""
                        }`}
                        onClick={() => handlePageClick(page)}
                      >
                        <ChildIcon
                          className="sidebar-subicon"
                          size={16}
                          strokeWidth={1.8}
                        />

                        <span className="sidebar-sublabel">
                          {childLabel}
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="sidebar-logout-container">
        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
