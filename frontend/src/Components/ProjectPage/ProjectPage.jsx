import React, { useEffect, useRef, useState } from "react";
import "./ProjectPage.css";

// ==========================================
// BANNER AND IMPACT BACKGROUND
// ==========================================

import projectBanner from "../../assets/projectbanner.jpg";
import impactBackground from "../../assets/impactbg.jpg";

// ==========================================
// PROJECT IMAGES
// ==========================================

import projectG from "../../assets/g.jpg.png";
import projectH from "../../assets/h.jpg.png";
import projectI from "../../assets/i.jpg.png";
import projectJ from "../../assets/j.jpg.png";

import Resort from "../../assets/Resort.png";
import projecth from "../../assets/h.png";
import projectk from "../../assets/k.png";

import Resort12 from "../../assets/Resort12.png";
import Resort16 from "../../assets/Resort16.png";
import Resort32 from "../../assets/Resort32.png";
import Resort34 from "../../assets/Resort34.png";
import Resort35 from "../../assets/Resort35.png";
import Resort39 from "../../assets/Resort39.png";
import Resort36 from "../../assets/Resort36.png";
import Resort30 from "../../assets/Resort30.png";
import Resort28 from "../../assets/Resort28.png";
import Resort5 from "../../assets/Resort5.png";
import Resort13 from "../../assets/Resort13.png";
import Resort21 from "../../assets/Resort21.png";
import Resort22 from "../../assets/Resort22.png";
import Resort23 from "../../assets/Resort23.png";
import Resort31 from "../../assets/Resort31.png";

// ==========================================
// PROJECT DATA
// Images, names, locations and descriptions
// are managed directly in this file.
// ==========================================

const projectCards = [
  {
    id: 1,
    title: "Barn House 3BHK Cottage",
    location: "Noida",
    image: projectG,
    description:
      "A contemporary prefab cottage designed for comfortable family living with modern architecture.",
  },
  {
    id: 2,
    title: "Chail Hamlet Resort",
    location: "Chail",
    image: projectH,
    description:
      "A peaceful mountain retreat surrounded by nature, designed for relaxing resort experiences.",
  },
  {
    id: 3,
    title: "A Frame 2BHK Villa",
    location: "Manali",
    image: projectI,
    description:
      "A stylish A-frame prefab villa with a distinctive roofline and a cozy contemporary interior.",
  },
  {
    id: 4,
    title: "Mountain Resort",
    location: "Himachal Pradesh",
    image: projectJ,
    description:
      "A modern prefab resort concept designed to complement mountain landscapes and scenic surroundings.",
  },
  {
    id: 5,
    title: "Frame Resort Villas",
    location: "Coorg, Karnataka",
    image: Resort,
    description:
      "Modern frame villas designed for peaceful stays amid the greenery of Coorg.",
  },
  {
    id: 6,
    title: "Palm Grove Retreat",
    location: "Wayanad, Kerala",
    image: projecth,
    description:
      "A nature-inspired prefab retreat with welcoming spaces for comfortable holidays.",
  },
  {
    id: 7,
    title: "Aura Luxury Villas",
    location: "Jaipur, Rajasthan",
    image: projectk,
    description:
      "Elegant prefab villas combining contemporary design, open spaces and premium comfort.",
  },
  {
    id: 8,
    title: "Mountain View Villas",
    location: "Manali, Himachal Pradesh",
    image: Resort12,
    description:
      "Scenic prefab villas designed to bring mountain views and contemporary living together.",
  },
  {
    id: 9,
    title: "Beachfront Tropical Villa",
    location: "Goa",
    image: Resort16,
    description:
      "A tropical prefab villa featuring airy spaces and a relaxed coastal-inspired atmosphere.",
  },
  {
    id: 10,
    title: "The Valley Resort",
    location: "Lonavala, Maharashtra",
    image: Resort32,
    description:
      "A welcoming resort concept with modern prefab accommodation in a scenic setting.",
  },
  {
    id: 11,
    title: "Ocean Breeze Resort",
    location: "Goa",
    image: Resort34,
    description:
      "A contemporary coastal resort concept inspired by open living and tropical surroundings.",
  },
  {
    id: 12,
    title: "Ocean Pearl Resort",
    location: "Puri, Odisha",
    image: Resort35,
    description:
      "A coastal hospitality concept with inviting prefab spaces for memorable guest stays.",
  },
  {
    id: 13,
    title: "Lakeside Palace Resort",
    location: "Udaipur, Rajasthan",
    image: Resort39,
    description:
      "An elegant resort concept inspired by tranquil lake views and refined hospitality.",
  },
  {
    id: 14,
    title: "Oceanfront Palm Resort",
    location: "Goa",
    image: Resort36,
    description:
      "A tropical resort concept surrounded by palms and designed for relaxing coastal escapes.",
  },
  {
    id: 15,
    title: "Serene Garden Resort",
    location: "Jaipur, Rajasthan",
    image: Resort30,
    description:
      "A garden-inspired resort concept with peaceful outdoor spaces and modern prefab design.",
  },
  {
    id: 16,
    title: "Hillview Garden Resort",
    location: "Mussoorie, Uttarakhand",
    image: Resort28,
    description:
      "A hill retreat concept combining garden surroundings with contemporary accommodation.",
  },
  {
    id: 17,
    title: "White Haven Villas",
    location: "Udaipur, Rajasthan",
    image: Resort5,
    description:
      "Contemporary villas featuring clean architectural lines and comfortable living spaces.",
  },
  {
    id: 18,
    title: "Wildwood Luxury Resort",
    location: "Jim Corbett, Uttarakhand",
    image: Resort13,
    description:
      "A nature-inspired resort concept designed around forest scenery and peaceful stays.",
  },
  {
    id: 19,
    title: "Lake Palace Retreat",
    location: "Udaipur, Rajasthan",
    image: Resort21,
    description:
      "An elegant retreat concept inspired by lakeside scenery and restful accommodation.",
  },
  {
    id: 20,
    title: "Palm Cove Resort",
    location: "Goa",
    image: Resort22,
    description:
      "A tropical resort concept with open spaces, palm-lined surroundings and modern comfort.",
  },
  {
    id: 21,
    title: "Serene Coconut Resort",
    location: "Alappuzha, Kerala",
    image: Resort23,
    description:
      "A relaxing resort concept inspired by coconut groves and the natural beauty of Kerala.",
  },
  {
    id: 22,
    title: "Heritage Courtyard Resort",
    location: "Udaipur, Rajasthan",
    image: Resort31,
    description:
      "A courtyard-inspired resort concept combining welcoming spaces with timeless architectural style.",
  },
];

