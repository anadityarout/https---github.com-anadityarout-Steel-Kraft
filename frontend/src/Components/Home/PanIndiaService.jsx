import React from "react";
import "./PanIndiaService.css";

import indiaMap from "../../assets/india-map.png";

import {
  FaMapMarkerAlt,
  FaHeadset,
  FaTruck,
  FaTools,
  FaArrowRight,
} from "react-icons/fa";

const PanIndiaService = () => {
  return (
    <section className="pan-india-section">

      {/* =========================================
          BACKGROUND
      ========================================= */}
      <div className="pan-india-background">
        <div className="mountain mountain-one"></div>
        <div className="mountain mountain-two"></div>
        <div className="mountain mountain-three"></div>

        <div className="pan-india-overlay"></div>
      </div>


      {/* =========================================
          CONTENT
      ========================================= */}
      <div className="pan-india-container">

        {/* =========================================
            LEFT / MAIN AREA
        ========================================= */}
        <div className="pan-india-main">

          {/* HEADING */}
          <div className="pan-india-heading">

            <span className="pan-india-small-title">
              PAN INDIA SERVICE
            </span>

            <h2>
              Delivering prefab solutions
              <br />
              across every corner of India
            </h2>

          </div>


          {/* =====================================
              INDIA MAP AREA
          ===================================== */}
          <div className="india-map-area">


            {/* =====================================
                TOP LEFT SERVICE
            ===================================== */}
            <div className="map-service service-top-left">

              <div className="map-service-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="map-service-text">

                <h4>
                  All Major Cities
                </h4>

                <p>
                  Nationwide coverage
                </p>

              </div>

            </div>


            {/* =====================================
                INDIA MAP IMAGE
            ===================================== */}
            <div className="india-map-wrapper">

              <img
                src={indiaMap}
                alt="Pan India Service Coverage"
                className="india-map-image"
              />

            </div>


            {/* =====================================
                TOP RIGHT SERVICE
            ===================================== */}
            <div className="map-service service-top-right">

              <div className="map-service-icon">
                <FaHeadset />
              </div>

              <div className="map-service-text">

                <h4>
                  On-site Support
                </h4>

                <p>
                  Local assistance
                </p>

              </div>

            </div>


            {/* =====================================
                BOTTOM LEFT SERVICE
            ===================================== */}
            <div className="map-service service-bottom-left">

              <div className="map-service-icon">
                <FaTruck />
              </div>

              <div className="map-service-text">

                <h4>
                  Logistics &amp; Installation
                </h4>

                <p>
                  Complete delivery
                </p>

              </div>

            </div>


            {/* =====================================
                BOTTOM RIGHT SERVICE
            ===================================== */}
            <div className="map-service service-bottom-right">

              <div className="map-service-icon">
                <FaTools />
              </div>

              <div className="map-service-text">

                <h4>
                  After-Sales Service
                </h4>

                <p>
                  Long-term support
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =========================================
            RIGHT CARD
        ========================================= */}
        <div className="pan-india-card">

          {/* CARD ICON */}
          <div className="pan-card-icon">
            <FaMapMarkerAlt />
          </div>


          <div className="pan-card-content">

            {/* LABEL */}
            <span className="pan-card-label">
              PAN INDIA COVERAGE
            </span>


            {/* TITLE */}
            <h3>
              From mountains to coasts,
              <br />
              we build everywhere.
            </h3>


            {/* DESCRIPTION */}
            <p>
              Wherever your project is located,
              our team provides complete prefab
              construction support from planning
              to installation.
            </p>


            {/* BUTTON */}
            <button
              className="pan-location-button"
              type="button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >

              <span>
                Check Your Location
              </span>

              <FaArrowRight />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PanIndiaService;