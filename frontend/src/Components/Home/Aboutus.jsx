import React from "react";
import "./Aboutus.css";

/* =========================================================
   IMAGES

   MODE 1 (works right now)
   Uses your existing aboutmain.jpg (big photo + small photo
   together in one picture). The badge floats, the small photo
   cannot float because it is part of the same picture.

   MODE 2 (both small photo and badge float)
   Put these 2 files in src/assets and everything switches on
   automatically, no code change needed:

     about-main.jpg   -> the BIG photo only (no small photo,
                         no white frame, no shadow)
     about-inset.jpg  -> the SMALL interior photo only
                         (no white frame, CSS adds the frame)

   .png and .webp also work.
========================================================= */
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

/* =========================================================
   CONTENT
   Change the text here, the layout updates by itself.
========================================================= */
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
    description: "Bolted steel frames make later additions simpler.",
  },
];

/* =========================================================
   ICONS (inline SVG, no extra package needed)
========================================================= */
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

/* =========================================================
   COMPONENT
========================================================= */
const Aboutus = () => {
  return (
    <section className="aboutus-section" id="about">
      <div className="aboutus-container">

        {/* =========================
            LEFT: IMAGE + FLOATING ITEMS
        ========================= */}
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

            {/* FLOATING 1: small photo (only in MODE 2) */}
            {isSplit && (
              <div className="aboutus-inset">
                <img
                  src={splitInset}
                  alt="Glass-front cabin interior"
                  className="aboutus-inset-img"
                />
              </div>
            )}

            {/* FLOATING 2: badge */}
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

        {/* =========================
            RIGHT: CONTENT
        ========================= */}
        <div className="aboutus-content">

          <div className="aboutus-label">
            <span className="aboutus-label-dot" />
            <span>ABOUT STEEL CRAFT</span>
          </div>

          <h2 className="aboutus-title">
            Building more, in less time and with less waste
          </h2>

          <p className="aboutus-description">
            Steel Craft designs and delivers prefabricated homes, modular
            villas and hospitality cottages across India. Frames and panels
            are made in a controlled factory, then assembled on your plot, so
            the site stays cleaner, the schedule stays shorter and the finish
            stays consistent.
          </p>

          <ul className="aboutus-points">
            {points.map((point) => (
              <li className="aboutus-point" key={point.title}>

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
