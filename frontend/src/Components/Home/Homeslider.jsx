import React, { useState } from "react";
import "./HomeSlider.css";
import homeImage from "../../assets/home.jpg";
import home1Image from "../../assets/home1.jpg";

const slides = [
  {
    eyebrow: "MODERN | SUSTAINABLE | PREFABRICATED",

    heading: ["Luxury", "Forest Retreat"],

    subheading:
      "Prefab Homes, Modular Villas & Resort Cottages Across India",

    body:
      "Experience a smarter, faster and more sustainable way to build. Steel Kraft delivers modern prefabricated homes and hospitality cottages designed for today and prepared for tomorrow.",

    image: homeImage,

    alt: "Modern prefabricated villa beside a pool at sunset",
  },

  {
    eyebrow: "MODERN | SUSTAINABLE | PREFABRICATED",

    heading: ["Luxury", "Lakeside Retreat"],

    subheading:
      "Premium Resort Villas & Hospitality Spaces",

    body:
      "Experience refined architecture, serene surroundings and thoughtfully designed spaces made for unforgettable stays.",

    image: home1Image,

    alt: "Luxury lakeside resort villa",
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
          IMAGE
          Desktop: fills the hero as a background (cover)
          Mobile: fills the hero, text sits on top
      ===================================================== */}
      <img
        className="home-slider__image"
        src={slide.image}
        alt={slide.alt}
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
            className="home-slider__btn home-slider__btn--primary"
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
