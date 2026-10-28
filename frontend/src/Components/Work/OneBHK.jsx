import React from "react";
import {
  ArrowRight,
  House,
  Wrench,
  Leaf,
  Settings,
  Ruler,
  BedDouble,
  Bath,
  Palette,
  MonitorCheck,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./OneBHK.css";

// Banner image
import oneBHKBanner from "../../assets/Cottage_47.png";

// Cottage images
import cottage03 from "../../assets/Cottage_03.png";
import cottage12 from "../../assets/Cottage_12.jpeg";
import cottage15 from "../../assets/Cottage_15.png";
import cottage16 from "../../assets/Cottage_16.jpeg";
import cottage22 from "../../assets/Cottage_22.jpeg";
import cottage30 from "../../assets/Cottage_30.png";
import cottage41 from "../../assets/Cottage_41.png";
import cottage44 from "../../assets/Cottage_44.png";
import cottage46 from "../../assets/Cottage_46.png";
import cottage47 from "../../assets/Cottage_47.png";
import cottage48 from "../../assets/Cottage_48.png";
import cottage50 from "../../assets/Cottage_50.png";
import cottage60 from "../../assets/Cottage_60.png";

// =========================================
// ONE BHK HOME DATA
// =========================================

const homes = [
  {
    id: 1,
    name: "A-Frame Compact Home",
    image: cottage03,
    area: "400 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A cozy and stylish A-frame home, perfect for weekend getaways or small families.",
  },
  {
    id: 2,
    name: "Modern Garden Studio",
    image: cottage12,
    area: "500 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A modern 1 BHK studio with a smart layout and open living space.",
  },
  {
    id: 3,
    name: "Weekend Retreat",
    image: cottage15,
    area: "600 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A peaceful 1 BHK home designed for comfort and a relaxing getaway.",
  },
  {
    id: 4,
    name: "Forest View Cottage",
    image: cottage16,
    area: "550 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "Surrounded by nature, this cottage offers a calm and refreshing living experience.",
  },
  {
    id: 5,
    name: "Compact Family Home",
    image: cottage22,
    area: "650 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A thoughtfully designed home with modern interiors and contemporary appeal.",
  },
  {
    id: 6,
    name: "Hillside Retreat",
    image: cottage30,
    area: "500 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A serene prefab home ideal for holidays or comfortable everyday living.",
  },
  {
    id: 7,
    name: "Contemporary Cottage",
    image: cottage41,
    area: "550 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A contemporary prefab cottage with a practical layout and modern finishes.",
  },
  {
    id: 8,
    name: "Luxury Garden Home",
    image: cottage44,
    area: "600 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A stylish garden home designed for peaceful living and relaxation.",
  },
  {
    id: 9,
    name: "Modern Retreat",
    image: cottage46,
    area: "500 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A modern prefab home combining practical design with a welcoming atmosphere.",
  },
  {
    id: 10,
    name: "Nature View Cottage",
    image: cottage47,
    area: "550 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A nature-inspired cottage designed for comfortable and refreshing stays.",
  },
  {
    id: 11,
    name: "Premium Compact Home",
    image: cottage48,
    area: "600 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A compact prefab home with a functional layout and contemporary style.",
  },
  {
    id: 12,
    name: "Elegant Prefab Cottage",
    image: cottage50,
    area: "500 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "An elegant cottage designed for simple and comfortable modern living.",
  },
  {
    id: 13,
    name: "Peaceful Weekend Home",
    image: cottage60,
    area: "650 sq ft",
    bedrooms: "1 Bedroom",
    bathrooms: "1 Bathroom",
    description:
      "A welcoming prefab home for weekend escapes and everyday comfort.",
  },
];

// =========================================
// ONE BHK COMPONENT
// =========================================

const OneBHK = () => {
  return (
    <main className="onebhk-page">

      {/* HERO BANNER */}

      <section
        className="onebhk-banner"
        style={{
          backgroundImage: `url(${oneBHKBanner})`,
        }}
      >
        <div className="onebhk-overlay" />

        <div className="onebhk-content">
          <p className="onebhk-eyebrow">
            <span>MODERN</span>
            <span className="onebhk-divider">|</span>
            <span className="onebhk-highlight">
              SUSTAINABLE
            </span>
            <span className="onebhk-divider">|</span>
            <span>PREFABRICATED</span>
          </p>

          <h1 className="onebhk-title">
            1 BHK Prefab
            <span>Homes</span>
          </h1>

          <h2 className="onebhk-subtitle">
            Smart Living. Built Better.
          </h2>

          <p className="onebhk-description">
            Beautiful, affordable and sustainable 1 BHK prefab
            homes designed for modern lifestyles. Perfect for
            small families, couples or a peaceful getaway.
          </p>

          <div className="onebhk-actions">
            <a
              href="#onebhk-designs"
              className="onebhk-btn onebhk-btn-primary"
            >
              Explore 1 BHK Designs
              <ArrowRight size={19} />
            </a>

            <Link
              to="/contact"
              className="onebhk-btn onebhk-btn-secondary"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="onebhk-quality">
          <div className="onebhk-crown">
            <House size={25} strokeWidth={1.8} />
          </div>

          <div className="onebhk-quality-text">
            <h3>Modern Design</h3>
            <p>For a Better Tomorrow</p>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}

      <section className="onebhk-features">
        <div className="onebhk-features-container">

          <div className="onebhk-feature">
            <div className="onebhk-feature-icon">
              <House size={32} strokeWidth={1.7} />
            </div>
            <div className="onebhk-feature-text">
              <h3>Affordable</h3>
              <p>Cost-effective modern homes</p>
            </div>
          </div>

          <div className="onebhk-feature">
            <div className="onebhk-feature-icon">
              <Wrench size={32} strokeWidth={1.7} />
            </div>
            <div className="onebhk-feature-text">
              <h3>Fast Installation</h3>
              <p>Complete in weeks</p>
            </div>
          </div>

          <div className="onebhk-feature">
            <div className="onebhk-feature-icon">
              <Leaf size={32} strokeWidth={1.7} />
            </div>
            <div className="onebhk-feature-text">
              <h3>Sustainable</h3>
              <p>Eco-friendly and energy efficient</p>
            </div>
          </div>

          <div className="onebhk-feature">
            <div className="onebhk-feature-icon">
              <Settings size={32} strokeWidth={1.7} />
            </div>
            <div className="onebhk-feature-text">
              <h3>Customizable</h3>
              <p>Design as per your needs</p>
            </div>
          </div>

        </div>
      </section>

      {/* EXPLORE ONE BHK DESIGNS */}

      <section
        className="onebhk-designs"
        id="onebhk-designs"
      >
        <div className="onebhk-designs-container">

          <div className="onebhk-designs-heading">
            <div className="onebhk-section-label">
              <span />
              OUR 1 BHK DESIGNS
              <span />
            </div>

            <h2>
              Explore Our 1 BHK Prefab Homes
            </h2>

            <p>
              Discover beautifully designed 1 BHK prefab homes
              that combine style, functionality and sustainability.
            </p>
          </div>

          {/* HOME CARDS */}

          <div className="onebhk-homes-grid">
            {homes.map((home) => (
              <article
                className="onebhk-home-card"
                key={home.id}
              >
                <div
                  className="onebhk-home-image"
                  style={{
                    "--home-bg": `url(${home.image})`,
                  }}
                >
                  <img
                    src={home.image}
                    alt={home.name}
                    loading="lazy"
                  />
                </div>

                <div className="onebhk-home-info">

                  <div className="onebhk-home-title-row">
                    <h3>{home.name}</h3>
                    <span className="onebhk-home-area">
                      {home.area}
                    </span>
                  </div>

                  <div className="onebhk-home-specs">
                    <span>
                      <BedDouble size={17} />
                      {home.bedrooms}
                    </span>

                    <span>
                      <Bath size={17} />
                      {home.bathrooms}
                    </span>

                    <span>
                      <House size={17} />
                      Prefab
                    </span>
                  </div>

                  <p className="onebhk-home-description">
                    {home.description}
                  </p>

                  <Link
                    to="/contact"
                    className="onebhk-home-link"
                    aria-label={`View details for ${home.name}`}
                  >
                    <span>View Details</span>

                    <span className="onebhk-home-arrow">
                      <ArrowRight size={20} />
                    </span>
                  </Link>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* GET A QUOTE BANNER */}

      <section className="onebhk-quote">
        <div className="onebhk-quote-image">
          <img
            src={cottage03}
            alt="Modern 1 BHK prefab home surrounded by nature"
            loading="lazy"
          />
        </div>

        <div className="onebhk-quote-content">

          <div className="onebhk-quote-main">
            <p className="onebhk-quote-eyebrow">
              READY TO BUILD YOUR DREAM HOME?
            </p>

            <h2>
              Get a Quote for Your{" "}
              <span>1 BHK Home</span>
            </h2>

            <p className="onebhk-quote-description">
              Share your requirements and our team will help you
              with the best design, customization options and a
              personalized quote.
            </p>

            <Link
              to="/contact"
              className="onebhk-quote-button"
            >
              Get a Quote
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="onebhk-quote-benefits">

            <div className="onebhk-quote-benefit">
              <span className="onebhk-quote-benefit-icon">
                <Palette size={17} />
              </span>
              <span>Custom Designs</span>
            </div>

            <div className="onebhk-quote-benefit">
              <span className="onebhk-quote-benefit-icon">
                <MonitorCheck size={17} />
              </span>
              <span>Expert Guidance</span>
            </div>

            <div className="onebhk-quote-benefit">
              <span className="onebhk-quote-benefit-icon">
                <ShieldCheck size={17} />
              </span>
              <span>Quality Construction</span>
            </div>

            <div className="onebhk-quote-benefit">
              <span className="onebhk-quote-benefit-icon">
                <CalendarCheck size={17} />
              </span>
              <span>On-Time Delivery</span>
            </div>

          </div>

          <div className="onebhk-quote-decoration" />
        </div>
      </section>

    </main>
  );
};

export default OneBHK;