// ==========================================
// IMPACT DATA
// ==========================================

const impactStats = [
  {
    id: 1,
    value: 250,
    suffix: "+",
    label: "Projects Completed",
    icon: "projects",
  },
  {
    id: 2,
    value: 25,
    suffix: "+",
    label: "Cities Across India",
    icon: "cities",
  },
  {
    id: 3,
    value: 10,
    suffix: "+",
    label: "Years of Experience",
    icon: "experience",
  },
  {
    id: 4,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    icon: "satisfaction",
  },
];

// ==========================================
// IMPACT ICONS
// ==========================================

const ImpactIcon = ({ type }) => {
  const commonProps = {
    viewBox: "0 0 48 48",
    width: 38,
    height: 38,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (type) {
    case "projects":
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="15" />
          <path d="M14 14l20 20M34 14L14 34" />
          <circle cx="24" cy="24" r="5" />
        </svg>
      );

    case "cities":
      return (
        <svg {...commonProps}>
          <path d="M7 12l11-5 12 5 11-5v28l-11 5-12-5-11 5z" />
          <path d="M18 7v28M30 12v28" />
          <path d="M24 8c-4 0-7 3-7 7 0 5 7 12 7 12s7-7 7-12c0-4-3-7-7-7z" />
          <circle cx="24" cy="15" r="2" />
        </svg>
      );

    case "experience":
      return (
        <svg {...commonProps}>
          <circle cx="24" cy="24" r="18" />
          <path d="M24 13v12l9 5" />
          <path d="M17 4h14" />
        </svg>
      );

    case "satisfaction":
      return (
        <svg {...commonProps}>
          <path d="M24 41S5 30 5 17a10 10 0 0 1 19-4 10 10 0 0 1 19 4c0 13-19 24-19 24z" />
          <path d="M16 23l5 5 11-12" />
        </svg>
      );

    default:
      return null;
  }
};

