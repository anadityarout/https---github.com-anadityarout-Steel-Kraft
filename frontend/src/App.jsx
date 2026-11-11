
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
import OneBHK from "./Components/Work/OneBHK";
import Twobhk from "./Components/Work/Twobhk";
import Threebhk from "./Components/Work/Threebhk";
import FourBhk from "./Components/Work/FourBhk";
import AboutPage from "./Components/About/About";

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

// =====================================================
// SEO
// =====================================================

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

  // =====================================================
  // WEBSITE ROUTES
  // Navbar and Footer show only on website pages.
  // =====================================================

  const websiteRoutes = [
    "/",
    "/about",
    "/contact",
    "/projects",
    "/homes-cottages",
    "/work/1bhk",
    "/work/2bhk",
    "/work/3bhk",
    "/work/4bhk",
  ];

  const isWebsitePage = websiteRoutes.includes(pathname);

  // =====================================================
  // GET A QUOTE POPUP
  // Available on ALL website pages.
  // =====================================================

  const showQuotePopup = isWebsitePage;

  // =====================================================
  // CONSULTATION POPUP
  // Home page only.
  // =====================================================

  const showConsultationPopup = pathname === "/";

  // =====================================================
  // FLOATING CHAT
  // Home page only.
  // =====================================================

  const showFloatingChat = pathname === "/";

  return (
    <>
      {/* ================================================
          DYNAMIC SEO METADATA
      ================================================ */}

      {isWebsitePage && <SeoMetadata />}

      {/* ================================================
          NAVBAR
      ================================================ */}

      {isWebsitePage && <Navbar />}

      {/* ================================================
          CONSULTATION POPUP - HOME ONLY
      ================================================ */}

      {showConsultationPopup && <Popup />}

      {/* ================================================
          GET A QUOTE POPUP - ALL WEBSITE PAGES
      ================================================ */}

      {showQuotePopup && <GetQuote />}

      {/* ================================================
          FLOATING CHAT - HOME ONLY
      ================================================ */}

      {showFloatingChat && <FloatingChat />}

      {/* ================================================
          WEBSITE AND ADMIN ROUTES
      ================================================ */}

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* ABOUT US PAGE */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* CONTACT PAGE */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* PROJECT PAGE */}
        <Route
          path="/projects"
          element={<ProjectPage />}
        />

        {/* HOMES & COTTAGES PAGE */}
        <Route
          path="/homes-cottages"
          element={<Homecottages />}
        />

        {/* 1 BHK PAGE */}
        <Route
          path="/work/1bhk"
          element={<OneBHK />}
        />

        {/* 2 BHK PAGE */}
        <Route
          path="/work/2bhk"
          element={<Twobhk />}
        />

        {/* 3 BHK PAGE */}
        <Route
          path="/work/3bhk"
          element={<Threebhk />}
        />

        {/* 4 BHK PAGE */}
        <Route
          path="/work/4bhk"
          element={<FourBhk />}
        />

        {/* ============================================
            ADMIN DASHBOARD
        ============================================ */}

        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />

        {/* ============================================
            404 PAGE
        ============================================ */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      {/* ================================================
          FOOTER - WEBSITE PAGES ONLY
      ================================================ */}

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
