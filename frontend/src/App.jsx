
import React, { useEffect, lazy, Suspense } from "react";
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
// SEO
// =====================================================

import SeoMetadata from "./Components/Seomain/SeoMetadata";

// =====================================================
// FOOTER
// =====================================================

import Footer from "./Components/Footer/Footer";

// =====================================================
// POPUP COMPONENTS
// =====================================================

import Popup from "./Components/Popup/Popup";
import GetQuote from "./Components/Popup/GetQuote";
import FloatingChat from "./Components/Popup/FloatingChat";

// =====================================================
// LAZY LOADED PAGES
// These components load only when their routes are opened.
// =====================================================

const Contact = lazy(() =>
  import("./Components/Contact/Contact")
);

const ProjectPage = lazy(() =>
  import("./Components/ProjectPage/ProjectPage")
);

const Homecottages = lazy(() =>
  import("./Components/HomeCottages/HomeCottages")
);

const OneBHK = lazy(() =>
  import("./Components/Work/OneBHK")
);

const Twobhk = lazy(() =>
  import("./Components/Work/Twobhk")
);

const Threebhk = lazy(() =>
  import("./Components/Work/Threebhk")
);

const FourBhk = lazy(() =>
  import("./Components/Work/FourBhk")
);

const AboutPage = lazy(() =>
  import("./Components/About/About")
);

const AdminDashboard = lazy(() =>
  import("./Admin/AdminDashboard")
);

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
// ROUTE LOADING FALLBACK
// =====================================================

function RouteLoading() {
  return (
    <div className="route-loading">
      Loading...
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
  // POPUPS
  // =====================================================

  const showQuotePopup = isWebsitePage;

  const showConsultationPopup = pathname === "/";

  const showFloatingChat = pathname === "/";

  return (
    <>
      {/* SEO METADATA */}

      {isWebsitePage && <SeoMetadata />}

      {/* NAVBAR */}

      {isWebsitePage && <Navbar />}

      {/* CONSULTATION POPUP - HOME ONLY */}

      {showConsultationPopup && <Popup />}

      {/* GET A QUOTE POPUP - WEBSITE PAGES */}

      {showQuotePopup && <GetQuote />}

      {/* FLOATING CHAT - HOME ONLY */}

      {showFloatingChat && <FloatingChat />}

      {/* ROUTES WITH LAZY LOADING */}

      <Suspense fallback={<RouteLoading />}>
        <Routes>

          {/* HOME PAGE */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT US */}

          <Route
            path="/about"
            element={<AboutPage />}
          />

          {/* CONTACT */}

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* PROJECTS */}

          <Route
            path="/projects"
            element={<ProjectPage />}
          />

          {/* HOMES & COTTAGES */}

          <Route
            path="/homes-cottages"
            element={<Homecottages />}
          />

          {/* 1 BHK */}

          <Route
            path="/work/1bhk"
            element={<OneBHK />}
          />

          {/* 2 BHK */}

          <Route
            path="/work/2bhk"
            element={<Twobhk />}
          />

          {/* 3 BHK */}

          <Route
            path="/work/3bhk"
            element={<Threebhk />}
          />

          {/* 4 BHK */}

          <Route
            path="/work/4bhk"
            element={<FourBhk />}
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
      </Suspense>

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
