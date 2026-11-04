
import React, { useEffect, useState } from "react";
import "./Aboutus.css";

// ========================================
// IMAGES
// ========================================

import aboutMain from "../../assets/aboutmain.jpg";

const splitMainFiles = import.meta.glob(
  "../../assets/about-main.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const splitInsetFiles = import.meta.glob(
  "../../assets/about-inset.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const splitMain = Object.values(splitMainFiles)[0];
const splitInset = Object.values(splitInsetFiles)[0];

const isSplit = Boolean(splitMain && splitInset);

// ========================================
// AWS API
// ========================================

const ABOUT_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/aboutadmin";

// ========================================
// STATIC POINTS
// ========================================

const points = [
  {
    title: "One team, drawing to handover",
    description:
      "Design, fabrication, delivery and assembly planned together.",
  },
  {
    title: "Made for homes and hospitality",
    description:
      "Cottages, villas and guest suites that feel like architecture, not sheds.",
  },
  {
    title: "Designed to be extended",
    description:
      "Bolted steel frames make later additions simpler.",
  },
];

// ========================================
// ICONS
// ========================================

function FactoryIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 20h20" />
      <path d="M4 20V10l5 3V10l5 3V6h6v14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <polyline points="5 12.5 10 17.5 19 7.5" />
    </svg>
  );
}

// ========================================
// ABOUT US COMPONENT
// ========================================

const Aboutus = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================================
  // FETCH ABOUT CONTENT FROM AWS
  // ======================================

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(ABOUT_API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `About API failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid About API response.");
        }

        // Get the latest saved About banner
        if (data.length > 0) {
          setAboutData(data[data.length - 1]);
        } else {
          setAboutData(null);
        }
      } catch (error) {
        console.error("Error fetching About content:", error);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // ======================================
  // LOADING STATE
  // ======================================

  if (loading) {
    return null;
  }

  // ======================================
  // NO ABOUT CONTENT
  // ======================================

  if (!aboutData) {
    return null;
  }

  // ======================================
  // MAIN JSX
  // ======================================

  return (
    <section className="aboutus-section" id="about">
      <div className="aboutus-container">

        {/* LEFT: IMAGE AND FLOATING ITEMS */}

        <div className="aboutus-visual">
          <div
            className={
              "aboutus-image-wrap" +
              (isSplit ? " aboutus-image-wrap--split" : "")
            }
          >
            {isSplit ? (
              <div className="aboutus-photo">
                <img
                  src={splitMain}
                  alt="Steel Kraft modern prefab home"
                  className="aboutus-photo-img"
                />
              </div>
            ) : (
              <img
                src={aboutMain}
                alt="Steel Kraft modern prefab home"
                className="aboutus-main-image"
              />
            )}

            {/* FLOATING SMALL IMAGE */}

            {isSplit && (
              <div className="aboutus-inset">
                <img
                  src={splitInset}
                  alt="Glass-front cabin interior"
                  className="aboutus-inset-img"
                />
              </div>
            )}

            {/* FLOATING BADGE */}

            <div className="aboutus-badge">
              <span className="aboutus-badge-icon">
                <FactoryIcon />
              </span>

              <span className="aboutus-badge-text">
                Made in the factory, assembled on your plot
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: ADMIN DASHBOARD CONTENT */}

        <div className="aboutus-content">

          <div className="aboutus-label">
            <span className="aboutus-label-dot" />
            <span>{aboutData.name}</span>
          </div>

          <h2 className="aboutus-title">
            {aboutData.subtitle}
          </h2>

          <p className="aboutus-description">
            {aboutData.description}
          </p>

          {/* EXISTING POINTS */}

          <ul className="aboutus-points">
            {points.map((point) => (
              <li
                className="aboutus-point"
                key={point.title}
              >
                <span className="aboutus-point-icon">
                  <CheckIcon />
                </span>

                <div className="aboutus-point-text">
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;
