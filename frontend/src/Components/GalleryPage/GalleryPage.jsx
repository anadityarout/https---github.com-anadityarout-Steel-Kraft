import React, { useState } from "react";
import "./GalleryPage.css";

// ==========================================
// IMAGES
// Change any image by editing its import line.
// ==========================================

import heroBanner from "../../assets/galmou.png";
import aboutMain from "../../assets/gal1.png";
import aboutInset from "../../assets/ran2.png";
import impactBackground from "../../assets/impactbg.jpg";

import imgResort from "../../assets/Galres.png";
import imgAFrame from "../../assets/gal1.png";
import imgResortAlt from "../../assets/resort.jpg";
import imgInterior from "../../assets/ran2.png";
import imgVilla from "../../assets/ran3.jpg";
import imgDuplex from "../../assets/ran4.png";
import imgHillCottage from "../../assets/hill-cottage.jpg";
import imgGlamping from "../../assets/glamping-resort.jpg";
import imgFarmhouse from "../../assets/farmhouse.jpg";
import imgBeachVilla from "../../assets/beach-villa.jpg";
import imgSteel from "../../assets/building-systems.png";
import imgFrame from "../../assets/building-configuration.png";
import imgHome from "../../assets/home1.jpg";

// ==========================================
// ICONS
// ==========================================

const Icon = ({ name }) => {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "image":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="M3 17l5-4 4 3 3-2 6 4" />
        </svg>
      );

    case "all":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </svg>
      );

    case "home":
      return (
        <svg {...props}>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );

    case "resort":
      return (
        <svg {...props}>
          <path d="M3 21h18" />
          <path d="M5 21V9l7-5 7 5v12" />
          <path d="M9 21v-6h6v6" />
          <path d="M9 11h.01M15 11h.01" />
        </svg>
      );

    case "interior":
      return (
        <svg {...props}>
          <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
          <path d="M3 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4H3z" />
          <path d="M5 17v2M19 17v2" />
        </svg>
      );

    case "exterior":
      return (
        <svg {...props}>
          <path d="M12 3l5 7h-3l4 6H6l4-6H7z" />
          <path d="M12 16v5" />
        </svg>
      );

    case "construction":
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="M6 20V8l6-4 6 4v12" />
          <path d="M6 12h12M6 16h12" />
        </svg>
      );

    case "design":
      return (
        <svg {...props}>
          <path d="M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16z" />
          <path d="M14 7l3 3" />
        </svg>
      );

    case "craft":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case "leaf":
      return (
        <svg {...props}>
          <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
          <path d="M5 19c4-4 7-6 11-8" />
        </svg>
      );

    case "camera":
      return (
        <svg {...props}>
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );

    case "arrow-up-right":
      return (
        <svg {...props}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );

    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );

    default:
      return null;
  }
};

// ==========================================
// DATA
// ==========================================

const features = [
  {
    id: 1,
    icon: "design",
    title: "Modern & Innovative Designs",
    text: "Thoughtfully crafted spaces for every lifestyle.",
  },
  {
    id: 2,
    icon: "craft",
    title: "Premium Craftsmanship",
    text: "High-quality materials and precision construction.",
  },
  {
    id: 3,
    icon: "leaf",
    title: "Sustainable Solutions",
    text: "Eco-friendly, efficient and built for the future.",
  },
];

const categories = [
  {
    id: "all",
    label: "All Projects",
    icon: "all",
    image: imgResort,
    featured: "Mountain View Resort",
  },
  {
    id: "homes",
    label: "Homes & Cottages",
    icon: "home",
    image: imgAFrame,
    featured: "Alpine Retreat",
  },
  {
    id: "resorts",
    label: "Resorts",
    icon: "resort",
    image: imgResortAlt,
    featured: "Sunset Resort",
  },
  {
    id: "interiors",
    label: "Interiors",
    icon: "interior",
    image: imgInterior,
    featured: "Mountain View Villa",
  },
  {
    id: "exteriors",
    label: "Exteriors",
    icon: "exterior",
    image: imgVilla,
    featured: "Forest Edge Home",
  },
  {
    id: "construction",
    label: "Construction",
    icon: "construction",
    image: imgSteel,
    featured: "Prefab Steel Structure",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "homes", label: "Homes & Cottages" },
  { id: "resorts", label: "Resorts" },
  { id: "interiors", label: "Interiors" },
  { id: "exteriors", label: "Exteriors" },
  { id: "construction", label: "Construction" },
];

