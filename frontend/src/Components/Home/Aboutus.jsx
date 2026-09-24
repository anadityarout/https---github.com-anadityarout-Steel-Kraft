import React from "react";
import "./Aboutus.css";

import aboutMain from "../../assets/aboutmain.jpg";

const Aboutus = () => {
  const features = [
    {
      icon: "◈",
      title: "Sustainable Living",
      description: "Eco-friendly materials for a greener tomorrow",
    },
    {
      icon: "⚙",
      title: "Innovative Design",
      description: "Modern architecture with smart solutions",
    },
    {
      icon: "◇",
      title: "Long-Lasting Quality",
      description: "Engineered for durability and safety",
    },
    {
      icon: "♧",
      title: "Customer Focused",
      description: "Spaces designed around your needs",
    },
  ];

  return (
    <section className="aboutus-section" id="about">
      <div className="aboutus-container">

        {/* =========================
            LEFT CONTENT
        ========================= */}
        <div className="aboutus-content">

          <div className="aboutus-label">
            <span className="aboutus-label-line"></span>
            <span>ABOUT STEEL KRAFT</span>
          </div>

          <h2 className="aboutus-title">
            Building More
            <br />
            Than Spaces,
            <br />
            <span>We Build Better Lives.</span>
          </h2>

          <div className="aboutus-description">
            <p>
              Steel Kraft is a leading provider of modern prefab homes,
              modular villas and hospitality spaces across India. We combine
              innovative design, advanced prefabrication technology and
              sustainable construction practices to create spaces that are
              functional, beautiful and built to last.
            </p>

            <p>
              From concept and manufacturing to transportation and on-site
              installation, we deliver end-to-end building solutions tailored
              to your lifestyle, location and vision.
            </p>
          </div>

          {/* FEATURES */}
          <div className="aboutus-features">
            {features.map((feature, index) => (
              <div className="aboutus-feature" key={index}>

                <div className="aboutus-feature-icon">
                  {feature.icon}
                </div>

                <div className="aboutus-feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>

              </div>
            ))}
          </div>

          {/* STATS */}
          <div className="aboutus-stats">

            <div className="aboutus-stat">
              <strong>10+</strong>
              <span>YEARS OF EXPERIENCE</span>
            </div>

            <div className="aboutus-stat">
              <strong>250+</strong>
              <span>PROJECTS COMPLETED</span>
            </div>

            <div className="aboutus-stat">
              <strong>25+</strong>
              <span>CITIES ACROSS INDIA</span>
            </div>

          </div>

          {/* BUTTON */}
          <a href="/about" className="aboutus-button">
            <span>Discover Our Story</span>
            <span className="aboutus-button-arrow">→</span>
          </a>

        </div>

        {/* =========================
            RIGHT SIDE
            SINGLE COMPLETE IMAGE
        ========================= */}
        <div className="aboutus-visual">

          <img
            src={aboutMain}
            alt="Steel Kraft modern prefab home"
            className="aboutus-main-image"
          />

        </div>

      </div>
    </section>
  );
};

export default Aboutus;