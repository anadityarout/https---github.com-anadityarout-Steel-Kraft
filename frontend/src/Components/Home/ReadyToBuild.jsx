import React from "react";
import "./ReadyToBuild.css";

import readyImage from "../../assets/ready-to-build.jpg";

import {
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";

const ReadyToBuild = () => {
  const handleQuote = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleExpert = () => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="ready-build-section">

      {/* =========================================
          BACKGROUND IMAGE
      ========================================= */}

      <img
        src={readyImage}
        alt="Mountain prefab home"
        className="ready-build-background"
      />

      {/* =========================================
          DARK OVERLAY
      ========================================= */}

      <div className="ready-build-overlay"></div>


      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="ready-build-container">

        <div className="ready-build-content">

          {/* Small heading */}

          <div className="ready-build-eyebrow">

            <span>
              LET'S BUILD TOGETHER
            </span>

            <span className="ready-build-line"></span>

          </div>


          {/* Main heading */}

          <h2>
            Ready to Build Your Dream Space?
          </h2>


          {/* Description */}

          <p>
            Get a free consultation and customized
            quote for your project today.
          </p>


          {/* Buttons */}

          <div className="ready-build-buttons">

            <button
              type="button"
              className="ready-quote-button"
              onClick={handleQuote}
            >
              <span>
                Get a Quote
              </span>

              <FaArrowRight />
            </button>


            <button
              type="button"
              className="ready-expert-button"
              onClick={handleExpert}
            >
              <FaPhoneAlt />

              <span>
                Talk to Our Expert
              </span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ReadyToBuild;