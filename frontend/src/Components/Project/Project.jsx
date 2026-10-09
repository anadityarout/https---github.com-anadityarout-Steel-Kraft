import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Project.css";

// =====================================================
// IMPORT PROJECT IMAGES
// -----------------------------------------------------
// All your images stay imported for later use.
// The eslint comment below stops "unused import"
// warnings for the ones not shown right now.
// =====================================================

/* eslint-disable no-unused-vars */

import projectA from "../../assets/a.jpg.png";
import projectB from "../../assets/b.jpg.png";
import projectC from "../../assets/c.jpg.png";
import projectD from "../../assets/d.jpg.png";
import projectE from "../../assets/e.jpg.png";
import projectF from "../../assets/f.jpg.png";
import projectG from "../../assets/g.jpg.png";
import projectH from "../../assets/h.jpg.png";
import projectI from "../../assets/i.jpg.png";
import projectJ from "../../assets/j.jpg.png";
import Resort from "../../assets/Resort.png";
import projecth from "../../assets/h.png";
import projectk from "../../assets/k.png";
import Resort12 from "../../assets/Resort12.png";
import Resort16 from "../../assets/Resort16.png";
import Resort32 from "../../assets/Resort32.png";
import Resort34 from "../../assets/Resort34.png";
import Resort35 from "../../assets/Resort35.png";
import Resort39 from "../../assets/Resort39.png";
import Resort36 from "../../assets/Resort36.png";
import Resort30 from "../../assets/Resort30.png";
import Resort28 from "../../assets/Resort28.png";
import Resort5 from "../../assets/Resort5.png";
import Resort13 from "../../assets/Resort13.png";
import Resort21 from "../../assets/Resort21.png";
import Resort22 from "../../assets/Resort22.png";
import Resort23 from "../../assets/Resort23.png";
import Resort31 from "../../assets/Resort31.png";

/* eslint-enable no-unused-vars */

// New images for the 4 tabs
import pro1 from "../../assets/pro1.png";
import pro2 from "../../assets/pro2.png";
import pro3 from "../../assets/pro3.png";
import pro4 from "../../assets/pro4.png";

/* eslint-disable no-unused-vars */

// =====================================================
// OLD PROJECT LIST  (kept for later use, not shown now)
// =====================================================

const allProjects = [
  {
    id: 7,
    title: "Barn House 3BHK Cottage",
    location: "Noida",
    image: projectG,
  },
  {
    id: 8,
    title: "Chail Hamlet Resort",
    location: "Chail",
    image: projectH,
  },
  {
    id: 10,
    title: "A Frame 2BHK Villa",
    location: "Manali",
    image: projectI,
  },
  {
    id: 11,
    title: "Mountain Resort",
    location: "Himachal Pradesh",
    image: projectJ,
  },
  {
    id: 12,
    title: "Frame Resort Villas",
    location: "Coorg, Karnataka",
    image: Resort,
  },
  {
    id: 13,
    title: "Palm Grove Retreat",
    location: "Wayanad, Kerala",
    image: projecth,
  },
  {
    id: 14,
    title: "Aura Luxury Villas",
    location: "Jaipur, Rajasthan",
    image: projectk,
  },
  {
    id: 15,
    title: "Mountain View Villas",
    location: "Manali, Himachal Pradesh",
    image: Resort12,
  },
  {
    id: 16,
    title: "Beachfront Tropical Villa",
    location: "Goa",
    image: Resort16,
  },
  {
    id: 17,
    title: "The Valley Resort",
    location: "Lonavala, Maharashtra",
    image: Resort32,
  },
  {
    id: 18,
    title: "Ocean Breeze Resort",
    location: "Goa",
    image: Resort34,
  },
  {
    id: 19,
    title: "Ocean Pearl Resort",
    location: "Puri, Odisha",
    image: Resort35,
  },
  {
    id: 20,
    title: "Lakeside Palace Resort",
    location: "Udaipur, Rajasthan",
    image: Resort39,
  },
  {
    id: 21,
    title: "Oceanfront Palm Resort",
    location: "Goa",
    image: Resort36,
  },
  {
    id: 22,
    title: "Serene Garden Resort",
    location: "Jaipur, Rajasthan",
    image: Resort30,
  },
  {
    id: 23,
    title: "Hillview Garden Resort",
    location: "Mussoorie, Uttarakhand",
    image: Resort28,
  },
  {
    id: 24,
    title: "White Haven Villas",
    location: "Udaipur, Rajasthan",
    image: Resort5,
  },
  {
    id: 25,
    title: "Wildwood Luxury Resort",
    location: "Jim Corbett, Uttarakhand",
    image: Resort13,
  },
  {
    id: 26,
    title: "Lake Palace Retreat",
    location: "Udaipur, Rajasthan",
    image: Resort21,
  },
  {
    id: 27,
    title: "Palm Cove Resort",
    location: "Goa",
    image: Resort22,
  },
  {
    id: 28,
    title: "Serene Coconut Resort",
    location: "Alappuzha, Kerala",
    image: Resort23,
  },
  {
    id: 29,
    title: "Heritage Courtyard Resort",
    location: "Udaipur, Rajasthan",
    image: Resort31,
  },
];

