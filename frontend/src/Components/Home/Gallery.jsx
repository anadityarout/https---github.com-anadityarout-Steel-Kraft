import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./Gallery.css";

// =====================================================
// IMPORT IMAGES
// -----------------------------------------------------
// Put your new pictures in /assets and import them here,
// e.g.  import foundation from "../../assets/foundation.png";
// (These few reuse images you already have, so the
//  gallery works right away.)
// =====================================================

import gal1 from "../../assets/gal1.png";
import why1 from "../../assets/why1.png";
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
import Galres from "../../assets/Galres.png";
import why3 from "../../assets/why3.png";
import productDistribution from "../../assets/product-distribution.png";
import buildingConfiguration from "../../assets/building-configuration.png";
import galmou from "../../assets/galmou.png";

// =====================================================
// FILTER BUTTONS
// -----------------------------------------------------
// id must match the names used in `cats` below.
// A button is hidden automatically while it has no photos,
// and its number is counted for you.
// =====================================================

const FILTERS = [
  { id: "all", label: "All" },
  { id: "construction", label: "Under construction" },
  { id: "cottages", label: "Completed cottages" },
  { id: "villas", label: "Villas" },
  { id: "resorts", label: "Resorts" },
  { id: "mountain", label: "Mountain stays" },
];

// =====================================================
// PHOTOS  -  add / edit your pictures here only
// -----------------------------------------------------
// image : the imported picture
// title : bold caption on the card
// place : optional, shown in the enlarged view
// tag   : small label above the title
// cats  : which filter buttons it belongs to (one or more)
//         use "construction" for build-stage photos
// size  : "short" | "medium" | "tall"   (optional - card
//         height in the masonry; mixed sizes look best)
// =====================================================

const photos = [
  {
    id: 1,
    image: gal1,
    title: "A-frame cottage glowing at night",
    place: "Noida",
    tag: "Mountain Resort",
    cats: ["mountain"],
    size: "tall",
  },
  {
    id: 2,
    image: Galres,
    title: "Terraced hillside resort master plan",
    place: "Chail",
    tag: "Resort Visual",
    cats: ["resorts"],
    size: "short",
  },
  {
    id: 3,
    image: projectI,
    title: "A Frame 2BHK Villa",
    place: "Manali",
    tag: "Villa",
    cats: ["villas" ],
    size: "medium",
  },
  {
    id: 4,
    image: projectJ,
    title: "Mountain Resort",
    place: "Himachal Pradesh",
    tag: "Mountain stay",
    cats: ["resorts"],
    size: "medium",
  },
  {
    id: 5,
    image: Resort,
    title: "Frame Resort Villas",
    place: "Coorg, Karnataka",
    tag: "Resort",
    cats: ["resorts"],
    size: "short",
  },
  {
    id: 6,
    image: projecth,
    title: "Palm Grove Retreat",
    place: "Wayanad, Kerala",
    tag: "Resort",
    cats: ["resorts"],
    size: "tall",
  },
  {
    id: 7,
    image: projectk,
    title: "Aura Luxury Villas",
    place: "Jaipur, Rajasthan",
    tag: "Villa",
    cats: ["villas"],
    size: "medium",
  },
  {
    id: 8,
    image: Resort12,
    title: "Mountain View Villas",
    place: "Manali, Himachal Pradesh",
    tag: "Villa",
    cats: ["villas", "mountain"],
    size: "short",
  },
  {
    id: 9,
    image: Resort16,
    title: "Beachfront Tropical Villa",
    place: "Goa",
    tag: "Villa",
    cats: ["villas"],
    size: "medium",
  },
  {
    id: 10,
    image: Resort32,
    title: "The Valley Resort",
    place: "Lonavala, Maharashtra",
    tag: "Resort",
    cats: ["resorts"],
    size: "tall",
  },
  {
    id: 11,
    image: Resort34,
    title: "Ocean Breeze Resort",
    place: "Goa",
    tag: "Resort",
    cats: ["resorts"],
    size: "short",
  },
  {
    id: 12,
    image: Resort35,
    title: "Ocean Pearl Resort",
    place: "Puri, Odisha",
    tag: "Resort",
    cats: ["resorts"],
    size: "medium",
  },

  
  // UNDER CONSTRUCTION PROJECTS

  {
    id: 13,
    image: productDistribution,
    title: "Product Distribution",
    place: "Steel Kraft Prefab",
    tag: "Under Construction",
    cats: ["construction"],
    size: "medium",
  },
  {
    id: 14,
    image: buildingConfiguration,
    title: "Building Configuration",
    place: "Steel Kraft Prefab",
    tag: "Under Construction",
    cats: ["construction"],
    size: "medium",
  },
  {
    id: 15,
    image: galmou,
    title: "Two-storey stay with a fire pit",
    place: "Himachal Pradesh",
    tag: "Mountain Resort",
    cats: ["mountain"],
    size: "short",
  },
  {
    id: 16,
    image: why3,
    title: "A-frame cottage in fresh snow",
    place: "Himachal Pradesh",
    tag: "Mountain Stay",
    cats:["mountain"],
    size: "tall",
  },
  


  // ---- example of an under-construction photo (remove the // to use) ----
  // {
  //   id: 13,
  //   image: foundation,
  //   title: "Foundation and anchor bolts set",
  //   tag: "Build stage",
  //   cats: ["construction"],
  //   size: "medium",
  // },
];

