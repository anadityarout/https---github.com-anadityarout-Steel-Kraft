import React, { useState } from "react";
import "./WhyChooseBar.css";

/* =========================================================
   IMAGES  -  CHANGE THESE 6 LINES ONLY

   1. Copy your 6 pictures into the  src/assets  folder.
   2. Replace the file name inside the quotes with your own
      file name (keep the "../../assets/" part).

   Right now they all point to home.jpg / home1.jpg so the
   page works straight away. Swap them for your real pictures.
========================================================= */
import imgFaster from "../../assets/why1.png";        // 1. Faster to build
import imgPrecision from "../../assets/why2.png";    // 2. Precision-made
import imgDurable from "../../assets/why3.png";       // 3. Strong and durable
import imgSustainable from "../../assets/why4.png";  // 4. More sustainable
import imgCustom from "../../assets/why5.png";        // 5. Fully customisable
import imgLight from "../../assets/why6.png";        // 6. Light on the site

/* =========================================================
   CONTENT
   Change the text here, the layout updates by itself.
========================================================= */
const benefits = [
  {
    label: "Faster to build",
    icon: "clock",
    image: imgFaster,
    title: "Faster to build",
    description:
      "Frames and panels are made in the factory while your plot is prepared, so work runs in parallel instead of in a queue.",
    points: [
      "Foundation and frame are made at the same time",
      "Shorter, quieter assembly on site",
      "Fewer weather delays",
    ],
  },
  {
    label: "Precision-made",
    icon: "ruler",
    image: imgPrecision,
    title: "Precision-made",
    description:
      "Factory tolerances give straighter walls, tighter joints and a finish that does not change from one site to the next.",
    points: [
      "Cut and joined to factory tolerances",
      "Repeatable quality across many units",
      "Fewer corrections on site",
    ],
  },
  {
    label: "Strong and durable",
    icon: "shield",
    image: imgDurable,
    title: "Strong and durable",
    description:
      "Steel does not rot or feed termites, and each frame is engineered for the wind, rain and seismic loads at its location.",
    points: [
      "Resists termites, rot and mould",
      "Engineered for local wind and seismic loads",
      "Protective coatings for monsoon and heat",
    ],
  },
  {
    label: "More sustainable",
    icon: "leaf",
    image: imgSustainable,
    title: "More sustainable",
    description:
      "Factory production keeps material waste low, and a steel frame can be recycled at the end of a building's life.",
    points: [
      "Less offcut waste than building from scratch on site",
      "Recyclable steel frame",
      "Smaller footprint on your plot",
    ],
  },
  {
    label: "Fully customisable",
    icon: "layout",
    image: imgCustom,
    title: "Fully customisable",
    description:
      "Layouts, sizes and finishes are planned around your plot and the way you want to live or host guests.",
    points: [
      "Choose the layout and size",
      "Pick finishes and cladding",
      "Add rooms or levels later",
    ],
  },
  {
    label: "Light on the site",
    icon: "arch",
    image: imgLight,
    title: "Light on the site",
    description:
      "Bolted frames sit on compact foundations, so your plot and its surroundings are disturbed far less.",
    points: [
      "Compact foundations",
      "Less heavy machinery on site",
      "Trees and terrain left more intact",
    ],
  },
];

/* =========================================================
   ICONS (inline SVG, no extra package needed)
========================================================= */
function Icon({ name, size = 22, strokeWidth = 2 }) {
  let shapes = null;

  switch (name) {
    case "clock":
      shapes = (
        <>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </>
      );
      break;

    case "ruler":
      shapes = (
        <>
          <path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z" />
          <path d="m7.5 10.5 2 2" />
          <path d="m10.5 7.5 2 2" />
          <path d="m13.5 4.5 2 2" />
          <path d="m4.5 13.5 2 2" />
        </>
      );
      break;

    case "shield":
      shapes = (
        <>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <polyline points="9 12 11 14 15 10" />
        </>
      );
      break;

    case "leaf":
      shapes = (
        <>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </>
      );
      break;

    case "layout":
      shapes = (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </>
      );
      break;

    case "arch":
      shapes = (
        <>
          <path d="M5 21v-9a7 7 0 0 1 14 0v9" />
          <path d="M9 21v-5h6v5" />
        </>
      );
      break;

    case "check":
      shapes = <polyline points="5 12.5 10 17.5 19 7.5" />;
      break;

    case "plus":
      shapes = (
        <>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
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
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes}
    </svg>
  );
}

