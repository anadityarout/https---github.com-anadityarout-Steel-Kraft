import React, { useRef } from "react";
import "./Project.css";

// =====================================================
// IMPORT PROJECT IMAGES
// =====================================================

import projectA from "../../assets/a.jpg.png";
import projectB from "../../assets/b.jpg.png";
import projectC from "../../assets/c.jpg.png";
import projectD from "../../assets/d.jpg.png";
import projectE from "../../assets/e.jpg.png";
import projectF from "../../assets/f.jpg.png";
import projectG from "../../assets/g.jpg.png";
import projectH from "../../assets/h.jpg.png";
import projectI from "../../assets/i.jpg.png";
import projectJ from "../../assets/j.jpg.png";

// =====================================================
// PROJECT DATA
// =====================================================

const projects = [
  {
    id: 1,
    title: "Auli Eco Resort",
    location: "Uttarakhand",
    image: projectA,
  },
  {
    id: 2,
    title: "Lonavala Villa",
    location: "Maharashtra",
    image: projectB,
  },
  {
    id: 3,
    title: "Coorg Retreat",
    location: "Karnataka",
    image: projectC,
  },
  {
    id: 4,
    title: "Rishikesh Cottage",
    location: "Uttarakhand",
    image: projectD,
  },
  {
    id: 5,
    title: "Goa Resort Villas",
    location: "Goa",
    image: projectE,
  },
  {
    id: 6,
    title: "Sheber Baag Home Stay",
    location: "Delhi",
    image: projectF,
  },
  {
    id: 7,
    title: "Barn House 3BHK Cottage",
    location: "Noida",
    image: projectG,
  },
  {
    id: 8,
    title: "Chail Hamlet Resort",
    location: "Chail",
    image: projectH,
  },
  
  {
    id: 10,
    title: "A Frame 2BHK Villa",
    location: "Manali",
    image: projectI,
  },
  {
    id: 11,
    title: "Mountain Resort",
    location: "Himachal Pradesh",
    image: projectJ,
  },
];

// =====================================================
// PROJECT COMPONENT
// =====================================================

const Project = () => {
  const sliderRef = useRef(null);

  // ===================================================
  // SCROLL LEFT
  // ===================================================

  const scrollLeft = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  // ===================================================
  // SCROLL RIGHT
  // ===================================================

  const scrollRight = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section className="projects-section">

      {/* =============================================
          DECORATIVE BACKGROUND
      ============================================== */}

      <div className="projects-decoration projects-decoration-left"></div>

      <div className="projects-decoration projects-decoration-right"></div>

      {/* =============================================
          MAIN CONTAINER
      ============================================== */}

      <div className="projects-container">

        {/* ===========================================
            HEADER
        ============================================ */}

        <div className="projects-header">

          {/* LEFT HEADING */}

          <div className="projects-heading">

            <span className="projects-label">
              FEATURED PROJECTS
            </span>

            <h2>
              Our Completed Projects
            </h2>

          </div>

          
        </div>

        {/* ===========================================
            PROJECT SLIDER
        ============================================ */}

        <div className="projects-slider-wrapper">

          {/* LEFT NAVIGATION */}

          <button
            type="button"
            className="project-nav project-nav-left"
            onClick={scrollLeft}
            aria-label="Previous projects"
          >
            <span>←</span>
          </button>

          {/* =========================================
              PROJECT CARDS
          ========================================== */}

          <div
            className="projects-slider"
            ref={sliderRef}
          >

            {projects.map((project) => (

              <article
                className="project-card"
                key={project.id}
              >

                {/* PROJECT IMAGE */}

                <img
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  className="project-image"
                  loading="lazy"
                />

                {/* IMAGE GRADIENT */}

                <div className="project-overlay"></div>

                {/* PROJECT INFORMATION */}

                <div className="project-info">

                  <div className="project-text">

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.location}
                    </p>

                  </div>

                

                </div>

              </article>

            ))}

          </div>

          {/* RIGHT NAVIGATION */}

          <button
            type="button"
            className="project-nav project-nav-right"
            onClick={scrollRight}
            aria-label="Next projects"
          >
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default Project;