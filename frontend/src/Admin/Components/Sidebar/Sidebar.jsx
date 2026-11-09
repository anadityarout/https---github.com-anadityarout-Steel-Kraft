
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
  Info,
} from "lucide-react";

import "./Sidebar.css";

// ========================================
// MENU CONFIGURATION
// ========================================

const MENU = [

  // HOME
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

  // ABOUT
{
  label: "About",
  icon: Info,
  children: [
    {
      page: "About Admin",
      label: "About Admin",
      icon: Info,
    },
    {
      page: "About Page Admin",
      label: "About Page Admin",
      icon: Info,
    },
  ],
},

  // WHY PREFAB STEEL - SEPARATE MENU
  {
  label: "WHY PREFAB STEEL",
  icon: HousePlus,
  children: [
    {
      page: "Why Prefab Steel",
      label: "WHY PREFAB STEEL",
      icon: HousePlus,
    },
  ],
},


// HOME COTTAGES
{
  label: "Home COTTAGES",
  icon: HousePlus,
  children: [
    {
      page: "Homecottages",
      label: "Homecottages",
      icon: HousePlus,
    },
  ],
},


  // FASTER BY DESIGN
  {
    label: "FASTER BY DESIGN",
    icon: HousePlus,
    children: [
      {
        page: "Faster by design",
        label: "Faster by design",
        icon: HousePlus,
      },
    ],
  },

  // HOME-PROJECT
{
  label: "Home-project",
  icon: HousePlus,
  children: [
    {
      page: "Home-project",
      label: "Home-project",
      icon: HousePlus,
    },
  ],
},

// HOME-GALLERY
{
  label: "Home-gallery",
  icon: HousePlus,
  children: [
    {
      page: "Home-gallery",
      label: "Home-gallery",
      icon: Image,
    },
  ],
},

// WORK
{
  label: "WORK",
  icon: HousePlus,
  children: [
    {
      page: "1BHK",
      label: "1BHK",
      icon: HousePlus,
    },
    {
      page: "2BHK",
      label: "2BHK",
      icon: HousePlus,
    },
    {
      page: "3BHK",
      label: "3BHK",
      icon: HousePlus,
    },
    {
      page: "4BHK",
      label: "4BHK",
      icon: HousePlus,
    },
  ],
},

  // PROJECTS
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

  // HOME & COTTAGE
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

  // SEO
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

  // LEADS
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

// ========================================
// FIND PARENT MENU
// ========================================

const findParent = (page) =>
  MENU.find((menu) =>
    menu.children?.some(
      (child) => child.page === page
    )
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

  // Keep parent menu expanded for selected submenu
  useEffect(() => {
    setExpandedMenu(findParent(activePage));
  }, [activePage]);

  // ========================================
  // MENU CLICK
  // ========================================

  const handleMenuClick = (menu) => {

    // Direct page navigation
    if (menu.page) {
      if (typeof setActivePage === "function") {
        setActivePage(menu.page);
      }
      return;
    }

    // Expand / collapse submenu
    setExpandedMenu((previous) =>
      previous === menu.label ? null : menu.label
    );
  };

  // ========================================
  // SUBMENU CLICK
  // ========================================

  const handlePageClick = (page) => {
    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout = () => {

    sessionStorage.removeItem(
      "royalKraftAdminLoggedIn"
    );

    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  // ========================================
  // SIDEBAR JSX
  // ========================================

  return (
    <aside className="admin-sidebar">

      {/* HEADER */}

      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>

      {/* NAVIGATION */}

      <nav
        className="sidebar-navigation"
        aria-label="Admin navigation"
      >

        {MENU.map((menu) => {

          const Icon = menu.icon;

          const hasChildren =
            Array.isArray(menu.children) &&
            menu.children.length > 0;

          const isExpanded =
            expandedMenu === menu.label;

          const isActive = menu.page
            ? activePage === menu.page
            : menu.children?.some(
                (child) => child.page === activePage
              );

          return (

            <React.Fragment key={menu.label}>

              {/* MAIN MENU */}

              <button
                type="button"
                className={`sidebar-link ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleMenuClick(menu)}
                aria-expanded={
                  hasChildren ? isExpanded : undefined
                }
              >

                <span className="sidebar-link-left">

                  <Icon
                    className="sidebar-icon"
                    size={19}
                  />

                  <span className="sidebar-label">
                    {menu.label}
                  </span>

                </span>

                {hasChildren && (
                  <ChevronRight
                    className={`sidebar-arrow ${
                      isExpanded ? "expanded" : ""
                    }`}
                    size={17}
                  />
                )}

              </button>

              {/* SUBMENU */}

              {hasChildren && isExpanded && (

                <div className="sidebar-submenu">

                  {menu.children.map((child) => {

                    const ChildIcon = child.icon;

                    return (

                      <button
                        key={child.page}
                        type="button"
                        className={`sidebar-sublink ${
                          activePage === child.page
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handlePageClick(child.page)
                        }
                      >

                        <ChildIcon
                          className="sidebar-subicon"
                          size={16}
                          strokeWidth={1.8}
                        />

                        <span className="sidebar-sublabel">
                          {child.label}
                        </span>

                      </button>

                    );
                  })}

                </div>

              )}

            </React.Fragment>

          );
        })}

      </nav>

      {/* LOGOUT */}

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
