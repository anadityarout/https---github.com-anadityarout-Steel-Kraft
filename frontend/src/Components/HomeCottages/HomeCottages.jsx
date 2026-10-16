import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import "./Homecottages.css";

import homesCottagesBanner from "../../assets/homescottagesbanner.jpg";

import imgAFrame from "../../assets/gal1.png";
import imgStudio from "../../assets/ran2.png";
import imgVilla from "../../assets/ran3.jpg";
import imgDuplex from "../../assets/ran4.png";
import imgPavilion from "../../assets/why5.png";
import imgPool from "../../assets/why1.png";

// ==========================================
// COTTAGES API
// ==========================================

const COTTAGES_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/cottages";

// ==========================================
// FEATURED COTTAGE CARDS
// Existing local images and content preserved
// ==========================================

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

// ==========================================
// HOME ICON
// ==========================================

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-5h4v5" />
  </svg>
);

// ==========================================
// LOCATION ICON
// ==========================================

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

const Homecottages = () => {
  // ========================================
  // CAROUSEL STATE
  // ========================================

  const trackRef = useRef(null);

  const [active, setActive] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // ========================================
  // HERO CONTENT FROM ADMIN DASHBOARD
  // ========================================

  const [heroContent, setHeroContent] = useState({
    name: "",
    subtitle: "",
    description: "",
  });

  const [heroLoading, setHeroLoading] = useState(true);
  const [heroError, setHeroError] = useState(false);

  // ========================================
  // FETCH COTTAGE CONTENT FROM API
  // ========================================

  useEffect(() => {
    const controller = new AbortController();

    const fetchCottageContent = async () => {
      try {
        setHeroLoading(true);
        setHeroError(false);

        const response = await fetch(COTTAGES_API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Cottages API failed with status ${response.status}`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid cottages API response.");
        }

        // Use the latest saved entry from the admin dashboard.
        const latestItem =
          data.length > 0 ? data[data.length - 1] : null;

        setHeroContent({
          name: latestItem?.name || "",
          subtitle: latestItem?.subtitle || "",
          description: latestItem?.description || "",
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Unable to fetch Home & Cottage content:",
            error
          );

          setHeroError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setHeroLoading(false);
        }
      }
    };

    fetchCottageContent();

    return () => {
      controller.abort();
    };
  }, []);

  // ========================================
  // CAROUSEL STEP
  // ========================================

  const getStep = useCallback(() => {
    const track = trackRef.current;

    if (!track || track.children.length < 2) {
      return 1;
    }

    return (
      track.children[1].offsetLeft -
        track.children[0].offsetLeft || 1
    );
  }, []);

  // ========================================
  // UPDATE CAROUSEL POSITION
  // ========================================

  const updateState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const step = getStep();

    const max = Math.max(
      0,
      Math.round(
        (track.scrollWidth - track.clientWidth) / step
      )
    );

    const index = Math.round(track.scrollLeft / step);

    setMaxIndex(max);
    setActive(Math.min(Math.max(index, 0), max));
  }, [getStep]);

  // ========================================
  // RESIZE LISTENER
  // ========================================

  useEffect(() => {
    updateState();

    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  // ========================================
  // CAROUSEL NAVIGATION
  // ========================================

  const goTo = (index) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const clamped = Math.min(
      Math.max(index, 0),
      maxIndex
    );

    track.scrollTo({
      left: clamped * getStep(),
      behavior: "smooth",
    });
  };

  // ========================================
  // DYNAMIC HERO HEADING
  // The last word is highlighted yellow.
  // The entire heading comes from the API.
  // ========================================

  const renderHeroHeading = (name) => {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 0) {
      return null;
    }

    if (words.length === 1) {
      return (
        <span className="hc-title-accent">
          {words[0]}
        </span>
      );
    }

    return (
      <>
        <span>{words.slice(0, -1).join(" ")} </span>
        <span className="hc-title-accent">
          {words[words.length - 1]}
        </span>
      </>
    );
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="hc-page">
      {/* ==================================
          HERO BANNER
      ================================== */}

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
              MODERN <span>|</span> SUSTAINABLE{" "}
              <span>|</span> PREFABRICATED
            </span>

            {/* CONTENT FROM ADMIN DASHBOARD */}

            {heroLoading && (
              <p
                className="hc-hero-description"
                aria-live="polite"
              >
                Loading content...
              </p>
            )}

            {heroError && (
              <p className="hc-hero-description" role="status">
                Unable to load Home & Cottage content.
              </p>
            )}

            {!heroLoading && !heroError && (
              <>
                {heroContent.name && (
                  <h1 className="hc-hero-title">
                    {renderHeroHeading(heroContent.name)}
                  </h1>
                )}

                {heroContent.subtitle && (
                  <h2 className="hc-hero-subtitle">
                    {heroContent.subtitle}
                  </h2>
                )}

                {heroContent.description && (
                  <p className="hc-hero-description">
                    {heroContent.description}
                  </p>
                )}
              </>
            )}

            {/* EXISTING BUTTONS PRESERVED */}

            <div className="hc-hero-actions">
              <a
                href="#homes-cottages-cards"
                className="hc-hero-button"
              >
                Explore Homes
                <span aria-hidden="true">→</span>
              </a>

              <a
                href="/contact"
                className="hc-hero-button hc-hero-button-outline"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          FEATURED HOMES & COTTAGES
      ================================== */}

      <section
        className="hc-featured"
        id="homes-cottages-cards"
      >
        <div className="hc-featured-container">
          <div className="hc-featured-head">
            <div className="hc-featured-heading">
              <span className="hc-featured-eyebrow">
                POPULAR DESIGNS
              </span>

              
              <span
                className="hc-featured-line"
                aria-hidden="true"
              ></span>
            </div>

            
          </div>

          {/* COTTAGE CAROUSEL */}

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

            <div
              className="hc-track"
              ref={trackRef}
              onScroll={updateState}
            >
              {homes.map((home) => (
                <article
                  className="hc-card"
                  key={home.id}
                >
                  <div className="hc-card-image">
                    <img
                      src={home.image}
                      alt={home.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="hc-card-body">
                    <h3 className="hc-card-title">
                      {home.title}
                    </h3>

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

                    <p className="hc-card-text">
                      {home.text}
                    </p>

                    <a
                      href={home.link}
                      className="hc-card-link"
                    >
                      View Details{" "}
                      <span aria-hidden="true">→</span>
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

          {/* CAROUSEL DOTS */}

          <div
            className="hc-dots"
            role="tablist"
            aria-label="Carousel pages"
          >
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                type="button"
                key={index}
                className={`hc-dot ${
                  index === active ? "is-active" : ""
                }`}
                onClick={() => goTo(index)}
                aria-label={`Go to design ${index + 1}`}
                aria-selected={index === active}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homecottages;