import React, { useState } from "react";
import "./HomeSlider.css";
import homeImage from "../../assets/home.jpg";

const slides = [
  {
    eyebrow: "MODERN | SUSTAINABLE | PREFABRICATED",

    heading: ["Spaces Built for", "A Better Tomorrow"],

    subheading:
      "Prefab Homes, Modular Villas & Resort Cottages Across India",

    body:
      "Experience a smarter, faster and more sustainable way to build. Steel Kraft delivers modern prefabricated homes and hospitality cottages designed for today and prepared for tomorrow.",

    image: homeImage,
  },
];

export default function HomeSlider() {
  const [active, setActive] = useState(0);

  const slide = slides[active];

  const goToNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="home-slider">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}
      <div
        className="home-slider__image"
        style={{
          backgroundImage: `url("${slide.image}")`,
        }}
      />

      {/* =====================================================
          DARK GRADIENT
      ===================================================== */}
      <div className="home-slider__overlay" />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="home-slider__content">

        {/* EYEBROW */}
        <div className="home-slider__eyebrow">
          {slide.eyebrow}
        </div>

        {/* HEADING */}
        <h1 className="home-slider__heading">
          {slide.heading.map((line, index) => (
            <span
              key={index}
              className="home-slider__heading-line"
            >
              {line}
            </span>
          ))}
        </h1>

        {/* SUBHEADING */}
        <p className="home-slider__subheading">
          {slide.subheading}
        </p>

        {/* BODY */}
        <p className="home-slider__body">
          {slide.body}
        </p>

        {/* BUTTON */}
        <div className="home-slider__actions">
          <button
            type="button"
            className="home-slider__btn"
          >
            <span>Explore Our Designs</span>

            <span
              className="home-slider__btn-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>

      </div>

      {/* =====================================================
          SLIDER NAVIGATION
      ===================================================== */}
      <div className="home-slider__nav">

        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={
              "home-slider__dot" +
              (index === active
                ? " home-slider__dot--active"
                : "")
            }
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}

        <button
          type="button"
          className="home-slider__arrow"
          onClick={goToNext}
          aria-label="Next slide"
        >
          →
        </button>

      </div>

    </section>
  );
}