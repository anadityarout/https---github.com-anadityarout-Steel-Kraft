import React from "react";
import "./WhoWeServe.css";

import farmhouse from "../../assets/farmhouse.jpg";
import resort from "../../assets/resort.jpg";
import hillCottage from "../../assets/hill-cottage.jpg";
import beachVilla from "../../assets/beach-villa.jpg";
import glampingResort from "../../assets/glamping-resort.jpg";
import holidayHome from "../../assets/holiday-home.jpg";

const WhoWeServe = () => {
  const applications = [
    {
      title: "Farm House",
      image: farmhouse,
    },
    {
      title: "Resort",
      image: resort,
    },
    {
      title: "Hill Cottage",
      image: hillCottage,
    },
    {
      title: "Beach Villa",
      image: beachVilla,
    },
    {
      title: "Glamping Resort",
      image: glampingResort,
    },
    {
      title: "Holiday Home",
      image: holidayHome,
    },
  ];

  return (
    <section className="who-we-serve-section">

      {/* Decorative leaves */}
      <div className="serve-leaf serve-leaf-left"></div>
      <div className="serve-leaf serve-leaf-right"></div>

      <div className="who-we-serve-container">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="who-serve-header">

          <div className="who-serve-heading">

            <span className="who-serve-label">
              APPLICATIONS
            </span>

            <h2>
              Who we serve
            </h2>

            <p>
              Thoughtfully designed spaces for every lifestyle
            </p>

          </div>


          <button
            className="explore-applications-btn"
            type="button"
          >
            <span>
              Explore All Applications
            </span>

            <span className="explore-arrow">
              →
            </span>
          </button>

        </div>


        {/* =========================================
            APPLICATIONS
        ========================================= */}
        <div className="applications-list">

          {applications.map((application, index) => (

            <div
              className="application-card"
              key={index}
            >

              <div className="application-image-wrapper">

                <img
                  src={application.image}
                  alt={application.title}
                  className="application-image"
                />

              </div>

              <h3>
                {application.title}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhoWeServe;