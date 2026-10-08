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
import Resort31 from "../../assets/resort31.png";

// =====================================================
// PROJECT DATA
// =====================================================

const projects = [
  
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
  {
    id: 12,
    title: "Frame Resort Villas",
    location: "Coorg, Karnataka",
    image: Resort,
  },
  {
    id: 13,
    title: "Palm Grove Retreat",
    location: "Wayanad, Kerala",
    image: projecth,
  },
  {
    id: 14,
    title: "Aura Luxury Villas",
    location: "Jaipur, Rajasthan",
    image: projectk,
  },
  {
   id: 15,
   title: "Mountain View Villas",
   location: "Manali, Himachal Pradesh",
   image: Resort12
  },
  {
    id: 16,
    title: "Beachfront Tropical Villa",
    location:"Goa",
    image: Resort16
  },
  {
    id: 17,
    title: "The Valley Resort",
    location: "Lonavala, Maharashtra",
    image: Resort32,
  },
  {
    id: 18,
    title: "Ocean Breeze Resort",
    location: "Goa",
    image: Resort34,
  },
  {
    id: 19,
    title: "Ocean Pearl Resort",
    location: "Puri, Odisha",
    image: Resort35,
  },
  {
    id: 20,
    title: "Lakeside Palace Resort",
    location: "Udaipur, Rajasthan",
    image: Resort39,
  },
  {
    id: 21,
    title: "Oceanfront Palm Resort",
    location: "Goa",
    image: Resort36,
  },
  {
    id: 22,
    title: "Serene Garden Resort",
    location: "Jaipur, Rajasthan",
    image: Resort30,
  },
  {
    id: 23,
    title: "Hillview Garden Resort",
    location: "Mussoorie, Uttarakhand",
    image: Resort28,
  },
  {
    id: 24,
    title: "White Haven Villas",
    location: "Udaipur, Rajasthan",
    image: Resort5,
  },
  {
    id: 25,
    title: "Wildwood Luxury Resort",
    location: "Jim Corbett, Uttarakhand",
    image: Resort13,
  },
  {
    id: 26,
    title: "Lake Palace Retreat",
    location: "Udaipur, Rajasthan",
    image: Resort21,
  },
  {
    id: 27,
    title: "Palm Cove Resort",
    location: "Goa",
    image: Resort22,
  },
  {
    id: 28,
    title: "Serene Coconut Resort",
    location: "Alappuzha, Kerala",
    image: Resort23
 },
 {
  id: 29,
  title: "Heritage Courtyard Resort",
  location: "Udaipur, Rajasthan",
  image: Resort31,
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

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section
      id="projects"
      className="projects-section"
    >

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

          {/* =========================================
              LEFT HEADING
          ========================================== */}

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


          {/* =========================================
              LEFT NAVIGATION
          ========================================== */}

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

                {/* ===================================
                    PROJECT IMAGE
                ==================================== */}

                <img
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  className="project-image"
                  loading="lazy"
                />


                {/* ===================================
                    IMAGE GRADIENT
                ==================================== */}

                <div className="project-overlay"></div>


                {/* ===================================
                    PROJECT INFORMATION
                ==================================== */}

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


          {/* =========================================
              RIGHT NAVIGATION
          ========================================== */}

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