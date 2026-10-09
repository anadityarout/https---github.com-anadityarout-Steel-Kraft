import React from "react";
import "./Homecottages.css";

import homesCottagesBanner from "../../assets/homescottagesbanner.jpg";

const Homecottages = () => {
  return (
    <main className="hc-page">
      <section
        className="hc-hero"
        style={{
          backgroundImage: `url(${homesCottagesBanner})`,
        }}
      >
        <div className="hc-hero-overlay"></div>

        <div className="hc-hero-container">
          <div className="hc-hero-content">
            <span className="hc-hero-eyebrow">
              MODERN <span>|</span> SUSTAINABLE <span>|</span> PREFABRICATED
            </span>

            <h1 className="hc-hero-title">
              <span>Homes &</span>
              <span className="hc-title-accent">Cottages</span>
            </h1>

            <p className="hc-hero-description">
              Modern living spaces designed for comfort,
              sustainability and a better tomorrow.
            </p>

            <a
              href="#homes-cottages-cards"
              className="hc-hero-button"
            >
              Explore Homes
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homecottages;