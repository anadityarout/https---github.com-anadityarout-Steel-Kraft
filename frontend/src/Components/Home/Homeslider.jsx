import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./HomeSlider.css";
import homeImage from "../../assets/home.jpg";
import home1Image from "../../assets/home1.jpg";

// -----------------------------------------------------
// OPTIONAL (recommended): small WebP versions for phones.
// 1) Create 800px-wide WebP files and put them in /assets
// 2) Uncomment these two imports
// 3) Uncomment the `mobileImage` lines in `slides` below
// -----------------------------------------------------
// import homeMobile from "../../assets/home-mobile.webp";
// import home1Mobile from "../../assets/home1-mobile.webp";

const BANNER_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner";

const CACHE_KEY = "steelkraft_home_banner";

// Fallback heading so the <h1> is ALWAYS present (SEO).
// The Admin Dashboard text replaces it once loaded.
const FALLBACK_HEADING =
  "Premium Prefab Homes, Modular Villas & Resort Cottages";

// Banner content comes from Admin Dashboard.
const DEFAULT_BANNER = {
  name: FALLBACK_HEADING,
  subtitle: "",
  description: "",
};

// Read previously saved banner content.
// localStorage (not sessionStorage) so returning visitors get it instantly.
function readCachedBanner() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (!raw) return DEFAULT_BANNER;

    const parsed = JSON.parse(raw);

    return {
      name: parsed.name || FALLBACK_HEADING,
      subtitle: parsed.subtitle || "",
      description: parsed.description || "",
    };
  } catch {
    return DEFAULT_BANNER;
  }
}

// Banner slides
const slides = [
  {
    image: homeImage,
    // mobileImage: homeMobile,
    alt: "Modern prefabricated villa beside a pool at sunset",
    caption: "Poolside Prefab Villa",
  },
  {
    image: home1Image,
    // mobileImage: home1Mobile,
    alt: "Luxury lakeside resort villa",
    caption: "Lakeside Resort Villa",
  },
];

// Floating glass chips
const chips = [
  {
    label: "Faster build",
    icon: "clock",
    text: "Frames are made in the factory while your plot is prepared.",
  },
  {
    label: "Built to last",
    icon: "shield",
    text: "Steel resists termites, rot and mould.",
  },
  {
    label: "Sustainable",
    icon: "leaf",
    text: "Recyclable steel and less site waste.",
  },
  {
    label: "Customisable",
    icon: "layout",
    text: "Layouts, glazing and finishes made to fit you.",
  },
];

// Feature row
const features = [
  { label: "Steel-framed", icon: "ruler" },
  { label: "Factory-finished", icon: "factory" },
  { label: "Delivered across India", icon: "truck" },
];

// Bottom scrolling strip
const marqueeItems = [
  "Across India",
  "Prefab Homes",
  "Modular Villas",
  "Resort Cottages",
  "Steel Frames",
  "Factory-Finished",
  "Delivered Across India",
];

// SVG component
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

// Icons
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

// Split heading to preserve the gold accent styling.
function renderHeading(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);

  const normal = words.slice(0, -3).join(" ");
  const accent = words.slice(-3).join(" ");

  return (
    <>
      {normal && `${normal} `}
      <span className="home-slider__heading-accent">{accent}</span>
    </>
  );
}

// =====================================================
// HOME SLIDER COMPONENT
// =====================================================

