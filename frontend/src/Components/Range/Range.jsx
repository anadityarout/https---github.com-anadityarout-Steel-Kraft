import React, { useEffect, useState } from "react";
import "./Range.css";

import image1 from "../../assets/1.jpg.png";
import image2 from "../../assets/2.jpg.png";
import image3 from "../../assets/3.jpg.png";
import image4 from "../../assets/4.jpg.png";
import image5 from "../../assets/5.jpg.png";
import image6 from "../../assets/6.jpg.png";
import image7 from "../../assets/7.jpg.png";
import image8 from "../../assets/8.jpg.png";

const rangeData = [
  {
    image: image1,
    title: "1 BHK Homes",
    description: "Starting from ₹18.5 Lakhs",
  },
  {
    image: image2,
    title: "2 BHK Homes",
    description: "Starting from ₹30.5 Lakhs",
  },
  {
    image: image3,
    title: "3 & 4 BHK Homes",
    description: "Starting from ₹51.5 Lakhs",
  },
  {
    image: image4,
    title: "Modular Studio Units",
    description: "Custom sizes & configurations",
  },
  {
    image: image5,
    title: "Luxury Prefab Homes",
    description: "Starting from ₹45 Lakhs",
  },
  {
    image: image6,
    title: "Modern Cottage Homes",
    description: "Starting from ₹35 Lakhs",
  },
  {
    image: image7,
    title: "Premium Villa Homes",
    description: "Starting from ₹55 Lakhs",
  },
  {
    image: image8,
    title: "Custom Modular Spaces",
    description: "Built to your requirements",
  },
];

const Range = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
      } else if (window.innerWidth <= 1050) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  const maxIndex = Math.max(0, rangeData.length - visibleCards);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="sk-range-section" id="homes-cottages">
      <div className="sk-range-container">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="sk-range-content">
          <span className="sk-range-label">OUR RANGE</span>

          <h2>
            Prefab Homes &amp;
            <br />
            Cottage Designs
          </h2>

          <p>
            Beautifully crafted, modern and sustainable living spaces
            designed for every lifestyle. Explore our range of prefab
            homes and cottages.
          </p>

          <a href="#projects" className="sk-range-button">
            Explore Our Homes
            <span>→</span>
          </a>
        </div>

        {/* =================================================
            CAROUSEL
        ================================================= */}

        <div className="sk-range-slider-wrapper">
          {/* LEFT ARROW */}
          <button
            type="button"
            className="sk-range-nav"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label="Previous designs"
          >
            ‹
          </button>

          {/* VIEWPORT */}
          <div className="sk-range-viewport">
            <div
              className="sk-range-track"
              style={{
                "--visible-cards": visibleCards,
                transform: `translateX(
                  calc(
                    -${currentIndex} *
                    (
                      (
                        100% -
                        ${(visibleCards - 1) * 18}px
                      )
                      / ${visibleCards}
                      + 18px
                    )
                  )
                )`,
              }}
            >
              {rangeData.map((item, index) => (
                <article className="sk-range-card" key={index}>
                  <div className="sk-range-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="sk-range-card-content">
                    <div className="sk-range-card-text">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            type="button"
            className="sk-range-nav"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next designs"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Range;