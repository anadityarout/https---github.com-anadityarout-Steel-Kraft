import React from "react";
import "./ModularTechnology.css";

import buildingSystems from "../../assets/building-systems.png";
import buildingConfiguration from "../../assets/building-configuration.png";
import productDistribution from "../../assets/product-distribution.png";

const ModularTechnology = () => {
  const technologies = [
    {
      image: buildingSystems,
      title: "BUILDING SYSTEMS",
      description:
        "Prefabricated components for floor, wall and roof with standard modules.",
    },
    {
      image: buildingConfiguration,
      title: "THE BUILDING'S CONFIGURATION",
      description:
        "Flexible designs based on your needs, with multiple layout and finish options.",
    },
    {
      image: productDistribution,
      title: "PRODUCT DISTRIBUTION",
      description:
        "Factory-manufactured, transported and assembled at site with precision and safety.",
    },
  ];

  return (
    <section className="modular-technology-section">

      {/* Decorative leaves */}
      <div className="modular-leaf modular-leaf-left"></div>
      <div className="modular-leaf modular-leaf-right"></div>

      <div className="modular-technology-container">

        {/* =========================================
            LEFT CONTENT
        ========================================= */}
        <div className="modular-intro">

          <span className="modular-small-title">
            TECHNOLOGY
          </span>

          <h2>
            Modular Technology
          </h2>

          <h3>
            Advanced prefabrication. Superior spaces.
          </h3>

          <p>
            Steel Kraft uses the best dry technologies, tested and proven
            to deliver high-quality modular buildings with standard
            components. From design to installation, every step is
            precise, efficient and sustainable.
          </p>

          <button
            type="button"
            className="modular-explore-button"
          >
            <span>
              Explore Technology
            </span>

            <span className="modular-button-arrow">
              →
            </span>
          </button>

        </div>


        {/* =========================================
            TECHNOLOGY ITEMS
        ========================================= */}
        <div className="modular-technologies">

          {technologies.map((technology, index) => (
            <div
              className="modular-technology-card"
              key={index}
            >

              <div className="modular-image-wrapper">

                <img
                  src={technology.image}
                  alt={technology.title}
                  className="modular-technology-image"
                />

              </div>

              <h3>
                {technology.title}
              </h3>

              <p>
                {technology.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ModularTechnology;