const galleryItems = [
  { id: 1, title: "Pinewood Cottage", category: "homes", image: imgHillCottage },
  { id: 2, title: "Alpine Retreat", category: "homes", image: imgAFrame },
  { id: 3, title: "Sunset Resort", category: "resorts", image: imgResort },
  { id: 4, title: "Mountain View Villa", category: "interiors", image: imgInterior },
  { id: 5, title: "Valley Heights", category: "resorts", image: imgGlamping },
  { id: 6, title: "Horizon Suite", category: "interiors", image: imgDuplex },
  { id: 7, title: "Prefab Steel Structure", category: "construction", image: imgSteel },
  { id: 8, title: "Forest Edge Home", category: "exteriors", image: imgFarmhouse },
  { id: 9, title: "Skyline Lounge", category: "exteriors", image: imgBeachVilla },
];

const highlightStats = [
  { id: 1, icon: "camera", value: "500+", label: "Gallery Images" },
  { id: 2, icon: "home", value: "50+", label: "Projects Featured" },
  { id: 3, icon: "leaf", value: "100%", label: "Sustainable Design" },
];

const showcaseSmall = [
  { id: 1, title: "Homes & Cottages", image: imgHome },
  { id: 2, title: "Interiors", image: imgInterior },
  { id: 3, title: "Exteriors", image: imgVilla },
];

