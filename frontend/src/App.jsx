import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
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

// =====================================================
// MAIN PAGES
// =====================================================

import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";


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

      <Project />

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

  // ===================================================
  // VALID WEBSITE ROUTES
  // ===================================================

  const validRoutes = [
    "/",
    "/contact",
  ];

  // ===================================================
  // CHECK IF CURRENT PAGE IS 404
  // ===================================================

  const isNotFoundPage = !validRoutes.includes(location.pathname);

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      {!isNotFoundPage && <Navbar />}


      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            CONTACT
        ================================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* =================================================
            404
        ================================================= */}

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
                fontFamily: "Arial, sans-serif",
              }}
            >
              <h1>404</h1>

              <p>
                Page Not Found
              </p>

              <a
                href="/"
                style={{
                  textDecoration: "none",
                  padding: "12px 24px",
                  background: "#c17c4d",
                  color: "#ffffff",
                  borderRadius: "6px",
                }}
              >
                Back to Home
              </a>
            </div>
          }
        />

      </Routes>


      {/* =================================================
          FOOTER
      ================================================= */}

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
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;