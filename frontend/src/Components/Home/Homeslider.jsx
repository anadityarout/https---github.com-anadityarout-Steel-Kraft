import React, { useState } from "react";
import "./HomeSlider.css";
import homeImage from "../../assets/home.jpg";
import home1Image from "../../assets/home1.jpg";

/* =========================================================
   SLIDES
   To add more slides, import another image above and add
   one more object here. The progress bar, the counter
   ("01 / 02") and the autoplay all adjust by themselves.
========================================================= */
const slides = [
  {
    image: homeImage,
    alt: "Modern prefabricated villa beside a pool at sunset",
    caption: "Poolside Prefab Villa",
  },
  {
    image: home1Image,
    alt: "Luxury lakeside resort villa",
    caption: "Lakeside Resort Villa",
  },
];

/* Floating glass chips */
const chips = [
  { label: "Faster build", icon: "clock" },
  { label: "Built to last", icon: "shield" },
  { label: "Sustainable", icon: "leaf" },
  { label: "Customisable", icon: "layout" },
];

/* Small feature row under the buttons */
const features = [
  { label: "Steel-framed", icon: "ruler" },
  { label: "Factory-finished", icon: "factory" },
  { label: "Delivered across India", icon: "truck" },
];

/* Bottom scrolling strip */
const marqueeItems = [
  "Across India",
  "Prefab Homes",
  "Modular Villas",
  "Resort Cottages",
  "Steel Frames",
  "Factory-Finished",
  "Delivered Across India",
];