/* eslint-enable no-unused-vars */

// =====================================================
// GALLERY ITEMS  (uses ALL your imported images)
// -----------------------------------------------------
// tag   = small line above the title
// title = bold caption
// Leave tag/title out to show the photo only.
// =====================================================

const galleryItems = [
  ...allProjects.map((p) => ({
    id: `project-${p.id}`,
    image: p.image,
    tag: p.location,
    title: p.title,
  })),
  { id: "photo-a", image: projectA },
  { id: "photo-b", image: projectB },
  { id: "photo-c", image: projectC },
  { id: "photo-d", image: projectD },
  { id: "photo-e", image: projectE },
  { id: "photo-f", image: projectF },
];

// =====================================================
// DATA  -  edit text / images here only
// -----------------------------------------------------
// icon options for chips: "layout" | "home" | "grid" | "star"
// =====================================================

const HANDOVER_STEPS = 5;

const categories = [
  {
    id: "resort",
    tab: "Resort & hospitality",
    tabNote: "Cottages, pavilions, pool villas",
    badge: "HOSPITALITY",
    title: "Resort & hospitality",
    description:
      "Cottages, pavilions and pool villas built as repeatable units for resorts and stays.",
    image: pro1,
    visualLabel: "Resort visual",
    chips: [
      { icon: "home", label: "Pool villas" },
      { icon: "grid", label: "Repeatable units" },
    ],
    deliver: [
      "Cottages, pavilions and pool villas",
      "Same unit built many times, same quality",
      "Fast on-site assembly with less disruption",
      "Finishes matched to your resort brand",
    ],
    designs: ["A-Frame Cottage", "Pool Villa"],
  },
  {
    id: "farmhouse",
    tab: "Farmhouses & second homes",
    tabNote: "Retreats on hills and farmland",
    badge: "RETREATS",
    title: "Farmhouses & second homes",
    description:
      "Comfortable weekend and holiday homes for hills, farmland and quiet plots.",
    image: pro2,
    visualLabel: "Farmhouse visual",
    chips: [
      { icon: "layout", label: "Open plans" },
      { icon: "star", label: "Hill-ready build" },
    ],
    deliver: [
      "Barn-style and cottage-style homes",
      "Built to suit slopes and remote plots",
      "Verandas, decks and open living spaces",
      "Low-maintenance materials",
    ],
    designs: ["Barn House 3BHK"],
  },
  {
    id: "villa",
    tab: "Residential villas",
    tabNote: "Family homes with big glazing",
    badge: "RESIDENTIAL",
    title: "Residential villas",
    description:
      "Family homes with large glazing, double heights and room to grow.",
    image: pro3,
    visualLabel: "Residential villa visual",
    chips: [
      { icon: "layout", label: "Double-height glazing" },
      { icon: "home", label: "Duplex options" },
    ],
    deliver: [
      "Open plans with large glazed openings",
      "Single-storey, double-height and duplex layouts",
      "Interiors and finishes chosen with you",
      "Quiet, clean assembly on your plot",
    ],
    designs: ["Modular Villa", "Skyline Duplex"],
  },
  {
    id: "cafe",
    tab: "Cafés & offices",
    tabNote: "Compact commercial spaces",
    badge: "COMMERCIAL",
    title: "Cafés & offices",
    description:
      "Compact commercial spaces that are quick to build and easy to customise.",
    image: pro4,
    visualLabel: "Commercial visual",
    chips: [
      { icon: "grid", label: "Compact layouts" },
      { icon: "star", label: "Quick build" },
    ],
    deliver: [
      "Cafés, studios and small offices",
      "Shopfront glazing and signage space",
      "Services planned for kitchens and desks",
      "Ready to open sooner",
    ],
    designs: ["Corner Café"],
  },
];

