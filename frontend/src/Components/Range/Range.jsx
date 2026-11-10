
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Range.css";

// ============================================
// IMAGES
// ============================================

import imgAFrame from "../../assets/gal1.png";
import imgStudio from "../../assets/ran2.png";
import imgVilla from "../../assets/ran3.jpg";
import imgDuplex from "../../assets/ran4.png";
import imgPavilion from "../../assets/why5.png";
import imgPool from "../../assets/why1.png";

// ============================================
// AWS API GATEWAY
// ============================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/cottageadmin";

// ============================================
// FILTERS
// ============================================

const filters = [
  { id: "all", label: "All designs" },
  { id: "cottage", label: "Cottages" },
  { id: "villa", label: "Villas" },
  { id: "resort", label: "Resort" },
];

const categoryLabels = {
  cottage: "Cottage",
  villa: "Villa",
  resort: "Resort",
};

const categoryIcons = {
  cottage: "tree",
  villa: "home",
  resort: "building",
};

// ============================================
// DESIGN CARDS
// ============================================

const designs = [
  {
    code: "SC-01 · Night",
    category: "cottage",
    image: imgAFrame,
    title: "A-Frame Cottage",
    description:
      "Steel-framed A-frame with a full-height glass front, made for hills, lakes and forests.",
    size: "1 BHK · about 600 sq ft",
  },
  {
    code: "SC-02 · Hillside",
    category: "cottage",
    image: imgStudio,
    title: "Studio Cabin",
    description:
      "A compact one-room cabin for farms, glamping sites and garden retreats.",
    size: "Studio · about 300 sq ft",
  },
  {
    code: "SC-03 · Golden Hour",
    category: "villa",
    image: imgVilla,
    title: "Modular Villa",
    description:
      "Flat-roof modular villa with a glazed living wing and a floating upper volume.",
    size: "2–3 BHK · about 1,400 sq ft",
  },
  {
    code: "SC-04 · Daylight",
    category: "villa",
    image: imgDuplex,
    title: "Skyline Duplex",
    description:
      "Two storeys with a glazed upper floor, a balcony and a covered deck below.",
    size: "3 BHK · about 1,800 sq ft",
  },
  {
    code: "SC-05 · Hilltop",
    category: "resort",
    image: imgPavilion,
    title: "Resort Pavilion",
    description:
      "A deck-front guest suite with a sloping roof, built to repeat across a resort or homestay.",
    size: "Guest suite · about 450 sq ft",
  },
  {
    code: "SC-06 · Forest",
    category: "resort",
    image: imgPool,
    title: "Pool Villa",
    description:
      "A premium villa that opens onto its own plunge pool, for boutique hospitality.",
    size: "2 BHK · about 2,000 sq ft",
  },
];

// ============================================
// ICONS
// ============================================

function Icon({ name, size = 18 }) {
  let shapes = null;

  switch (name) {
    case "tree":
      shapes = (
        <>
          <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
          <path d="M12 22v-3" />
        </>
      );
      break;

    case "home":
      shapes = (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M10 21v-6h4v6" />
        </>
      );
      break;

    case "building":
      shapes = (
        <>
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
          <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 14h4" />
          <path d="M10 18h4" />
        </>
      );
      break;

    case "plan":
      shapes = (
        <>
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <path d="M10 4v6H4" />
        </>
      );
      break;

    case "arrow":
      shapes = (
        <>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </>
      );
      break;

    default:
      return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes}
    </svg>
  );
}

// ============================================
// RANGE COMPONENT
// ============================================

const Range = () => {
  const [filter, setFilter] = useState("all");

  // ABOUT COTTAGES CONTENT FROM AWS
  const [headerContent, setHeaderContent] = useState(null);

  // ==========================================
  // FETCH COTTAGE CONTENT FROM LAMBDA
  // ==========================================

  useEffect(() => {
    const fetchCottageContent = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Unable to fetch cottage content.");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Latest saved record
          setHeaderContent(data[0]);
        } else {
          setHeaderContent(null);
        }
      } catch (error) {
        console.error(
          "Error loading Home Cottages content:",
          error
        );
      }
    };

    fetchCottageContent();
  }, []);

  // ==========================================
  // FILTER DESIGNS
  // ==========================================

  const visibleDesigns =
    filter === "all"
      ? designs
      : designs.filter(
          (design) => design.category === filter
        );

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section className="sk-range" id="homes-cottages">

      <div className="sk-range__container">

        {/* ==================================
            HEADER - DYNAMIC FROM ADMIN
        ================================== */}

        <header className="sk-range__header">

          {headerContent?.name && (
            <div className="sk-range__eyebrow">
              <span className="sk-range__eyebrow-dot" />
              <span>{headerContent.name}</span>
            </div>
          )}

          {headerContent?.subtitle && (
            <h2 className="sk-range__title">
              {headerContent.subtitle}
            </h2>
          )}

          {headerContent?.subtitle && (
            <span className="sk-range__rule" />
          )}

          {headerContent?.description && (
            <p className="sk-range__hint">
              {headerContent.description}
            </p>
          )}

        </header>

        {/* ==================================
            FILTERS
        ================================== */}

        <div
          className="sk-range__filters"
          role="group"
          aria-label="Filter designs"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                "sk-range__filter" +
                (filter === item.id ? " is-active" : "")
              }
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ==================================
            DESIGN CARDS
        ================================== */}

        <div className="sk-range__grid" key={filter}>

          {visibleDesigns.map((design, index) => (
            <article
              className="sk-range__card"
              key={design.code}
              style={{ "--i": index }}
            >

              <div className="sk-range__media">

                <img
                  src={design.image}
                  alt={design.title}
                  className="sk-range__image"
                  loading="lazy"
                  decoding="async"
                />

                <span className="sk-range__code">
                  {design.code}
                </span>

                <span className="sk-range__type" aria-hidden="true">
                  <Icon
                    name={categoryIcons[design.category]}
                    size={20}
                  />
                </span>

              </div>

              <div className="sk-range__body">

                <span className="sk-range__tag">
                  {categoryLabels[design.category]}
                </span>

                <h3 className="sk-range__card-title">
                  {design.title}
                </h3>

                <p className="sk-range__card-text">
                  {design.description}
                </p>

                <div className="sk-range__size">
                  <Icon name="plan" size={16} />
                  <span>{design.size}</span>
                </div>

                <Link to="/homes-cottages" className="sk-range__link">
  <span>Request details</span>
  <Icon name="arrow" size={16} />
</Link>

              </div>

            </article>
          ))}

        </div>

        {/* ==================================
            NOTE
        ================================== */}

        <p className="sk-range__note">
          Illustrations are artist impressions. Sizes are indicative
          starting points, and final plans depend on your plot, local
          rules and finish level.
        </p>

      </div>
    </section>
  );
};

export default Range;