// ==========================================
// ANIMATED IMPACT SECTION
// ==========================================

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(
    impactStats.map(() => 0)
  );

  // Start counting when the section enters the viewport.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section || started) return;

    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [started]);

  // Animate each number from zero to its target.
  useEffect(() => {
    if (!started) return;

    let animationFrame;
    let startTime;

    const duration = 1800;

    const animate = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCounts(
        impactStats.map((stat) =>
          Math.round(stat.value * easedProgress)
        )
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started]);

  return (
    <section
      className="impact-section"
      ref={sectionRef}
      style={{
        backgroundImage: `url(${impactBackground})`,
      }}
    >
      <div className="impact-overlay" />

      <div className="impact-container">
        {/* IMPACT INTRO */}

        <div className="impact-intro">
          <div className="impact-eyebrow">
            <span>OUR IMPACT</span>
          </div>

          <h2 className="impact-heading">
            Projects That
            <br />
            Make a Difference
          </h2>

          <p className="impact-description">
            Across India, we have delivered remarkable prefab
            solutions for homes, resorts, cottages and commercial
            spaces.
          </p>
        </div>

        {/* IMPACT STATISTICS */}

        <div className="impact-stats">
          {impactStats.map((stat, index) => (
            <div className="impact-stat" key={stat.id}>
              <div className="impact-stat-icon">
                <ImpactIcon type={stat.icon} />
              </div>

              <div className="impact-stat-number">
                {counts[index]}
                {stat.suffix}
              </div>

              <p className="impact-stat-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// PROJECT PAGE
// ==========================================

const ProjectPage = () => {
  const exploreProjects = () => {
    document
      .getElementById("featured-projects")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <main className="project-page">
      {/* =====================================
          HERO BANNER
      ====================================== */}

      <section
        className="project-hero"
        style={{
          backgroundImage: `url(${projectBanner})`,
        }}
      >
        <div className="project-hero-overlay" />

        <div className="project-hero-container">
          <div className="project-hero-content">
            <div className="project-breadcrumb">
              <span className="breadcrumb-icon" />
              <span>HOME</span>
              <span className="breadcrumb-divider">/</span>
              <span>PROJECTS</span>
            </div>

            <h1 className="project-hero-title">
              Our Projects
            </h1>

            <h2 className="project-hero-subtitle">
              Real Spaces. Real Stories.
            </h2>

            <p className="project-hero-description">
              Explore our completed and ongoing prefab projects
              across India. From modern farmhouses to luxury resorts,
              we deliver sustainable spaces built for a better tomorrow.
            </p>

            <button
              className="project-hero-button"
              type="button"
              onClick={exploreProjects}
            >
              Explore Our Projects
              <span className="project-button-arrow">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED PROJECTS GALLERY
      ====================================== */}

      <section
        className="project-gallery"
        id="featured-projects"
      >
        <div className="project-gallery-container">
          <div className="project-gallery-heading">
            <div className="project-gallery-label">
              <span>FEATURED PROJECTS</span>
            </div>

            <h2 className="project-gallery-title">
              Our Completed Projects
            </h2>

            <p className="project-gallery-description">
              Discover our collection of prefab homes,
              cottages, villas and luxury resort concepts.
            </p>
          </div>

          <div className="project-gallery-grid">
            {projectCards.map((project) => (
              <article
                className="project-gallery-card"
                key={project.id}
              >
                <div className="project-gallery-image-wrap">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.location}`}
                    className="project-gallery-image"
                    loading="lazy"
                  />

                  <div className="project-location-badge">
                    <svg
                      className="project-location-pin"
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>

                    <span>{project.location}</span>
                  </div>
                </div>

                <div className="project-gallery-card-content">
                  <h3 className="project-gallery-card-title">
                    {project.title}
                  </h3>

                  <p className="project-gallery-card-location">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          OUR IMPACT WITH ANIMATED COUNTERS
      ====================================== */}

      <ImpactSection />
    </main>
  );
};

export default ProjectPage;