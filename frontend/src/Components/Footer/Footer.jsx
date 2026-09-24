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
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="footer-main">

        <div className="footer-container">

          {/* =================================================
              COLUMN 1 - BRAND
          ================================================= */}

          <div className="footer-brand">

            {/* ================= LOGO ================= */}

            <div className="footer-logo">

              <img
                src={steelKraftLogo}
                alt="Steel Kraft"
                className="footer-logo-image"
              />

            </div>


            {/* ================= DESCRIPTION ================= */}

            <p className="footer-description">
              Building modern, sustainable and
              prefabricated spaces designed for
              better living.
            </p>


            {/* ================= SOCIAL ICONS ================= */}

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


            {/* ================= BRAND LINE ================= */}

            <div className="footer-brand-line"></div>


            {/* ================= NATURE TEXT ================= */}

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
              COLUMN 2 - QUICK LINKS
          ================================================= */}

          <div className="footer-column">

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
              COLUMN 3 - OUR SOLUTIONS
          ================================================= */}

          <div className="footer-column">

            <h3>
              Our Solutions
            </h3>

            <div className="footer-title-line"></div>

            <ul>

              <li>
                <a href="/prefab-homes">
                  Prefab Homes
                </a>
              </li>

              <li>
                <a href="/modular-villas">
                  Modular Villas
                </a>
              </li>

              <li>
                <a href="/resort-cottages">
                  Resort Cottages
                </a>
              </li>

              <li>
                <a href="/farmhouses">
                  Farmhouses
                </a>
              </li>

              <li>
                <a href="/holiday-homes">
                  Holiday Homes
                </a>
              </li>

              <li>
                <a href="/office-cabins">
                  Office Cabins
                </a>
              </li>

              <li>
                <a href="/commercial-spaces">
                  Commercial Spaces
                </a>
              </li>

              <li>
                <a href="/custom-designs">
                  Custom Designs
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              COLUMN 4 - CONTACT
          ================================================= */}

          <div className="footer-column footer-contact">

            <h3>
              Contact Us
            </h3>

            <div className="footer-title-line"></div>


            {/* LOCATION */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>

                <strong>
                  Pan India Service
                </strong>

                <span>
                  Delivering prefab solutions
                  across every corner of India
                </span>

              </div>

            </div>


            {/* PHONE */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon">
                <FaPhoneAlt />
              </div>

              <div>

                <strong>
                  +91-9311826565
                </strong>

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

              <div>

                <strong>
                  info@steelkraft.in
                </strong>

                <span>
                  We reply within 24 hours
                </span>

              </div>

            </div>


            {/* WHATSAPP */}

            <div className="footer-contact-item">

              <div className="footer-contact-icon footer-whatsapp">
                <FaWhatsapp />
              </div>

              <div>

                <strong>
                  Chat on WhatsApp
                </strong>

                <span>
                  Get quick support
                </span>

              </div>

            </div>


            {/* QUOTE BUTTON */}

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
              COLUMN 5 - PAN INDIA
          ================================================= */}

          <div className="footer-pan-india">

            <div className="footer-pan-content">

              {/* REAL INDIA MAP */}

              <div className="footer-map">

                <img
                  src={indiaMap}
                  alt="India map showing Pan India service"
                  className="footer-map-image"
                />

              </div>


              {/* PAN INDIA TEXT */}

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


            {/* SEPARATOR */}

            <div className="footer-pan-line"></div>


            {/* GREEN MESSAGE */}

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