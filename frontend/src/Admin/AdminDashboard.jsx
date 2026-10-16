import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Banner from "./Components/Home/Banner";
import Projecttext from "./Components/Projecttext/Projecttext";
import Cottage from "./Components/Cottage/Cottage";
import SeoAdmin from "./Components/Seo/SeoAdmin";
import LeadsAdmin from "./Components/Leads/LeadsAdmin";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Home Banner");

  return (
    <div className="admin-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="admin-main-content">
        {activePage === "Home Banner" && <Banner />}
        {activePage === "Project Text" && <Projecttext />}
        {activePage === "Home & Cottage Admin" && <Cottage />}
        {activePage === "SEO Admin" && <SeoAdmin />}
        {activePage === "Customer Leads" && <LeadsAdmin />}
      </main>
    </div>
  );
}