export default function HomeSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // PERFORMANCE: only slide 1 loads at first. The other slides are
  // added after the page has finished loading (or when the visitor
  // uses the arrows / dots), so they never compete with the first image.
  const [loadRest, setLoadRest] = useState(false);

  // Load cached banner content initially.
  const [bannerContent, setBannerContent] = useState(readCachedBanner);

  // ---------------------------------------------------
  // Allow the remaining slides + autoplay after page load
  // ---------------------------------------------------
  useEffect(() => {
    let timer;

    const start = () => {
      timer = setTimeout(() => setLoadRest(true), 600);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    // Safety net in case the load event is very late.
    const safety = setTimeout(() => setLoadRest(true), 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safety);
      window.removeEventListener("load", start);
    };
  }, []);

  // ---------------------------------------------------
  // Fetch latest banner content from Admin Dashboard
  // (small delay so it never competes with the hero image)
  // ---------------------------------------------------
  useEffect(() => {
    const controller = new AbortController();

    const fetchBannerContent = async () => {
      try {
        const response = await fetch(BANNER_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          return;
        }

        const latestBanner = data[data.length - 1];

        const next = {
          // Keep the fallback if admin name is empty.
          name: String(latestBanner.name || "").trim() || FALLBACK_HEADING,
          subtitle: String(latestBanner.subtitle || "").trim(),
          description: String(latestBanner.description || "").trim(),
        };

        // Only update the screen if something actually changed
        // (avoids a needless re-render / layout shift).
        setBannerContent((current) =>
          current.name === next.name &&
          current.subtitle === next.subtitle &&
          current.description === next.description
            ? current
            : next
        );

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage errors.
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load banner content:", error);
        }
      }
    };

    const timer = setTimeout(fetchBannerContent, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  // Floating chip state.
  const [openChip, setOpenChip] = useState(null);

  // Close chip when clicking outside.
  useEffect(() => {
    if (openChip === null) return undefined;

    const closeOnOutside = (e) => {
      if (!e.target.closest(".home-slider__chip")) {
        setOpenChip(null);
      }
    };

    document.addEventListener("pointerdown", closeOnOutside);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
    };
  }, [openChip]);

  // Detect hover support.
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  const total = slides.length;

  // Any manual navigation makes sure the other slides are loaded.
  const goToNext = useCallback(() => {
    setLoadRest(true);
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = () => {
    setLoadRest(true);
    setActive((prev) => (prev - 1 + total) % total);
  };

  const goTo = (index) => {
    setLoadRest(true);
    setActive(index);
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      className={
        "home-slider" +
        (paused ? " is-paused" : "") +
        (loadRest ? " is-ready" : "")
      }
      aria-roledescription="carousel"
      aria-label="Steel Kraft featured homes"
    >
      <div className="home-slider__stage">
        {/* SLIDER IMAGES */}
        {slides.map((slide, index) => {
          // Slide 2+ are not rendered until the page has loaded.
          if (index > 0 && !loadRest) return null;

          const isFirst = index === 0;

          const img = (
            <img
              className={
                "home-slider__image" +
                (index === active ? " is-active" : "")
              }
              src={slide.image}
              alt={slide.alt}
              width="1600"
              height="900"
              decoding={isFirst ? "sync" : "async"}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              aria-hidden={index === active ? undefined : "true"}
            />
          );

          // If a small mobile image is provided, phones download that one.
          if (slide.mobileImage) {
            return (
              <picture key={index}>
                <source
                  media="(max-width: 700px)"
                  srcSet={slide.mobileImage}
                />
                {img}
              </picture>
            );
          }

          return React.cloneElement(img, { key: index });
        })}

        {/* DARK GRADIENT */}
        <div className="home-slider__overlay" />

        {/* FLOATING GLASS CHIPS */}
        <div className="home-slider__floats">
          {chips.map((chip, index) => {
            const isOpen = openChip === index;

            return (
              <button
                key={chip.label}
                type="button"
                className={
                  `home-slider__chip home-slider__chip--${index + 1}` +
                  (isOpen ? " is-open" : "")
                }
                aria-expanded={isOpen}
                onPointerEnter={(e) =>
                  e.pointerType === "mouse" && setOpenChip(index)
                }
                onPointerLeave={(e) =>
                  e.pointerType === "mouse" &&
                  setOpenChip((current) =>
                    current === index ? null : current
                  )
                }
                onClick={() => {
                  if (!canHover()) {
                    setOpenChip((current) =>
                      current === index ? null : index
                    );
                  }
                }}
                onFocus={(e) =>
                  e.currentTarget.matches(":focus-visible") &&
                  setOpenChip(index)
                }
                onBlur={() =>
                  setOpenChip((current) =>
                    current === index ? null : current
                  )
                }
              >
                <span className="home-slider__chip-icon">
                  <Icon name={chip.icon} size={20} />
                </span>

                <span className="home-slider__chip-text">
                  <span className="home-slider__chip-label">
                    {chip.label}
                  </span>

                  <span className="home-slider__chip-desc">
                    <span className="home-slider__chip-desc-inner">
                      {chip.text}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* MAIN CONTENT */}
        <div className="home-slider__content">
          <div className="home-slider__eyebrow">
            <span className="home-slider__eyebrow-dot" />
            <span>MODERN | SUSTAINABLE | PREFABRICATED</span>
          </div>

          {/* H1: ALWAYS RENDERED. Fallback text first, Admin Dashboard text once loaded. */}
          <h1 className="home-slider__heading">
            {renderHeading(bannerContent.name || FALLBACK_HEADING)}
          </h1>

          {/* H2: SUBTITLE FROM ADMIN DASHBOARD */}
          {bannerContent.subtitle && (
            <h2 className="home-slider__subheading">
              {bannerContent.subtitle}
            </h2>
          )}

          {/* DESCRIPTION FROM ADMIN DASHBOARD */}
          {bannerContent.description && (
            <p className="home-slider__body">
              {bannerContent.description}
            </p>
          )}

          {/* BUTTONS */}
          <div className="home-slider__actions">
            <Link
              to="/homes-cottages"
              className="home-slider__btn home-slider__btn--light"
            >
              <span>Explore Our Designs</span>

              <span className="home-slider__btn-arrow">
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>

            <button
              type="button"
              className="home-slider__btn home-slider__btn--gold"
              onClick={() => {
                window.dispatchEvent(new Event("open-quote-popup"));
              }}
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

          {/* SLIDER CONTROLS */}
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
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === active ? "true" : undefined}
                  >
                    <span className="home-slider__seg-track">
                      <span
                        key={
                          index === active ? `a-${active}` : `i-${index}`
                        }
                        className="home-slider__seg-fill"
                        onAnimationEnd={
                          index === active ? goToNext : undefined
                        }
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

        {/* COUNTER + CAPTION */}
        <div className="home-slider__caption" aria-live="polite">
          <span className="home-slider__caption-count">
            {pad(active + 1)} / {pad(total)}
          </span>

          <span className="home-slider__caption-text">
            {slides[active].caption}
          </span>
        </div>
      </div>

      {/* BOTTOM SCROLLING STRIP */}
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