/* =========================================================
   COMPONENT
========================================================= */
const WhyChooseBar = () => {
  const [active, setActive] = useState(0);

  const current = benefits[active];

  return (
    <section className="sk-why" id="why-prefab-steel">
      <div className="sk-why__container">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="sk-why__header">

          <div className="sk-why__eyebrow">
            <span className="sk-why__eyebrow-dot" />
            <span>WHY PREFAB STEEL</span>
          </div>

          <h2 className="sk-why__title">
            A better frame for the way you want to build
          </h2>

          <span className="sk-why__rule" />

          <p className="sk-why__hint">
            Hover or tap a benefit to see what it means for your project.
          </p>

        </header>

        {/* =====================================================
            LIST (left) + CARD (right)
        ===================================================== */}
        <div className="sk-why__layout">

          {/* ---------- BENEFIT LIST ---------- */}
          <div
            className="sk-why__list"
            role="tablist"
            aria-label="Benefits of prefab steel"
          >
            {benefits.map((benefit, index) => (
              <button
                key={benefit.label}
                type="button"
                role="tab"
                id={`sk-why-tab-${index}`}
                aria-selected={index === active}
                aria-controls="sk-why-panel"
                className={
                  "sk-why__item" +
                  (index === active ? " is-active" : "")
                }
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="sk-why__item-icon">
                  <Icon name={benefit.icon} size={20} />
                </span>

                <span className="sk-why__item-label">{benefit.label}</span>
              </button>
            ))}
          </div>

          {/* ---------- DETAIL CARD ---------- */}
          <div
            className="sk-why__card"
            role="tabpanel"
            id="sk-why-panel"
            aria-labelledby={`sk-why-tab-${active}`}
          >

            {/* IMAGE AREA */}
            <div className="sk-why__media">

              {benefits.map((benefit, index) => (
                <img
                  key={benefit.label}
                  className={
                    "sk-why__media-img" +
                    (index === active ? " is-active" : "")
                  }
                  src={benefit.image}
                  alt={index === active ? benefit.title : ""}
                  aria-hidden={index === active ? undefined : "true"}
                  decoding="async"
                />
              ))}

              <div className="sk-why__media-shade" />

              {/* floating decorations */}
              <span className="sk-why__float sk-why__float--a" aria-hidden="true">
                <Icon name="check" size={18} strokeWidth={2.4} />
              </span>

              <span className="sk-why__float sk-why__float--b" aria-hidden="true">
                <Icon name="plus" size={16} strokeWidth={2.4} />
              </span>

              <span className="sk-why__float sk-why__float--c" aria-hidden="true">
                <Icon name="check" size={18} strokeWidth={2.4} />
              </span>

              {/* big icon tile in the middle */}
              <div className="sk-why__badge" aria-hidden="true">
                <span className="sk-why__badge-ring" />
                <span className="sk-why__badge-tile" key={active}>
                  <Icon name={current.icon} size={44} strokeWidth={1.8} />
                </span>
              </div>

            </div>

            {/* TEXT AREA (re-animates on every change) */}
            <div className="sk-why__body" key={active}>
              <h3 className="sk-why__card-title">{current.title}</h3>

              <p className="sk-why__card-text">{current.description}</p>

              <ul className="sk-why__points">
                {current.points.map((point) => (
                  <li key={point}>
                    <span className="sk-why__point-icon">
                      <Icon name="check" size={16} strokeWidth={2.2} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseBar;
