import React from "react";
import "./Footer.css";

import indiaMap from "../../assets/india-map.png";
import steelKraftLogo from "../../assets/Steel Kraft Logo.png";

import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="site-footer">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-main">

        <div className="footer-container">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="footer-brand footer-section">

            <div className="footer-logo">
              <img
                src={steelKraftLogo}
                alt="Steel Kraft"
                className="footer-logo-image"
              />
            </div>

            <p className="footer-description">
              Building modern, sustainable and prefabricated
              spaces designed for better living.
            </p>

            {/* SOCIAL ICONS */}

            <div className="footer-socials">

              <a
                href="https://www.instagram.com/steelcraftprefab/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="footer-social"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="footer-social"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="footer-social"
              >
                <FaYoutube />
              </a>

            </div>

            <div className="footer-brand-line"></div>

            <div className="footer-nature-text">

              <span className="footer-leaf">
                🌿
              </span>

              <span>
                Nature Meets Modern Living
              </span>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="footer-column footer-section">

            <h3>
              Quick Links
            </h3>

            <div className="footer-title-line"></div>

            <ul>

              <li>
                <a href="/">
                  Home
                </a>
              </li>

              <li>
                <a href="/about">
                  About Us
                </a>
              </li>

              <li>
                <a href="/homes-cottages">
                  Homes &amp; Cottages
                </a>
              </li>

              <li>
                <a href="/projects">
                  Projects
                </a>
              </li>

              <li>
                <a href="/technology">
                  Technology
                </a>
              </li>

              <li>
                <a href="/sustainability">
                  Sustainability
                </a>
              </li>

              <li>
                <a href="/faq">
                  FAQs
                </a>
              </li>

              <li>
                <a href="/contact">
                  Contact
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="footer-column footer-contact footer-section">

            <h3>
              Contact Us
            </h3>

            <div className="footer-title-line"></div>


            {/* LOCATION */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="footer-contact-content">

                <strong>
                  Pan India Service
                </strong>

                <span>
                  Delivering prefab solutions across
                  every corner of India
                </span>

              </div>

            </div>


            {/* PHONE */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <FaPhoneAlt />
              </div>

              <div className="footer-contact-content">

                <a
                  href="tel:+919311826565"
                  className="footer-contact-link"
                >
                  +91-9311826565
                </a>

                <span>
                  Mon - Sat, 9:00 AM - 6:00 PM
                </span>

              </div>

            </div>


            {/* EMAIL */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <FaEnvelope />
              </div>

              <div className="footer-contact-content">

                <a
                  href="mailto:info@steelkraft.in"
                  className="footer-contact-link"
                >
                  info@steelcraft.com
                </a>

                <span>
                  We reply within 24 hours
                </span>

              </div>

            </div>


            {/* WHATSAPP */}

            <a
              href="https://wa.me/919311826565"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-item footer-whatsapp-link"
            >

              <div className="footer-contact-icon footer-whatsapp">
                <FaWhatsapp />
              </div>

              <div className="footer-contact-content">

                <strong>
                  Chat on WhatsApp
                </strong>

                <span>
                  Get quick support
                </span>

              </div>

            </a>


            {/* QUOTE */}

            <button
              className="footer-quote-button"
              type="button"
              onClick={() => scrollToSection("contact")}
            >

              <span>
                Get a Quote
              </span>

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              PAN INDIA
          ================================================= */}

          <div className="footer-pan-india footer-section">

            <div className="footer-pan-content">

              <div className="footer-map">

                <img
                  src={indiaMap}
                  alt="India map showing Pan India service"
                  className="footer-map-image"
                />

              </div>


              <div className="footer-pan-text">

                <h3>
                  Pan India
                  <br />
                  Service
                </h3>

                <p>
                  From mountains
                  <br />
                  to coasts,
                  <br />
                  we build everywhere.
                </p>

              </div>

            </div>


            <div className="footer-pan-line"></div>


            <div className="footer-green-message">

              <span className="footer-leaf">
                🌿
              </span>

              <p>
                Sustainable Spaces
                <br />
                for a Greener India
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          GOLDEN DIVIDER
      ===================================================== */}

      <div className="footer-golden-divider"></div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="footer-bottom">

        <div className="footer-bottom-container">

          <p className="footer-copyright">
            © 2026 Steel Kraft. All Rights Reserved.
          </p>

          <div className="footer-bottom-links">

            <a href="/privacy-policy">
              Privacy Policy
            </a>

            <span>|</span>

            <a href="/terms">
              Terms &amp; Conditions
            </a>

            <span>|</span>

            <a href="/sitemap.xml">
              Sitemap
            </a>

          </div>

          <p className="footer-bottom-message">
            Building a Greener, Stronger India
            <span> 🌿</span>
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;