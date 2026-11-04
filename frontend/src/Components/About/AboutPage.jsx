import React, { useState } from "react";
import "./AboutPage.css";

import aboutBanner from "../../assets/why4.png";
import aboutGallery from "../../assets/Galres.png";
import ctaImage from "../../assets/Resort34.png";

const features = [
  {
    title: ["Modern", "Designs"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 23 24 6l19 17" />
        <path d="M10 20v22h28V20" />
        <path d="M19 42V29h10v13" />
      </svg>
    ),
  },
  {
    title: ["Reliable", "Build Quality"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m24 5 19 9-19 9-19-9 19-9Z" />
        <path d="m5 24 19 9 19-9" />
        <path d="m5 33 19 9 19-9" />
      </svg>
    ),
  },
  {
    title: ["Sustainable", "& Efficient"],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 6C18 6 8 16 8 30c0 3 1 6 3 8 14 0 29-8 29-32Z" />
        <path d="M8 42c4-12 11-20 24-27" />
      </svg>
    ),
  },
];

/* Shared SVG props for the new icons (24 x 24 grid) */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const missionVision = [
  {
    title: "Our Mission",
    text: "To make high-quality, sustainable and affordable prefab construction accessible across India.",
    /* target with arrow */
    icon: (
      <svg {...svgProps} strokeWidth="1.9">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        <path d="M12 12 20.5 3.5" />
        <path d="M16 3.5h4.5V8" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    text: "To be India’s most trusted prefab brand, known for innovation, quality and customer satisfaction.",
    /* eye */
    icon: (
      <svg {...svgProps} strokeWidth="1.9">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

const differences = [
  {
    title: ["Quality", "Engineering"],
    text: "Precision-built structures with dependable quality.",
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: ["Faster", "Construction"],
    text: "Efficient building processes that save time.",
    icon: (
      <svg {...svgProps}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: ["Customised", "Designs"],
    text: "Spaces designed around your requirements.",
    /* horizontal sliders: 3 lines, each with a round knob */
    icon: (
      <svg {...svgProps}>
        <path d="M3 5h18" />
        <path d="M3 12h18" />
        <path d="M3 19h18" />
        <circle cx="16" cy="5" r="2.4" fill="#fdebc3" />
        <circle cx="8" cy="12" r="2.4" fill="#fdebc3" />
        <circle cx="9" cy="19" r="2.4" fill="#fdebc3" />
      </svg>
    ),
  },
  {
    title: ["Sustainable", "Solutions"],
    text: "Smarter materials and responsible construction.",
    icon: (
      <svg {...svgProps}>
        <path d="M20 3C9 3 4 8 4 15c0 1.5.5 3 1.5 4C12 19 20 15 20 3Z" />
        <path d="M4 21c2-6 6-10 12-13" />
      </svg>
    ),
  },
  {
    title: ["Reliable", "Project Support"],
    text: "Support from planning through completion.",
    icon: (
      <svg {...svgProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    text: "Understand your needs and project goals.",
    /* two chat bubbles */
    icon: (
      <svg {...svgProps} strokeWidth="1.6">
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h7A2.5 2.5 0 0 1 15 5.5v4a2.5 2.5 0 0 1-2.5 2.5H8l-3 2.5V12h0A2.5 2.5 0 0 1 3 9.5z" />
        <path d="M9 15.2v.3a2.5 2.5 0 0 0 2.5 2.5H16l3 2.5V18a2.5 2.5 0 0 0 2-2.5v-4a2.5 2.5 0 0 0-2.5-2.5H17" />
        <path d="M14.5 14.5h.01M17.5 14.5h.01M11.5 14.5h.01" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Design",
    text: "Create a customised and practical design.",
    /* pencil + ruler */
    icon: (
      <svg {...svgProps} strokeWidth="1.6">
        <path d="M14.5 3.5 20.5 9.5 9 21l-6 0 0-6z" />
        <path d="m12 6 6 6" />
        <path d="m3 15 3 3" />
        <path d="m6 12 2 2" />
        <path d="m9 9 2 2" />
        <path d="M21 3 17 7" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Fabrication",
    text: "Precision manufacturing in our advanced facilities.",
    /* factory */
    icon: (
      <svg {...svgProps} strokeWidth="1.6">
        <path d="M3 21V11l6 4v-4l6 4V4h5v17z" />
        <path d="M2 21h20" />
        <path d="M7 18h.01M12 18h.01M17 18h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Installation",
    text: "Quick and efficient on-site assembly.",
    /* hard hat */
    icon: (
      <svg {...svgProps} strokeWidth="1.6">
        <path d="M2 18h20v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        <path d="M4 18v-3a8 8 0 0 1 16 0v3" />
        <path d="M10 7.2V4h4v3.2" />
        <path d="M12 7v11" />
      </svg>
    ),
  },
];

const AboutPage = () => {
  /* which Mission / Vision card is "lit" (blue) after a tap or click */
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (index) => {
    setActiveCard((current) => (current === index ? null : index));
  };

  return (
    <main className="about-page">

      {/* ABOUT PAGE HERO BANNER */}
      <section
        className="about-hero"
        style={{
          backgroundImage: `url(${aboutBanner})`,
        }}
      >
        <div className="about-hero-overlay"></div>

        <div className="about-hero-container">

          <div className="about-hero-content">

            {/* TOP LABEL */}
            <div className="about-hero-kicker">
              <span>ABOUT US</span>
              <i></i>
              <span>OUR STORY</span>
              <i></i>
              <span>OUR PURPOSE</span>
            </div>

            {/* MAIN HEADING */}
            <h1>
              Building Better,
              <br />
              Living <span>Smarter</span>
            </h1>

            {/* DESCRIPTION */}
            <p>
              We create modern, durable and sustainable prefab
              spaces that are faster to build, cost-effective and
              designed for the way you live and work today.
            </p>

            {/* BUTTONS */}
            <div className="about-hero-buttons">

              <a
                href="#about-content"
                className="about-btn-primary"
              >
                Get to Know Us
                <span>⟶</span>
              </a>

              <a
                href="#our-journey"
                className="about-btn-secondary"
              >
                Our Journey
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="about-who" id="about-content">
        <div className="about-who-container">

          {/* IMAGE SIDE */}
          <div className="about-who-media">
            <span className="about-who-blob"></span>

            <div className="about-who-image-shadow">
              <div className="about-who-image">
                <img src={aboutGallery} alt="SteelCraft Prefab steel structure" />
              </div>
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="about-who-content">

            <div className="about-who-kicker">
              <i></i>
              <span>WHO WE ARE</span>
            </div>

            <h2>About SteelCraft Prefab</h2>

            <p>
              SteelCraft Prefab is a leading provider of modern
              prefabricated construction solutions in India. We design,
              manufacture and deliver high-quality, ready-to-assemble
              spaces for homes, resorts, and commercial use.
            </p>

            <div className="about-who-features">
              {features.map((item, index) => (
                <div className="about-who-feature" key={index}>
                  <div className="about-who-icon">{item.icon}</div>
                  <h3>
                    {item.title[0]}
                    <br />
                    {item.title[1]}
                  </h3>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* MISSION & VISION (dark section, cards turn blue on hover / tap) */}
      <section className="about-mission" id="our-purpose">
        <div className="about-mission-container">

          <div className="about-heading">
            <div className="about-eyebrow">
              <i></i>
              <span>OUR PURPOSE</span>
              <i></i>
            </div>
            <h2>Our Mission &amp; Vision</h2>
            <p>Building a smarter and more sustainable future.</p>
          </div>

          <div className="about-mv-grid">
            {missionVision.map((item, index) => (
              <article
                className={`about-mv-card${activeCard === index ? " is-active" : ""}`}
                key={index}
                tabIndex={0}
                onClick={() => toggleCard(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(index);
                  }
                }}
              >
                <div className="about-mv-icon">{item.icon}</div>
                <div className="about-mv-text">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT (light section) */}
      <section className="about-purpose">
        <div className="about-purpose-container">

          <div className="about-heading about-diff-heading">
            <div className="about-eyebrow">
              <i></i>
              <span>WHY CHOOSE STEELCRAFT</span>
              <i></i>
            </div>
            <h2>
              What Makes Us <span>Different</span>
            </h2>
            <p>A smarter way to build — with speed, strength and style.</p>
          </div>

          <div className="about-diff-grid">
            {differences.map((item, index) => (
              <article className="about-diff-card" key={index}>
                <div className="about-diff-icon">{item.icon}</div>
                <h3>
                  {item.title[0]}
                  <br />
                  {item.title[1]}
                </h3>
                <span className="about-diff-bar" aria-hidden="true"></span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* OUR PROCESS SECTION */}
      <section className="about-process" id="our-journey">
        <div className="about-process-container">

          <div className="about-heading">
            <div className="about-eyebrow">
              <i></i>
              <span>OUR PROCESS</span>
              <i></i>
            </div>
            <h2>
              From Planning to <span>Completion</span>
            </h2>
            <p>A simple, transparent and hassle-free building journey.</p>
            <span className="about-dots" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>

          <div className="about-process-steps">
            {processSteps.map((step, index) => (
              <article className="about-step" key={index}>

                <div className="about-step-head">
                  <span className="about-step-number">{step.number}</span>
                </div>

                <div className="about-step-icon">{step.icon}</div>

                <h3>{step.title}</h3>
                <span className="about-step-bar" aria-hidden="true"></span>
                <p>{step.text}</p>

                {index < processSteps.length - 1 && (
                  <span className="about-step-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </span>
                )}

              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="about-cta">
        <div className="about-cta-container">

          <div className="about-cta-card">

            {/* IMAGE SIDE */}
            <div className="about-cta-media">
              <img src={ctaImage} alt="Modern prefab villa at dusk" />
            </div>

            {/* TEXT SIDE */}
            <div className="about-cta-content">

              <div className="about-cta-kicker">
                <i className="about-cta-line-left"></i>
                <span>LET’S BUILD TOGETHER</span>
                <i></i>
              </div>

              <h2>
                Let’s Build Something{" "}
                <br />
                Better Together
              </h2>

              <p>
                Talk to our team and get a customised proposal for
                your prefab home, villa or commercial project.
              </p>

              <div className="about-cta-buttons">

                {/* change the href values to your real pages */}
                <a href="/contact" className="about-cta-btn-primary">
                  Get a Quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12h16" />
                    <path d="m14 6 6 6-6 6" />
                  </svg>
                </a>

                <a href="/contact" className="about-cta-btn-secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Contact Us
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;
