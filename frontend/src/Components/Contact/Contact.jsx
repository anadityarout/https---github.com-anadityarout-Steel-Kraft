import React from "react";
import "./Contact.css";

// =====================================================
// CONTACT BANNER IMAGE
// =====================================================

import contactImage from "../../assets/Contact.jpg";


// =====================================================
// CONTACT COMPONENT
// =====================================================

function Contact() {
  return (
    <>
      {/* =====================================================
          CONTACT BANNER
      ===================================================== */}

      <section
        className="contact-banner"
        style={{
          backgroundImage: `url(${contactImage})`,
        }}
      >
        <div className="contact-banner-overlay"></div>

        <div className="contact-banner-content">
          <h1>Contact Us</h1>

          <p>
            Let's build something great together.
          </p>
        </div>
      </section>


      {/* =====================================================
          CONTACT OPTIONS
      ===================================================== */}

      <section className="contact-options">
        <div className="contact-options-container">

          {/* SECTION HEADING */}

          <div className="contact-options-heading">

            <span className="contact-eyebrow">
              <span className="eyebrow-line"></span>

              GET IN TOUCH

              <span className="eyebrow-line"></span>
            </span>

            <h2>
              Choose How You’d Like to Connect
            </h2>

            <p>
              We're always here to help. Reach out through your preferred
              channel and we'll get back to you as soon as possible.
            </p>

          </div>


          {/* =================================================
              CONTACT CARDS
          ================================================= */}

          <div className="contact-cards">

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="contact-card">

              <div className="contact-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <path
                    d="M4 7L12 13L20 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>


              <div className="contact-card-content">

                <h3>
                  Email Us
                </h3>

                <p>
                  For general inquiries
                  <br />
                  and project discussions.
                </p>

                <a href="mailto:info@kadenkopper.com">
                  info@kadenkopper.com
                  <span>→</span>
                </a>

              </div>

            </div>


            {/* =================================================
                PHONE
            ================================================= */}

            <div className="contact-card">

              <div className="contact-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6.6 2.8L9.2 2.2C9.8 2.1 10.4 2.4 10.7 2.9L12.2 6.4C12.4 6.9 12.3 7.4 11.9 7.8L10.1 9.3C11.1 11.5 12.5 12.9 14.7 13.9L16.2 12.1C16.6 11.7 17.1 11.6 17.6 11.8L21.1 13.3C21.6 13.6 21.9 14.2 21.8 14.8L21.2 17.4C21 18.3 20.2 19 19.3 19C10.8 19 5 13.2 5 4.7C5 3.8 5.7 3 6.6 2.8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>


              <div className="contact-card-content">

                <h3>
                  Call Us
                </h3>

                <p>
                  Speak directly with
                  <br />
                  our team.
                </p>

                <a href="tel:+919876543210">
                  +91 98765 43210
                  <span>→</span>
                </a>

              </div>

            </div>


            {/* =================================================
                OFFICE
            ================================================= */}

            <div className="contact-card">

              <div className="contact-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20 10C20 15 12 22 12 22C12 22 4 15 4 10C4 5.6 7.6 2 12 2C16.4 2 20 5.6 20 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

              </div>


              <div className="contact-card-content">

                <h3>
                  Visit Our Office
                </h3>

                <p>
                  Our office location.
                  <br />
                  New Delhi,
                  <br />
                  India
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kaden+Koppers%2C+108+First+Floor+DLF+Galleria+Mall%2C+Mayur+Vihar%2C+New+Delhi+110091"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <span>→</span>
                </a>

              </div>

            </div>


            {/* =================================================
                LIVE CHAT
            ================================================= */}

            <div className="contact-card">

              <div className="contact-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V15C22 16.1 21.1 17 20 17H14L10 21V17H4C2.9 17 2 16.1 2 15V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M7 10H7.01M12 10H12.01M17 10H17.01"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

              </div>


              <div className="contact-card-content">

                <h3>
                  Live Chat
                </h3>

                <p>
                  Quick questions?
                  <br />
                  We're here to help.
                </p>

                <a href="#live-chat">
                  Chat Now
                  <span>→</span>
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          GET IN TOUCH FORM + CONTACT INFORMATION
      ===================================================== */}

      <section className="contact-main">

        <div className="contact-main-container">


          {/* =================================================
              LEFT - CONTACT FORM
          ================================================= */}

          <div className="contact-form-wrapper">

            <h2>
              GET IN TOUCH
            </h2>


            <form className="contact-form">

              {/* INQUIRY TOPIC */}

              <div className="contact-field">

                <label htmlFor="inquiryTopic">
                  INQUIRY TOPIC <span>*</span>
                </label>

                <select
                  id="inquiryTopic"
                  name="inquiryTopic"
                  defaultValue="general"
                  required
                >
                  <option value="general">
                    General Inquiry
                  </option>

                  <option value="web-development">
                    Web Development
                  </option>

                  <option value="app-development">
                    App Development
                  </option>

                  <option value="seo">
                    SEO
                  </option>

                  <option value="video-editor">
                    Video Editor
                  </option>

                  <option value="graphic-designer">
                    Graphic Designer
                  </option>

                  <option value="marketing">
                    Marketing
                  </option>
                </select>

              </div>


              {/* FULL NAME */}

              <div className="contact-field">

                <label htmlFor="fullName">
                  FULL NAME <span>*</span>
                </label>

                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="contact-field">

                <label htmlFor="email">
                  EMAIL ADDRESS <span>*</span>
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="contact-field">

                <label htmlFor="phone">
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 9876543210"
                />

              </div>


              {/* BEST TIME */}

              <div className="contact-field">

                <label htmlFor="bestTime">
                  BEST TIME TO CONTACT
                </label>

                <select
                  id="bestTime"
                  name="bestTime"
                  defaultValue="anytime"
                >

                  <option value="anytime">
                    Anytime
                  </option>

                  <option value="morning">
                    Morning - 9:30 AM - 12:00 PM
                  </option>

                  <option value="afternoon">
                    Afternoon - 12:00 PM - 3:00 PM
                  </option>

                  <option value="evening">
                    Evening - 3:00 PM - 5:30 PM
                  </option>

                </select>

              </div>


              {/* SUBJECT */}

              <div className="contact-field">

                <label htmlFor="subject">
                  SUBJECT <span>*</span>
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter your subject"
                  required
                />

              </div>


              {/* MESSAGE */}

              <div className="contact-field">

                <label htmlFor="message">
                  MESSAGE <span>*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Please provide details about your inquiry..."
                  required
                ></textarea>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit-btn"
              >
                SEND MESSAGE
              </button>

            </form>

          </div>


          {/* =================================================
              RIGHT - CONTACT INFORMATION
          ================================================= */}

          <div className="contact-information">

            <h2>
              CONTACT INFORMATION
            </h2>


            {/* LOCATION */}

            <div className="information-card">

              <div className="information-icon">
                <span>📍</span>
              </div>

              <div className="information-content">

                <h3>
                  Location
                </h3>

                <p>
                  Kaden Koppers
                </p>

                <p>
                  108, First Floor, DLF Galleria Mall,
                  Mayur Vihar, Phase-1 Extension,
                  Near Metro Mayur Vihar Extension,
                  New Delhi - 110091
                </p>

              </div>

            </div>


            {/* EMAIL */}

            <div className="information-card">

              <div className="information-icon">
                <span>✉</span>
              </div>

              <div className="information-content">

                <h3>
                  Email
                </h3>

                <a href="mailto:info@kadenkoppers.com">
                  info@kadenkoppers.com
                </a>

              </div>

            </div>


            {/* PHONE */}

            <div className="information-card">

              <div className="information-icon">
                <span>☎</span>
              </div>

              <div className="information-content">

                <h3>
                  Phone
                </h3>

                <a href="tel:+918130462200">
                  +91 8130462200
                </a>

                <p>
                  Mon–Sat : 9:30 AM - 5:30 PM
                </p>

              </div>

            </div>


            {/* BUSINESS HOURS */}

            <div className="information-card">

              <div className="information-icon">
                <span>🕘</span>
              </div>

              <div className="information-content">

                <h3>
                  Business Hours
                </h3>

                <p>
                  Monday - Saturday : 9:30 AM - 5:30 PM
                </p>

                <p>
                  Sunday : Closed
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          LOCATION / MAP
      ===================================================== */}

      <section className="contact-location">

        <div className="contact-location-container">


          {/* LOCATION HEADING */}

          <div className="contact-location-heading">

            <span className="location-eyebrow">

              <span className="location-eyebrow-line"></span>

              FIND US

              <span className="location-eyebrow-line"></span>

            </span>


            <h2>
              Steel Kraft
            </h2>


            <p>
              Visit our office at Mayur Vihar Extension, New Delhi.
            </p>

          </div>


          {/* GOOGLE MAP */}

          <div className="contact-map-wrapper">

            <iframe
              title="Kaden Koppers Location"
              src="https://www.google.com/maps?q=Kaden+Koppers,+108+First+Floor+DLF+Galleria+Mall,+Mayur+Vihar,+New+Delhi+110091&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>

          </div>

        </div>

      </section>

    </>
  );
}

export default Contact;