// ==========================================
// GALLERY PAGE
// ==========================================

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  const currentCategory = categories[activeCategory];

  const visibleItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const progress = ((activeCategory + 1) / categories.length) * 100;

  return (
    <main className="gl-page">
      {/* =====================================
          HERO
      ====================================== */}

      <section
        className="gl-hero"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="gl-hero-overlay" />

        <div className="gl-hero-container">
          <div className="gl-hero-content">
            <span className="gl-eyebrow">
              <span>OUR GALLERY</span>
            </span>

            <h1 className="gl-hero-title">
              <span>Spaces That</span>
              <span className="gl-hero-accent">Inspire</span>
            </h1>

            <p className="gl-hero-description">
              Explore a collection of our finest prefab homes,
              cottages, resorts and architectural spaces —
              designed for modern living and built for a
              better tomorrow.
            </p>
          </div>

          <div className="gl-hero-badge">
            <div className="gl-hero-avatars">
              <img src={imgHillCottage} alt="" />
              <img src={imgGlamping} alt="" />
              <img src={imgFarmhouse} alt="" />
            </div>

            <div className="gl-hero-badge-text">
              <strong>500+</strong>
              <span>Projects Captured</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          ABOUT OUR GALLERY
      ====================================== */}

      <section className="gl-about">
        <div className="gl-about-container">
          <div className="gl-about-visual">
            <div className="gl-about-main">
              <img src={aboutMain} alt="Prefab A-frame cottage" />
            </div>

            <div className="gl-about-tag">
              <span className="gl-about-tag-icon">
                <Icon name="image" />
              </span>

              <span className="gl-about-tag-text">
                <strong>OUR GALLERY</strong>
                <small>Real Spaces, Real Stories</small>
              </span>
            </div>

            <div className="gl-about-inset">
              <img src={aboutInset} alt="Prefab interior" />

              <span className="gl-round-arrow" aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </div>
          </div>

          <div className="gl-about-content">
            <span className="gl-eyebrow gl-eyebrow-dark">
              <span>ABOUT OUR GALLERY</span>
            </span>

            <h2 className="gl-section-title">
              Building more, in less time and with less waste
            </h2>

            <p className="gl-section-text">
              Our gallery showcases a diverse collection of prefab
              homes, cottages, resorts, commercial spaces and custom
              structures. Each project reflects our commitment to
              innovative design, quality construction and sustainable
              living.
            </p>

            <ul className="gl-features">
              {features.map((feature) => (
                <li className="gl-feature" key={feature.id}>
                  <span className="gl-feature-icon">
                    <Icon name={feature.icon} />
                  </span>

                  <span className="gl-feature-text">
                    <strong>{feature.title}</strong>
                    <small>{feature.text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================
          EXPLORE BY CATEGORY
      ====================================== */}

      <section className="gl-explore">
        <div className="gl-explore-container">
          <div className="gl-explore-left">
            <span className="gl-eyebrow gl-eyebrow-both">
              <span>EXPLORE BY CATEGORY</span>
            </span>

            <h2 className="gl-section-title gl-title-light">
              A better frame for the way you want to build
            </h2>

            <p className="gl-section-text gl-text-light">
              Browse our gallery by category to find the perfect
              inspiration for your next project.
            </p>

            <div className="gl-category-list">
              {categories.map((category, index) => (
                <button
                  type="button"
                  key={category.id}
                  className={`gl-category ${
                    index === activeCategory ? "is-active" : ""
                  }`}
                  onClick={() => setActiveCategory(index)}
                  aria-pressed={index === activeCategory}
                >
                  <span className="gl-category-icon">
                    <Icon name={category.icon} />
                  </span>

                  <span className="gl-category-label">
                    {category.label}
                  </span>

                  <span className="gl-category-arrow">
                    <Icon name="arrow-right" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="gl-explore-right">
            <div className="gl-featured">
              <img
                key={currentCategory.id}
                src={currentCategory.image}
                alt={currentCategory.featured}
                className="gl-featured-image"
              />

              <div className="gl-featured-overlay" />

              <div className="gl-featured-caption">
                <span>Featured Gallery</span>
                <strong>{currentCategory.featured}</strong>
              </div>

              <span className="gl-round-arrow" aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </div>

            <div className="gl-progress">
              <span>{String(activeCategory + 1).padStart(2, "0")}</span>

              <div className="gl-progress-track">
                <div
                  className="gl-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span>{String(categories.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          PROJECT GALLERY
      ====================================== */}

      <section className="gl-projects" id="project-gallery">
        <div className="gl-projects-container">
          <div className="gl-projects-head">
            <div className="gl-projects-heading">
              <span className="gl-eyebrow gl-eyebrow-dark gl-eyebrow-both">
                <span>PROJECT GALLERY</span>
              </span>

              <h2 className="gl-section-title">
                Designs to start from, built around your plot
              </h2>

              <p className="gl-section-text">
                Explore our featured projects across different
                categories. From cozy cottages to luxury resorts,
                each space is uniquely crafted.
              </p>
            </div>

            <div className="gl-filters" role="tablist">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.id}
                  role="tab"
                  aria-selected={filter.id === activeFilter}
                  className={`gl-filter ${
                    filter.id === activeFilter ? "is-active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gl-grid">
            {visibleItems.map((item) => (
              <article className="gl-tile" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="gl-tile-image"
                  loading="lazy"
                />

                <div className="gl-tile-overlay" />

                <h3 className="gl-tile-title">{item.title}</h3>

                <span className="gl-round-arrow gl-round-arrow-sm" aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          GALLERY HIGHLIGHTS
      ====================================== */}

      <section className="gl-highlights">
        <div className="gl-highlights-container">
          <div className="gl-highlights-text">
            <span className="gl-eyebrow gl-eyebrow-dark gl-eyebrow-both">
              <span>GALLERY HIGHLIGHTS</span>
            </span>

            <h2 className="gl-section-title">
              From every angle, extraordinary spaces
            </h2>

            <p className="gl-section-text">
              A closer look at the details, craftsmanship and design
              that make each project exceptional.
            </p>
          </div>

          <div className="gl-stats">
            {highlightStats.map((stat) => (
              <div className="gl-stat" key={stat.id}>
                <span className="gl-stat-icon">
                  <Icon name={stat.icon} />
                </span>

                <strong className="gl-stat-value">{stat.value}</strong>

                <span className="gl-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================
          GALLERY SHOWCASE
      ====================================== */}

      <section
        className="gl-showcase"
        style={{ backgroundImage: `url(${impactBackground})` }}
      >
        <div className="gl-showcase-overlay" />

        <div className="gl-showcase-container">
          <div className="gl-showcase-left">
            <div className="gl-showcase-text">
              <span className="gl-eyebrow gl-eyebrow-both">
                <span>GALLERY SHOWCASE</span>
              </span>

              <h2 className="gl-section-title gl-title-light">
                Glimpses of Steel Craft Builds
              </h2>

              <p className="gl-section-text gl-text-light">
                Discover a wider collection of our completed and
                ongoing projects. Each image tells a story of
                innovation, precision and a better way to build.
              </p>
            </div>

            <figure className="gl-show-tile gl-show-large">
              <img src={imgResortAlt} alt="Resort and Hospitality" loading="lazy" />
              <div className="gl-tile-overlay" />
              <figcaption>Resort &amp; Hospitality</figcaption>
              <span className="gl-round-arrow gl-round-arrow-sm" aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </figure>
          </div>

          <div className="gl-showcase-small">
            {showcaseSmall.map((item) => (
              <figure className="gl-show-tile" key={item.id}>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gl-tile-overlay" />
                <figcaption>{item.title}</figcaption>
                <span className="gl-round-arrow gl-round-arrow-sm" aria-hidden="true">
                  <Icon name="arrow-up-right" />
                </span>
              </figure>
            ))}
          </div>

          <figure className="gl-show-tile gl-show-tall">
            <img src={imgFrame} alt="Construction" loading="lazy" />
            <div className="gl-tile-overlay" />
            <figcaption>Construction</figcaption>
            <span className="gl-round-arrow gl-round-arrow-sm" aria-hidden="true">
              <Icon name="arrow-up-right" />
            </span>
          </figure>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
