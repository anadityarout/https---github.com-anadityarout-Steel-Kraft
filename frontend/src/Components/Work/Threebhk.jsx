import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  House,
  Zap,
  Leaf,
  ShieldCheck,
  Settings,
  BedDouble,
  Bath,
  MapPin,
} from "lucide-react";

import "./Threebhk.css";

// Banner and home images
import cottage01 from "../../assets/Cottage_01.png";
import cottage05 from "../../assets/Cottage_05.png";
import cottage07 from "../../assets/Cottage_07.png";
import cottage23 from "../../assets/Cottage_23.png";
import cottage26 from "../../assets/Cottage_26.png";
import cottage32 from "../../assets/Cottage_32.png";
import cottage43 from "../../assets/Cottage_43.png";
import cottage49 from "../../assets/Cottage_49.png";
import cottage51 from "../../assets/Cottage_51.png";
import cottage58 from "../../assets/Cottage_58.png";
import cottage61 from "../../assets/Cottage_61.jpeg";
import cottage62 from "../../assets/Cottage_62.png";
import cottage64 from "../../assets/Cottage_64.png";

// Use Cottage_58.png for the hero and bottom quote banner.
const threeBhkBanner = cottage58;

const homes = [
  {
    image: cottage01,
    name: "Premium Family Home",
    area: "1350 sq ft",
    type: "Modern",
    description:
      "A spacious and elegant 3 BHK home designed for modern family living with an open layout and premium finishes.",
  },
  {
    image: cottage05,
    name: "Garden View Villa",
    area: "1500 sq ft",
    type: "Villa",
    description:
      "A modern 3 BHK villa with beautiful garden views, spacious interiors and luxurious design.",
  },
  {
    image: cottage07,
    name: "Weekend Retreat",
    area: "1600 sq ft",
    type: "Cottage",
    description:
      "A peaceful 3 BHK home designed for comfort, holidays and relaxed family living.",
  },
  {
    image: cottage23,
    name: "Nature View Cottage",
    area: "1450 sq ft",
    type: "Cottage",
    description:
      "Surrounded by nature, this 3 BHK cottage offers a calm and refreshing living experience.",
  },
  {
    image: cottage26,
    name: "Luxury 3 BHK Villa",
    area: "1800 sq ft",
    type: "Villa",
    description:
      "A premium villa with contemporary design, spacious living areas and modern amenities.",
  },
  {
    image: cottage32,
    name: "Hillside Home",
    area: "1550 sq ft",
    type: "Hillside",
    description:
      "A beautiful prefab home with hillside views, ideal for holidays or permanent living.",
  },
  {
    image: cottage43,
    name: "Contemporary Family Villa",
    area: "1650 sq ft",
    type: "Modern Villa",
    description:
      "A thoughtfully designed family villa combining contemporary architecture and comfortable living.",
  },
  {
    image: cottage49,
    name: "Modern Garden Residence",
    area: "1500 sq ft",
    type: "Garden Home",
    description:
      "A modern prefab residence with bright interiors and a relaxing connection to nature.",
  },
  {
    image: cottage51,
    name: "A-Frame Luxury Retreat",
    area: "1400 sq ft",
    type: "A-Frame",
    description:
      "A distinctive A-frame home offering a peaceful retreat with stylish architecture.",
  },
  {
    image: cottage58,
    name: "Mountain View Villa",
    area: "1700 sq ft",
    type: "Villa",
    description:
      "An inviting family home inspired by natural surroundings and spacious living.",
  },
  {
    image: cottage61,
    name: "Premium Forest Home",
    area: "1600 sq ft",
    type: "Forest Home",
    description:
      "A contemporary home surrounded by greenery, designed for privacy and peaceful living.",
  },
  {
    image: cottage62,
    name: "Signature Family Cottage",
    area: "1500 sq ft",
    type: "Cottage",
    description:
      "A welcoming cottage combining practical spaces, modern comforts and nature-inspired design.",
  },
  {
    image: cottage64,
    name: "Elegant Prefab Residence",
    area: "1650 sq ft",
    type: "Modern Home",
    description:
      "A refined prefab residence with functional interiors and an elegant exterior.",
  },
];

const features = [
  {
    icon: House,
    title: "Spacious Layout",
    description: "Ideal for growing families",
  },
  {
    icon: Zap,
    title: "Fast Installation",
    description: "Complete in weeks",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description: "Designed for a greener future",
  },
  {
    icon: ShieldCheck,
    title: "Durable & Safe",
    description: "Built to last",
  },
  {
    icon: Settings,
    title: "Customizable",
    description: "Design as per your needs",
  },
];

