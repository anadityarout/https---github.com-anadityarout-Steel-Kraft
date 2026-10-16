import React, { useState, useEffect } from "react";
import {
  House,
  FolderKanban,
  HousePlus,
  Search,
  UsersRound,
  ChevronRight,
  Image,
} from "lucide-react";

import "./Sidebar.css";

// ========================================
// MENU CONFIG
// page  = value used in AdminDashboard
// label = text shown in the submenu
// ========================================

const MENU = [
  {
    label: "Home",
    icon: House,
    children: [{ page: "Home Banner", label: "Home Banner", icon: Image }],
  },
  {
    label: "Projects",
    icon: FolderKanban,
    children: [{ page: "Project Text", label: "Project Admin", icon: Image }],
  },
  {
    label: "Home & Cottage",
    icon: HousePlus,
    children: [
      { page: "Home & Cottage Admin", label: "Home & Cottage Admin", icon: HousePlus },
    ],
  },
  {
    label: "SEO",
    icon: Search,
    children: [{ page: "SEO Admin", label: "SEO Admin", icon: Search }],
  },
  {
    label: "Leads",
    icon: UsersRound,
    children: [
      { page: "Customer Leads", label: "Customer Leads", icon: UsersRound },
    ],
  },
];

// find which parent menu owns the active page
const findParent = (page) =>
  MENU.find((menu) => menu.children.some((child) => child.page === page))
    ?.label || null;

export default function Sidebar({
  activePage = "Home Banner",
  setActivePage,
}) {
  const [expandedMenu, setExpandedMenu] = useState(findParent(activePage));

  // keep the correct menu open when the page changes
  useEffect(() => {
    setExpandedMenu(findParent(activePage));
  }, [activePage]);

  const handlePageClick = (page) => {
    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  // open one menu at a time; click again to close
  const handleMenuClick = (label) => {
    setExpandedMenu((previous) => (previous === label ? null : label));
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-navigation" aria-label="Admin navigation">
        {MENU.map(({ label, icon: Icon, children }) => {
          const isExpanded = expandedMenu === label;
          const isActive = children.some((child) => child.page === activePage);

          return (
            <React.Fragment key={label}>
              <button
                type="button"
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => handleMenuClick(label)}
                aria-expanded={isExpanded}
              >
                <span className="sidebar-link-left">
                  <Icon className="sidebar-icon" size={19} />
                  <span className="sidebar-label">{label}</span>
                </span>

                <ChevronRight
                  className={`sidebar-arrow ${isExpanded ? "expanded" : ""}`}
                  size={17}
                />
              </button>

              {isExpanded && (
                <div className="sidebar-submenu">
                  {children.map(({ page, label: childLabel, icon: ChildIcon }) => (
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
                      <span className="sidebar-sublabel">{childLabel}</span>
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}