const totalDesigns = categories.reduce((sum, c) => sum + c.designs.length, 0);

// =====================================================
// SMALL ICON HELPER (no extra library needed)
// =====================================================

const Icon = ({ name, size = 18 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
  };

  switch (name) {
    case "layout":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "star":
      return (
        <svg {...props}>
          <polygon points="12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "arrowLeft":
      return (
        <svg {...props}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "expand":
      return (
        <svg {...props}>
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    default:
      return null;
  }
};

// =====================================================
// COMPONENT
// =====================================================

const Project = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const mounted = useRef(false);

  const current = categories[active];

  // On mobile the tabs scroll sideways: keep the active one in view.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  // Left / Right arrow keys move between tabs.
  const handleKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + categories.length) % categories.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // ---------- gallery: slider ----------
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollGallery = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // ---------- gallery: full-size viewer ----------
  const [lightbox, setLightbox] = useState(null);
  const lastFocused = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(0);
  const isOpen = lightbox !== null;
  const lightboxItem = isOpen ? galleryItems[lightbox] : null;

  const openLightbox = (index, event) => {
    lastFocused.current = event.currentTarget;
    setLightbox(index);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    lastFocused.current?.focus({ preventScroll: true });
  }, []);

  const stepLightbox = useCallback((dir) => {
    setLightbox((i) =>
      i === null ? i : (i + dir + galleryItems.length) % galleryItems.length
    );
  }, []);

  // Esc closes, arrow keys move, page scroll is locked while open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeLightbox, stepLightbox]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* ---------- HEADER (centered) ---------- */}
        <header className="projects-header">
          <span className="projects-label">Projects</span>

          <h2>Built for the places people live and stay</h2>

          <p className="projects-intro">
            We build private homes and hospitality sites where the same unit
            has to be built many times. Pick a project type to see what we
            deliver.
          </p>

          <ul className="projects-stats">
            <li className="stat-card">
              <strong>{categories.length}</strong>
              <span>project types</span>
            </li>
            <li className="stat-card">
              <strong>{totalDesigns}</strong>
              <span>starter designs</span>
            </li>
            <li className="stat-card">
              <strong>{HANDOVER_STEPS}</strong>
              <span>steps to handover</span>
            </li>
          </ul>
        </header>

        {/* ---------- TABS ---------- */}
        <div
          className="project-tabs"
          role="tablist"
          aria-label="Project types"
          onKeyDown={handleKeyDown}
        >
          {categories.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`project-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="project-panel"
                tabIndex={isActive ? 0 : -1}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`project-tab${isActive ? " is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                <img src={item.image} alt="" loading="lazy" />
                <span className="project-tab-text">
                  <strong>{item.tab}</strong>
                  <small>{item.tabNote}</small>
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- DETAIL PANEL ---------- */}
        <div
          className="project-panel"
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${current.id}`}
          key={current.id}
        >
          <div className="project-media">
            <img
              src={current.image}
              alt={`${current.title} project`}
              className="project-media-img"
            />

            <span className="project-chip project-chip-one">
              <span className="chip-icon">
                <Icon name={current.chips[0].icon} />
              </span>
              {current.chips[0].label}
            </span>

            <span className="project-chip project-chip-two">
              <span className="chip-icon">
                <Icon name={current.chips[1].icon} />
              </span>
              {current.chips[1].label}
            </span>

            <span className="project-visual-tag">{current.visualLabel}</span>
          </div>

          <div className="project-content">
            <span className="project-badge">{current.badge}</span>

            <h3>{current.title}</h3>
            <p className="project-description">{current.description}</p>

            <h4 className="project-subhead">What we deliver</h4>
            <ul className="project-deliver">
              {current.deliver.map((line) => (
                <li key={line}>
                  <span className="deliver-check">
                    <Icon name="check" size={12} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <h4 className="project-subhead">Starter designs</h4>
            <div className="project-designs">
              {current.designs.map((name) => (
                <a key={name} href="#designs" className="design-pill">
                  {name}
                  <Icon name="arrow" size={13} />
                </a>
              ))}
            </div>

            <div className="project-actions">
              <a href="#contact" className="btn-gold">
                Discuss this project
                <Icon name="arrow" size={15} />
              </a>
              <a href="#designs" className="btn-outline">
                See all designs
              </a>
            </div>
          </div>
        </div>

        {/* ---------- PROJECT GALLERY ---------- */}
        <div className="pgal">
          <div className="pgal-head">
            <div className="pgal-head-text">
              <h3 className="pgal-title">Project gallery</h3>
              <p>
                Cabins, villas and interiors. Swipe, or open any image to view
                it larger.
              </p>
            </div>

            <div className="pgal-arrows">
              <button
                type="button"
                className="pgal-arrow"
                onClick={() => scrollGallery(-1)}
                disabled={!canPrev}
                aria-label="Previous images"
              >
                <Icon name="arrowLeft" size={18} />
              </button>
              <button
                type="button"
                className="pgal-arrow"
                onClick={() => scrollGallery(1)}
                disabled={!canNext}
                aria-label="Next images"
              >
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>

          <div
            className="pgal-track"
            ref={trackRef}
            onScroll={updateScrollState}
          >
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="pgal-card"
                onClick={(e) => openLightbox(index, e)}
                aria-label={
                  item.title
                    ? `View larger: ${item.title}`
                    : `View larger: project photo ${index + 1}`
                }
              >
                <img src={item.image} alt="" loading="lazy" decoding="async" />
                <span className="pgal-shade" />
                <span className="pgal-expand">
                  <Icon name="expand" size={15} />
                </span>

                {item.title && (
                  <span className="pgal-caption">
                    <span className="pgal-tag">{item.tag}</span>
                    <span className="pgal-name">{item.title}</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- QUOTE BANNER ---------- */}
        <div className="pcta">
          <div className="pcta-text">
            <h3 className="pcta-title">
              Planning a resort, or a series of units?
            </h3>
            <p>
              Share the location and how many units you have in mind. We will
              tell you what fits and how fast it can be built.
            </p>
          </div>

          <a href="#contact" className="pcta-btn">
            Get a Quote
            <Icon name="arrow" size={15} />
          </a>
        </div>
      </div>

      {/* ---------- FULL-SIZE VIEWER ---------- */}
      {lightboxItem &&
        createPortal(
          <div
            className="pgal-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              ref={closeRef}
              className="pgal-lightbox-btn pgal-lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close image"
            >
              <Icon name="close" size={20} />
            </button>

            <button
              type="button"
              className="pgal-lightbox-btn pgal-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(-1);
              }}
              aria-label="Previous image"
            >
              <Icon name="arrowLeft" size={20} />
            </button>

            <figure
              className="pgal-lightbox-figure"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title || "Project photo"}
              />
              {lightboxItem.title && (
                <figcaption>
                  <strong>{lightboxItem.title}</strong>
                  <span>{lightboxItem.tag}</span>
                </figcaption>
              )}
            </figure>

            <button
              type="button"
              className="pgal-lightbox-btn pgal-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                stepLightbox(1);
              }}
              aria-label="Next image"
            >
              <Icon name="arrow" size={20} />
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Project;
