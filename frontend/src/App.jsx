
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
import ModularTechnology from "./Components/Home/ModularTechnology";
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
// SCROLL TO TOP ON ROUTE CHANGE
// =====================================================

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to the top after the route changes
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
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

      <ModularTechnology />

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
// APP LAYOUT
// =====================================================

function AppLayout() {
  const location = useLocation();

  // All valid website routes
  const validRoutes = [
    "/",
    "/contact",
    "/projects",
    "/homes-cottages",
  ];

  const isNotFoundPage = !validRoutes.includes(
    location.pathname
  );

  return (
    <>
      {/* NAVBAR */}

      {!isNotFoundPage && <Navbar />}

      {/* ROUTES */}

      <Routes>
        {/* HOME PAGE */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* CONTACT PAGE */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* PROJECTS PAGE */}

        <Route
          path="/projects"
          element={<ProjectPage />}
        />

        {/* HOMES & COTTAGES PAGE */}

        <Route
          path="/homes-cottages"
          element={<Homecottages />}
        />

        {/* 404 PAGE */}

        <Route
          path="*"
          element={
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
          }
        />
      </Routes>

      {/* FOOTER */}

      {!isNotFoundPage && <Footer />}
    </>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>
      {/* Scroll to the top whenever the route changes */}
      <ScrollToTop />

      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