/* =========================================================
   ICONS (inline SVG, no extra package needed)
========================================================= */
function Svg({ size = 20, fill = "none", children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function Icon({ name, size }) {
  switch (name) {
    case "clock":
      return (
        <Svg size={size}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </Svg>
      );
    case "shield":
      return (
        <Svg size={size}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <polyline points="9 12 11 14 15 10" />
        </Svg>
      );
    case "leaf":
      return (
        <Svg size={size}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </Svg>
      );
    case "layout":
      return (
        <Svg size={size}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </Svg>
      );
    case "ruler":
      return (
        <Svg size={size}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </Svg>
      );
    case "factory":
      return (
        <Svg size={size}>
          <path d="M2 20h20" />
          <path d="M4 20V10l5 3V10l5 3V6h6v14" />
        </Svg>
      );
    case "truck":
      return (
        <Svg size={size}>
          <path d="M1 6h13v10H1z" />
          <path d="M14 9h4l3 3v4h-7z" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </Svg>
      );
    case "star":
      return (
        <Svg size={size}>
          <polygon points="12 2 15.1 8.6 22 9.3 16.9 14 18.2 21 12 17.5 5.8 21 7.1 14 2 9.3 8.9 8.6" />
        </Svg>
      );
    case "arrow-right":
      return (
        <Svg size={size}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </Svg>
      );
    case "arrow-left":
      return (
        <Svg size={size}>
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 5 5 12 12 19" />
        </Svg>
      );
    case "pause":
      return (
        <Svg size={size} fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </Svg>
      );
    case "play":
      return (
        <Svg size={size} fill="currentColor">
          <polygon points="7 4 20 12 7 20" />
        </Svg>
      );
    default:
      return null;
  }
}

/* =========================================================
   COMPONENT
========================================================= */
export default function HomeSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = slides.length;

  const goToNext = () => setActive((prev) => (prev + 1) % total);
  const goToPrev = () => setActive((prev) => (prev - 1 + total) % total);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      className={"home-slider" + (paused ? " is-paused" : "")}
      aria-roledescription="carousel"
      aria-label="Steel Kraft featured homes"
    >
      <div className="home-slider__stage">

        {/* =====================================================
            IMAGES (all stacked, active one fades in)
        ===================================================== */}
        {slides.map((slide, index) => (
          <img
            key={index}
            className={
              "home-slider__image" +
              (index === active ? " is-active" : "")
            }
            src={slide.image}
            alt={slide.alt}
            aria-hidden={index === active ? undefined : "true"}
          />
        ))}

        {/* DARK GRADIENT */}
        <div className="home-slider__overlay" />

        {/* =====================================================
            FLOATING GLASS CHIPS
        ===================================================== */}
        <div className="home-slider__floats" aria-hidden="true">
          {chips.map((chip, index) => (
            <div
              key={chip.label}
              className={`home-slider__chip home-slider__chip--${index + 1}`}
            >
              <span className="home-slider__chip-icon">
                <Icon name={chip.icon} size={20} />
              </span>
              <span className="home-slider__chip-label">{chip.label}</span>
            </div>
          ))}
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}
        <div className="home-slider__content">

          <div className="home-slider__eyebrow">
            <span className="home-slider__eyebrow-dot" />
            <span>MODERN | SUSTAINABLE | PREFABRICATED</span>
          </div>

          <h1 className="home-slider__heading">
            Spaces Built for{" "}
            <span className="home-slider__heading-accent">
              A Better Tomorrow
            </span>
          </h1>

          <p className="home-slider__subheading">
            Prefab Homes, Modular Villas &amp; Resort Cottages Across India
          </p>

          <p className="home-slider__body">
            Experience a smarter, faster and more sustainable way to build.
            Steel Craft delivers modern prefabricated homes and hospitality
            cottages designed for today and prepared for tomorrow.
          </p>

          {/* BUTTONS */}
          <div className="home-slider__actions">
            <button
              type="button"
              className="home-slider__btn home-slider__btn--light"
            >
              <span>Explore Our Designs</span>
              <span className="home-slider__btn-arrow">
                <Icon name="arrow-right" size={16} />
              </span>
            </button>

            <button
              type="button"
              className="home-slider__btn home-slider__btn--gold"
            >
              <span>Get a Quote</span>
              <span className="home-slider__btn-arrow">
                <Icon name="arrow-right" size={16} />
              </span>
            </button>
          </div>

          {/* FEATURE ROW */}
          <ul className="home-slider__features">
            {features.map((feature) => (
              <li key={feature.label} className="home-slider__feature">
                <span className="home-slider__feature-icon">
                  <Icon name={feature.icon} size={15} />
                </span>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          {/* =================================================
              CONTROLS: prev | progress segments | next | pause
          ================================================= */}
          <div className="home-slider__controls">
            <button
              type="button"
              className="home-slider__round"
              onClick={goToPrev}
              aria-label="Previous slide"
            >
              <Icon name="arrow-left" size={16} />
            </button>

            <div className="home-slider__segments">
              {slides.map((slide, index) => {
                const state =
                  index < active
                    ? " is-done"
                    : index === active
                    ? " is-active"
                    : "";

                return (
                  <button
                    key={index}
                    type="button"
                    className={"home-slider__seg" + state}
                    onClick={() => setActive(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === active ? "true" : undefined}
                  >
                    <span className="home-slider__seg-track">
                      {/* key restarts the fill animation on every slide change */}
                      <span
                        key={index === active ? `a-${active}` : `i-${index}`}
                        className="home-slider__seg-fill"
                        onAnimationEnd={index === active ? goToNext : undefined}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="home-slider__round"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <Icon name="arrow-right" size={16} />
            </button>

            <button
              type="button"
              className="home-slider__round"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            >
              <Icon name={paused ? "play" : "pause"} size={14} />
            </button>
          </div>
        </div>

        {/* =====================================================
            COUNTER + CAPTION
        ===================================================== */}
        <div className="home-slider__caption" aria-live="polite">
          <span className="home-slider__caption-count">
            {pad(active + 1)} / {pad(total)}
          </span>
          <span className="home-slider__caption-text">
            {slides[active].caption}
          </span>
        </div>
      </div>

      {/* =======================================================
          BOTTOM SCROLLING STRIP
      ======================================================= */}
      <div className="home-slider__marquee" aria-hidden="true">
        <div className="home-slider__marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="home-slider__marquee-group">
              {marqueeItems.map((item) => (
                <span key={item} className="home-slider__marquee-item">
                  <span>{item}</span>
                  <span className="home-slider__marquee-star">
                    <Icon name="star" size={14} />
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