function Threebhk() {
  return (
    <main className="threebhk-page">
      {/* HERO BANNER */}
      <section className="threebhk-banner">
        <div
          className="threebhk-banner__image"
          style={{
            backgroundImage: `url("${threeBhkBanner}")`,
          }}
          role="img"
          aria-label="Modern three bedroom prefab home"
        />

        <div className="threebhk-banner__shade" />

        <div className="threebhk-banner__content">
          <p className="threebhk-banner__eyebrow">
            MODERN <span>|</span> <strong>SUSTAINABLE</strong> <span>|</span>{" "}
            PREFABRICATED
          </p>

          <h1 className="threebhk-banner__title">
            3 BHK Prefab
            <span>Homes</span>
          </h1>

          <h2 className="threebhk-banner__subtitle">
            Spacious Living. Built Better.
          </h2>

          <p className="threebhk-banner__description">
            Beautiful, affordable and sustainable 3 BHK prefab homes designed
            for modern lifestyles. Perfect for families, holiday homes or a
            peaceful getaway.
          </p>

          <div className="threebhk-banner__buttons">
            <a
              href="#threebhk-designs"
              className="threebhk-banner__btn threebhk-banner__btn--gold"
            >
              Explore 3 BHK Designs
              <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="threebhk-banner__btn threebhk-banner__btn--outline"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="threebhk-banner__quality">
          <div className="threebhk-banner__quality-icon">
            <House size={20} />
          </div>

          <div className="threebhk-banner__quality-text">
            <h3>Modern Design</h3>
            <p>For a Better Tomorrow</p>
          </div>
        </div>
      </section>

      {/* FIVE FEATURES */}
      <section className="threebhk-features">
        <div className="threebhk-features__container">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className="threebhk-feature" key={feature.title}>
                <div className="threebhk-feature__icon">
                  <Icon size={29} strokeWidth={1.8} />
                </div>

                <div className="threebhk-feature__text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESIGN CARDS */}
      <section className="threebhk-designs" id="threebhk-designs">
        <div className="threebhk-designs__container">
          <header className="threebhk-designs__heading">
            <span className="threebhk-designs__eyebrow">
              OUR 3 BHK DESIGNS
            </span>

            <h2>
              Explore Our <span>3 BHK</span> Prefab Homes
            </h2>

            <p>
              Discover beautifully designed 3 BHK prefab homes that combine
              style, functionality and sustainability.
            </p>
          </header>

          <div className="threebhk-grid">
            {homes.map((home, index) => (
              <article className="threebhk-card" key={home.name}>
                {/* Image: blurred copy fills the frame, sharp copy sits on top */}
                <div className="threebhk-card__image">
                  <img
                    className="threebhk-card__backdrop"
                    src={home.image}
                    alt=""
                    aria-hidden="true"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <img
                    className="threebhk-card__photo"
                    src={home.image}
                    alt={home.name}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>

                <div className="threebhk-card__body">
                  <div className="threebhk-card__title-row">
                    <h3>{home.name}</h3>
                    <span className="threebhk-card__area">{home.area}</span>
                  </div>

                  <div className="threebhk-card__meta">
                    <span>
                      <BedDouble size={16} />
                      3 Bedrooms
                    </span>

                    <span>
                      <Bath size={16} />
                      3 Bathrooms
                    </span>

                    <span>
                      <MapPin size={16} />
                      {home.type}
                    </span>
                  </div>

                  <p className="threebhk-card__description">
                    {home.description}
                  </p>

                  <Link
                    to="/contact"
                    className="threebhk-card__details"
                    aria-label={`Enquire about ${home.name}`}
                  >
                    View Details
                    <span className="threebhk-card__arrow">
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM QUOTE BANNER */}
      <section className="threebhk-quote">
        <div className="threebhk-quote__image">
          <img
            src={threeBhkBanner}
            alt="Modern three bedroom prefab home"
            loading="lazy"
          />
        </div>

        <div className="threebhk-quote__content">
          <span className="threebhk-quote__eyebrow">
            READY TO BUILD YOUR DREAM HOME?
          </span>

          <h2>Get a Quote for Your 3 BHK Home</h2>

          <p>
            Share your requirements and our team will help you with the best
            design, customization options and a personalized quote.
          </p>

          <Link to="/contact" className="threebhk-quote__button">
            Get a Quote <ArrowRight size={17} />
          </Link>
        </div>

        <div className="threebhk-quote__benefits">
          <span>
            <Settings size={19} />
            Custom Designs
          </span>

          <span>
            <House size={19} />
            Expert Guidance
          </span>

          <span>
            <ShieldCheck size={19} />
            Quality Construction
          </span>

          <span>
            <Zap size={19} />
            On-Time Delivery
          </span>
        </div>
      </section>
    </main>
  );
}

export default Threebhk;
