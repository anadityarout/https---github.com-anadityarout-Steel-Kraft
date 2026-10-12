import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Homecottages.css";

import homesCottagesBanner from "../../assets/homescottagesbanner.jpg";

import imgAFrame from "../../assets/gal1.png";
import imgStudio from "../../assets/ran2.png";
import imgVilla from "../../assets/ran3.jpg";
import imgDuplex from "../../assets/ran4.png";
import imgPavilion from "../../assets/why5.png";
import imgPool from "../../assets/why1.png";

const homes = [
  {
    id: 1,
    title: "A-Frame Cottage",
    image: imgAFrame,
    size: "800 sqft",
    place: "Forest Area",
    text: "A cozy and stylish cottage perfect for holidays.",
    link: "/contact",
  },
  {
    id: 2,
    title: "Studio Cottage",
    image: imgStudio,
    size: "600 sqft",
    place: "Hillside",
    text: "Compact modern studio with smart, efficient living space.",
    link: "/contact",
  },
  {
    id: 3,
    title: "Modern Villa",
    image: imgVilla,
    size: "1800 sqft",
    place: "Lake View",
    text: "Spacious villa with panoramic views and premium finishes.",
    link: "/contact",
  },
  {
    id: 4,
    title: "Duplex Home",
    image: imgDuplex,
    size: "1500 sqft",
    place: "Hillside",
    text: "Two-level prefab home designed for growing families.",
    link: "/contact",
  },
  {
    id: 5,
    title: "Garden Pavilion",
    image: imgPavilion,
    size: "500 sqft",
    place: "Garden View",
    text: "Open and airy pavilion for relaxing in natural surroundings.",
    link: "/contact",
  },
  {
    id: 6,
    title: "Pool Villa",
    image: imgPool,
    size: "2200 sqft",
    place: "Resort Area",
    text: "Luxury villa with a private pool and a spacious deck.",
    link: "/contact",
  },
];

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

const Homecottages = () => {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(homes.length - 1);

  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 1;
    return track.children[1].offsetLeft - track.children[0].offsetLeft || 1;
  }, []);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    const max = Math.max(
      0,
      Math.round((track.scrollWidth - track.clientWidth) / step)
    );
    setMaxIndex(max);
    const index = Math.round(track.scrollLeft / step);
    setActive(Math.min(Math.max(index, 0), max));
  }, [getStep]);

  useEffect(() => {
    updateState();
    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [updateState]);

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(index, 0), maxIndex);
    track.scrollTo({ left: clamped * getStep(), behavior: "smooth" });
  };

  return (
    <main className="hc-page">
      {/* ================= HERO ================= */}
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

            <div className="hc-hero-actions">
              <a href="#homes-cottages-cards" className="hc-hero-button">
                Explore Homes
                <span aria-hidden="true">→</span>
              </a>

              <a href="/contact" className="hc-hero-button hc-hero-button-outline">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="hc-featured" id="homes-cottages-cards">
        <div className="hc-featured-container">
          <div className="hc-featured-head">
            <div className="hc-featured-heading">
              <span className="hc-featured-eyebrow">POPULAR DESIGNS</span>
              <h2 className="hc-featured-title">Featured Homes &amp; Cottages</h2>
              <span className="hc-featured-line" aria-hidden="true"></span>
            </div>

            <p className="hc-featured-text">
              Explore our most loved designs, built with precision and
              designed to match your lifestyle.
            </p>
          </div>

          <div className="hc-carousel">
            <button
              type="button"
              className="hc-arrow hc-arrow-prev"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous designs"
            >
              ‹
            </button>

            <div className="hc-track" ref={trackRef} onScroll={updateState}>
              {homes.map((home) => (
                <article className="hc-card" key={home.id}>
                  <div className="hc-card-image">
                    <img src={home.image} alt={home.title} loading="lazy" />
                  </div>

                  <div className="hc-card-body">
                    <h3 className="hc-card-title">{home.title}</h3>

                    <div className="hc-card-meta">
                      <span>
                        <HomeIcon />
                        {home.size}
                      </span>
                      <i aria-hidden="true"></i>
                      <span>
                        <PinIcon />
                        {home.place}
                      </span>
                    </div>

                    <p className="hc-card-text">{home.text}</p>

                    <a href={home.link} className="hc-card-link">
                      View Details <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="hc-arrow hc-arrow-next"
              onClick={() => goTo(active + 1)}
              disabled={active >= maxIndex}
              aria-label="Next designs"
            >
              ›
            </button>
          </div>

          <div className="hc-dots" role="tablist" aria-label="Carousel pages">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                type="button"
                key={i}
                className={`hc-dot ${i === active ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to design ${i + 1}`}
                aria-selected={i === active}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homecottages;
