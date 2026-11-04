
import React, { useState } from "react";

import Login from "./Components/Login/Login";
import Sidebar from "./Components/Sidebar/Sidebar";
import Banner from "./Components/Home/Banner";
import Projecttext from "./Components/Projecttext/Projecttext";
import Cottage from "./Components/Cottage/Cottage";
import SeoAdmin from "./Components/Seo/SeoAdmin";
import LeadsAdmin from "./Components/Leads/LeadsAdmin";
import AboutAdmin from "./Components/About/Aboutadmin";
import Prefabadmin from "./Components/Prefab/Prefabadmin";
import Cottageadmin from "./Components/Cottage/Cottageadmin";
import Fasterdesign from "./Components/Fasterdesign/Fasterdesign";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Home Banner");

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("royalKraftAdminLoggedIn") === "true"
  );

  // Display Login.jsx when logged out.
  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  // Display the dashboard when logged in.
  return (
    <div className="admin-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => {
          sessionStorage.removeItem("royalKraftAdminLoggedIn");
          setIsLoggedIn(false);
          setActivePage("Home Banner");
        }}
      />

      <main className="admin-main-content">
        {activePage === "Home Banner" && <Banner />}

        {activePage === "Project Text" && <Projecttext />}

        {activePage === "Home & Cottage Admin" && <Cottage />}

        {activePage === "SEO Admin" && <SeoAdmin />}

        {activePage === "Customer Leads" && <LeadsAdmin />}

        {activePage === "About Admin" && <AboutAdmin />}
        {activePage === "Why Prefab Steel" && <Prefabadmin />}
        {activePage === "Homecottages" && <Cottageadmin />}
        {activePage === "Faster by design" && <Fasterdesign />}
      </main>
    </div>
  );
}
