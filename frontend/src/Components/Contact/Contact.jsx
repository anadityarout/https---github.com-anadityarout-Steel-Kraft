import React, { useState } from "react";
import "./Contact.css";

// =====================================================
// IMAGES  (put why5.png inside src/assets/)
// =====================================================

import contactImage from "../../assets/Contact.jpg";
import whyImage from "../../assets/why5.png";

// =====================================================
// SMALL SVG ICONS (reused in several places)
// =====================================================

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7L12 13L20 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M6.6 2.8L9.2 2.2C9.8 2.1 10.4 2.4 10.7 2.9L12.2 6.4C12.4 6.9 12.3 7.4 11.9 7.8L10.1 9.3C11.1 11.5 12.5 12.9 14.7 13.9L16.2 12.1C16.6 11.7 17.1 11.6 17.6 11.8L21.1 13.3C21.6 13.6 21.9 14.2 21.8 14.8L21.2 17.4C21 18.3 20.2 19 19.3 19C10.8 19 5 13.2 5 4.7C5 3.8 5.7 3 6.6 2.8Z" />
  </svg>
);

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10C20 15 12 22 12 22C12 22 4 15 4 10C4 5.6 7.6 2 12 2C16.4 2 20 5.6 20 10Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ChatIcon = () => (
  <svg {...iconProps}>
    <path d="M4 4H20C21.1 4 22 4.9 22 6V15C22 16.1 21.1 17 20 17H14L10 21V17H4C2.9 17 2 16.1 2 15V6C2 4.9 2.9 4 4 4Z" />
    <path d="M7 10H7.01M12 10H12.01M17 10H17.01" strokeWidth="2.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...iconProps} width="16" height="16">
    <path d="M5 12H19M13 6L19 12L13 18" />
  </svg>
);

// =====================================================
// CONTACT COMPONENT
// =====================================================

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  plotLocation: "",
  projectType: "Prefab home",
  design: "",
  details: "",
};

function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [mapActive, setMapActive] = useState(false); // map ignores scroll until clicked

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: send formData to your backend / EmailJS / Formspree here.
      // Example:
      // await fetch("https://formspree.io/f/YOUR_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      console.log("Quote request:", formData);

      setStatus("sent");
      setFormData(emptyForm);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      {/* =====================================================
          CONTACT BANNER
      ===================================================== */}

      <section
        className="contact-banner"
        style={{ backgroundImage: `url(${contactImage})` }}
      >
        <div className="contact-banner-overlay"></div>

        <div className="contact-banner-content">
          <h1>Contact Us</h1>
          <p>Let's build something great together.</p>
        </div>
      </section>

      {/* =====================================================
          CONTACT OPTIONS
      ===================================================== */}

      <section className="contact-options">
        <div className="contact-options-container">
          <div className="contact-options-heading">
            <span className="contact-eyebrow">
              <span className="eyebrow-line"></span>
              GET IN TOUCH
              <span className="eyebrow-line"></span>
            </span>

            <h2>Choose How You’d Like to Connect</h2>

            <p>
              We're always here to help. Reach out through your preferred
              channel and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <MailIcon />
              </div>
              <div className="contact-card-content">
                <h3>Email Us</h3>
                <p>
                  For general inquiries
                  <br />
                  and project discussions.
                </p>
                <a href="mailto:info@steelcraftprefab.com">
                  info@steelcraftprefab.com
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <PhoneIcon />
              </div>
              <div className="contact-card-content">
                <h3>Call Us</h3>
                <p>
                  Speak directly with
                  <br />
                  our team.
                </p>
                <a href="tel:+919311826565">
                  +91 93118 26565
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <PinIcon />
              </div>
              <div className="contact-card-content">
                <h3>Visit Our Office</h3>
                <p>
                  Our office location.
                  <br />
                  New Delhi,
                  <br />
                  India
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Steel+Craft%2C+108+First+Floor+DLF+Galleria+Mall%2C+Mayur+Vihar%2C+New+Delhi+110091"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <ChatIcon />
              </div>
              <div className="contact-card-content">
                <h3>WhatsApp</h3>
                <p>
                  Quick questions?
                  <br />
                  We're here to help.
                </p>
                <a
                  href="https://wa.me/919311826565"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat Now
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUOTE SECTION  (left: intro + image + info | right: form)
      ===================================================== */}

      <section className="quote-section">
        <div className="quote-container">
          {/* ---------------- LEFT ---------------- */}

          <div className="quote-left">
            <span className="quote-eyebrow">
              <span className="quote-dot"></span>
              CONTACT US
            </span>

            <h2 className="quote-title">
              Tell us what you
              <br />
              want to build
            </h2>

            <p className="quote-intro">
              Share a few details and the Steel Craft team will come back with
              options, a rough schedule and a quote.
            </p>

            {/* IMAGE WITH FLOATING LABEL */}

            <div className="quote-image">
              <img src={whyImage} alt="Steel frame building by Steel Craft" />

              <div className="quote-image-badge">
                <span className="quote-icon">
                  <PinIcon />
                </span>
                <span>
                  Your plot,
                  <br />
                  our steel frame
                </span>
              </div>
            </div>

            {/* INFO ROWS */}

            <a className="quote-info" href="tel:+919311826565">
              <span className="quote-icon">
                <PhoneIcon />
              </span>
              <span className="quote-info-text">
                <small>PHONE</small>
                +91 93118 26565
              </span>
            </a>

            <a className="quote-info" href="mailto:info@steelcraftprefab.com">
              <span className="quote-icon">
                <MailIcon />
              </span>
              <span className="quote-info-text">
                <small>EMAIL</small>
                info@steelcraftprefab.com
              </span>
            </a>

            <div className="quote-info">
              <span className="quote-icon">
                <PinIcon />
              </span>
              <span className="quote-info-text">
                <small>COVERAGE</small>
                Projects across India
              </span>
            </div>

            <div className="quote-helpful">
              <h3>Helpful to include</h3>
              <ul>
                <li>Your plot location and approximate size</li>
                <li>How you plan to use the building</li>
                <li>Your preferred size, timeline and budget range</li>
              </ul>
            </div>
          </div>

          {/* ---------------- RIGHT : FORM ---------------- */}

          <div className="quote-card">
            <h2>Get a Quote</h2>
            <p className="quote-required">Fields marked * are required.</p>

            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="quote-row">
                <div className="quote-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="quote-row">
                <div className="quote-field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="plotLocation">Plot location</label>
                  <input
                    type="text"
                    id="plotLocation"
                    name="plotLocation"
                    placeholder="City or town"
                    value={formData.plotLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="quote-row">
                <div className="quote-field">
                  <label htmlFor="projectType">Project type</label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option>Prefab home</option>
                    <option>Modular villa</option>
                    <option>Resort / hospitality cottages</option>
                    <option>Farmhouse / second home</option>
                    <option>Café, office or site building</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div className="quote-field">
                  <label htmlFor="design">Design of interest</label>
                  <input
                    type="text"
                    id="design"
                    name="design"
                    placeholder="e.g. A-Frame Cottage"
                    value={formData.design}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="quote-field">
                <label htmlFor="details">Anything else we should know?</label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Size, timeline, budget range, number of units…"
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="quote-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Request my quote"}
                <ArrowIcon />
              </button>

              {status === "sent" && (
                <p className="quote-message quote-success" role="status">
                  Thank you! We have received your request and will contact you
                  soon.
                </p>
              )}

              {status === "error" && (
                <p className="quote-message quote-error" role="alert">
                  Something went wrong. Please try again or call us.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

     
    </>
  );
}

export default Contact;
