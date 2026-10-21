import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

// =====================================================
// NAVBAR
// =====================================================

import Navbar from "./Components/Navbar/Navbar";

// =====================================================
// HOME COMPONENTS
// =====================================================

import Homeslider from "./Components/Home/Homeslider";
import WhyChooseBar from "./Components/Home/WhyChooseBar";
import Range from "./Components/Range/Range";
import Project from "./Components/Project/Project";
import WhyChooseSteelKraft from "./Components/Home/WhyChooseSteelKraft";
import PanIndiaService from "./Components/Home/PanIndiaService";
import WhoWeServe from "./Components/Home/WhoWeServe";
import NatureApplications from "./Components/Home/NatureApplications";
import ReadyToBuild from "./Components/Home/ReadyToBuild";
import Aboutus from "./Components/Home/Aboutus";
import FasterByDesign from "./Components/Home/FasterByDesign";
import Gallery from "./Components/Home/Gallery";
import FaqSection from "./Components/Home/FaqSection";

// =====================================================
// MAIN PAGES
// =====================================================

import Contact from "./Components/Contact/Contact";
import ProjectPage from "./Components/ProjectPage/ProjectPage";
import Homecottages from "./Components/HomeCottages/HomeCottages";
import Footer from "./Components/Footer/Footer";

// =====================================================
// ADMIN DASHBOARD
// =====================================================

import AdminDashboard from "./Admin/AdminDashboard";

// =====================================================
// POPUP COMPONENTS
// =====================================================

import Popup from "./Components/Popup/Popup";
import GetQuote from "./Components/Popup/GetQuote";
import FloatingChat from "./Components/Popup/FloatingChat";

import SeoMetadata from "./Components/Seomain/SeoMetadata";
// =====================================================
// SCROLL TO TOP ON ROUTE CHANGE
// =====================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

// =====================================================
// HOME PAGE
// =====================================================

function Home() {
  return (
    <>
      <Homeslider />
      <Aboutus />
      <WhyChooseBar />
      <Range />
      <WhoWeServe />
      <FasterByDesign />
      <Project />
      <Gallery />
      <FaqSection />
      <PanIndiaService />
      <WhyChooseSteelKraft />
      <NatureApplications />
      <ReadyToBuild />
    </>
  );
}

// =====================================================
// 404 PAGE
// =====================================================

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>404</h1>
      <p>Page Not Found</p>

      <Link
        to="/"
        style={{
          textDecoration: "none",
          padding: "12px 24px",
          background: "#c17c4d",
          color: "#ffffff",
          borderRadius: "6px",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

// =====================================================
// APP LAYOUT
// =====================================================

function AppLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  // Website pages that show the Navbar and Footer.
  const websiteRoutes = [
    "/",
    "/contact",
    "/projects",
    "/homes-cottages",
  ];

  const isWebsitePage = websiteRoutes.includes(pathname);

  // Pages where the GetQuote popup can be opened.
  const quotePopupRoutes = [
    "/",
    "/projects",
    "/homes-cottages",
  ];

  const showQuotePopup = quotePopupRoutes.includes(pathname);

  // Consultation popup only on Home.
  const showConsultationPopup = pathname === "/";

  // Floating chat icon only on Home.
  const showFloatingChat = pathname === "/";

  return (
  <>
      {/* DYNAMIC SEO METADATA */}
      {isWebsitePage && <SeoMetadata />}

      {/* NAVBAR */}
      {isWebsitePage && <Navbar />}

      {/* EXISTING CONSULTATION POPUP - HOME ONLY */}
      {showConsultationPopup && <Popup />}

      {/* GET A QUOTE POPUP */}
      {showQuotePopup && <GetQuote />}

      {/* FLOATING CHAT ICON - HOME ONLY */}
      {showFloatingChat && <FloatingChat />}

      {/* WEBSITE AND ADMIN ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/projects"
          element={<ProjectPage />}
        />

        <Route
          path="/homes-cottages"
          element={<Homecottages />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      {/* FOOTER */}
      {isWebsitePage && <Footer />}
    </>
  );
}

// =====================================================
// MAIN APP
// =====================================================

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;