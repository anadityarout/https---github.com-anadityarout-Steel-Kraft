
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReadyToBuild.css";

import readyImage from "../../assets/ready-to-build.jpg";

import {
  FaArrowRight,
  FaPhoneAlt,
} from "react-icons/fa";

const ReadyToBuild = () => {
  const navigate = useNavigate();

  // =========================================
  // GET A QUOTE - OPEN EXISTING POPUP
  // =========================================

  const handleQuote = () => {
    window.dispatchEvent(
      new Event("open-quote-popup")
    );
  };

  // =========================================
  // TALK TO EXPERT - OPEN CONTACT PAGE
  // =========================================

  const handleExpert = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
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

          {/* SMALL HEADING */}

          <div className="ready-build-eyebrow">

            <span>
              LET'S BUILD TOGETHER
            </span>

            <span className="ready-build-line"></span>

          </div>

          {/* MAIN HEADING */}

          <h2>
            Ready to Build Your Dream Space?
          </h2>

          {/* DESCRIPTION */}

          <p>
            Get a free consultation and customized
            quote for your project today.
          </p>

          {/* =========================================
              BUTTONS
          ========================================= */}

          <div className="ready-build-buttons">

            {/* GET A QUOTE BUTTON */}

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

            {/* TALK TO OUR EXPERT BUTTON */}

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