// =====================================================
// LAYOUT HELPERS
// =====================================================

// height of a card compared with its width
const SIZE_RATIO = { short: 0.68, medium: 0.9, tall: 1.3 };

// used when a photo has no `size`
const AUTO_SIZES = ["medium", "short", "tall", "tall", "medium", "short"];

// 3 columns on desktop, 2 on tablet, 1 on phones
const getColumns = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 980) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
};

const useColumns = () => {
  const [cols, setCols] = useState(getColumns);

  useEffect(() => {
    const onResize = () => setCols(getColumns());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cols;
};

// Each photo goes into the currently shortest column (masonry).
const buildColumns = (items, count) => {
  const columns = Array.from({ length: count }, () => ({
    height: 0,
    items: [],
  }));

  items.forEach((item) => {
    const target = columns.reduce((best, col) =>
      col.height < best.height - 0.001 ? col : best
    );
    target.items.push(item);
    target.height += item.shown + 0.04;
  });

  return columns.map((col) => col.items);
};

// =====================================================
// SMALL ICON HELPER
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
    default:
      return null;
  }
};

// =====================================================
// COMPONENT
// =====================================================

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const cols = useColumns();

  // ---------- data ----------
  const prepared = useMemo(
    () =>
      photos.map((photo, i) => ({
        ...photo,
        ratio: SIZE_RATIO[photo.size || AUTO_SIZES[i % AUTO_SIZES.length]],
      })),
    []
  );

  const filters = useMemo(
    () =>
      FILTERS.map((f) => ({
        ...f,
        count:
          f.id === "all"
            ? prepared.length
            : prepared.filter((p) => p.cats.includes(f.id)).length,
      })).filter((f) => f.id === "all" || f.count > 0),
    [prepared]
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? prepared
        : prepared.filter((p) => p.cats.includes(filter)),
    [prepared, filter]
  );

  // On phones very tall cards are shortened so scrolling stays comfortable.
  const columns = useMemo(() => {
    const placed = visible.map((item, index) => ({
      ...item,
      index,
      shown: cols === 1 ? Math.min(item.ratio, 1.05) : item.ratio,
    }));
    return buildColumns(placed, cols);
  }, [visible, cols]);

  // ---------- enlarged view ----------
  const [lightbox, setLightbox] = useState(null);
  const lastFocused = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(0);
  const isOpen = lightbox !== null;
  const current = isOpen ? visible[lightbox] : null;

  const openLightbox = (index, event) => {
    lastFocused.current = event.currentTarget;
    setLightbox(index);
  };

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    lastFocused.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback(
    (dir) => {
      setLightbox((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length
      );
    },
    [visible.length]
  );

  // Esc closes, arrow keys move, page scroll is locked while open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeLightbox, step]);

  // ---------- render ----------
  return (
    <section id="gallery" className="gl-section">
      <div className="gl-container">
        {/* ---------- HEADER (centered) ---------- */}
        <header className="gl-header">
          <span className="gl-label">Gallery</span>

          <h2>Glimpses of Steel Craft builds</h2>

          <span className="gl-rule" aria-hidden="true" />

          <p>
            From the first footing to the finished stay: cottages, villas and
            resorts in the hills and on open plots.
          </p>
        </header>

        {/* ---------- FILTERS ---------- */}
        <div className="gl-filters" role="group" aria-label="Filter photos">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`gl-pill${filter === f.id ? " is-active" : ""}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <span className="gl-count">{f.count}</span>
            </button>
          ))}
        </div>

        <p className="gl-sr" aria-live="polite">
          Showing {visible.length} photos
        </p>

        {/* ---------- MASONRY ---------- */}
        <div className="gl-grid" key={`${filter}-${cols}`}>
          {columns.map((column, c) => (
            <div className="gl-col" key={c}>
              {column.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`gl-card${
                    item.cats.includes("construction") ? " is-build" : ""
                  }`}
                  style={{ aspectRatio: `1 / ${item.shown}` }}
                  onClick={(e) => openLightbox(item.index, e)}
                  aria-label={`View larger: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gl-shade" />

                  <span className="gl-info">
                    <span className="gl-text">
                      <span className="gl-tag">{item.tag}</span>
                      <span className="gl-title">{item.title}</span>
                    </span>
                    <span className="gl-expand">
                      <Icon name="expand" size={14} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- ENLARGED VIEW ---------- */}
      {current &&
        createPortal(
          <div
            className="gl-lb"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              ref={closeRef}
              className="gl-lb-btn gl-lb-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close photo"
            >
              <Icon name="close" size={20} />
            </button>

            <button
              type="button"
              className="gl-lb-btn gl-lb-prev"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
            >
              <Icon name="arrowLeft" size={20} />
            </button>

            <figure
              className="gl-lb-figure"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.image} alt={current.title} />
              <figcaption>
                <strong>{current.title}</strong>
                {current.place && <span>{current.place}</span>}
              </figcaption>
            </figure>

            <button
              type="button"
              className="gl-lb-btn gl-lb-next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
            >
              <Icon name="arrow" size={20} />
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Gallery;
