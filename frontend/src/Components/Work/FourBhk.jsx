import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  House,
  Wrench,
  Leaf,
  ShieldCheck,
  Settings,
  BedDouble,
  Bath,
  MapPin,
  Palette,
  MonitorCheck,
  CalendarCheck,
} from "lucide-react";

import "./FourBhk.css";

// Banner image
import fourBhkBanner from "../../assets/Cottage_35.png";

// Four BHK home images
import cottage09 from "../../assets/Cottage_09.png";
import cottage11 from "../../assets/Cottage_11.png";
import cottage13 from "../../assets/Cottage_13.png";
import cottage19 from "../../assets/Cottage_19.png";
import cottage35 from "../../assets/Cottage_35.png";
import cottage36 from "../../assets/Cottage_36.png";
import cottage37 from "../../assets/Cottage_37.png";
import cottage65 from "../../assets/Cottage_65.png";

// Four BHK home details
const homes = [
  {
    image: cottage09,
    name: "Premium Family Home",
    area: "2200 sq ft",
    type: "Modern",
    description:
      "A spacious and elegant 4 BHK home designed for modern family living with an open layout and premium finishes.",
  },
  {
    image: cottage11,
    name: "Garden View Villa",
    area: "2400 sq ft",
    type: "Villa",
    description:
      "A modern 4 BHK villa with beautiful garden views, spacious interiors and luxurious design.",
  },
  {
    image: cottage13,
    name: "Weekend Retreat",
    area: "2300 sq ft",
    type: "Cottage",
    description:
      "A peaceful 4 BHK home designed for comfort and a better tomorrow, perfect for holidays or permanent living.",
  },
  {
    image: cottage19,
    name: "Nature View Cottage",
    area: "2100 sq ft",
    type: "Cottage",
    description:
      "Surrounded by nature, this 4 BHK cottage offers a calm and refreshing living experience.",
  },
  {
    image: cottage35,
    name: "Luxury 4 BHK Villa",
    area: "2600 sq ft",
    type: "Villa",
    description:
      "A premium 4 BHK villa with contemporary design, spacious living areas and modern amenities.",
  },
  {
    image: cottage36,
    name: "Hillside Home",
    area: "2400 sq ft",
    type: "Hillside",
    description:
      "A beautiful 4 BHK home with hillside views, ideal for holidays or permanent living.",
  },
  {
    image: cottage37,
    name: "Contemporary Family Villa",
    area: "2500 sq ft",
    type: "Modern Villa",
    description:
      "A contemporary family home combining practical layouts, comfortable rooms and timeless architecture.",
  },
  {
    image: cottage65,
    name: "Signature 4 BHK Home",
    area: "2700 sq ft",
    type: "Family Home",
    description:
      "A spacious prefab home designed for modern family living with an elegant exterior and functional interiors.",
  },
];

const FourBhk = () => {
  return (
    <main className="fourbhk-page">
      {/* ================= HERO BANNER ================= */}
      <section className="fourbhk-banner">
        <div
          className="fourbhk-banner__image"
          style={{ backgroundImage: `url(${fourBhkBanner})` }}
          role="img"
          aria-label="Modern four bedroom prefab home"
        />

        <div className="fourbhk-banner__shade" />

        <div className="fourbhk-banner__content">
          <p className="fourbhk-banner__eyebrow">
            MODERN <span>|</span> <strong>SUSTAINABLE</strong> <span>|</span>{" "}
            PREFABRICATED
          </p>

          <h1 className="fourbhk-banner__title">
            4 BHK Prefab
            <span>Homes</span>
          </h1>

          <h2 className="fourbhk-banner__subtitle">
            Spacious Living. Built Better.
          </h2>

          <p className="fourbhk-banner__description">
            Discover spacious and sustainable 4 BHK prefab homes designed for
            modern family living. Enjoy comfortable interiors, practical
            layouts and timeless design.
          </p>

          <div className="fourbhk-banner__buttons">
            <a
              href="#fourbhk-designs"
              className="fourbhk-banner__btn fourbhk-banner__btn--gold"
            >
              Explore 4 BHK Designs
              <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="fourbhk-banner__btn fourbhk-banner__btn--outline"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="fourbhk-banner__quality">
          <div className="fourbhk-banner__quality-icon">
            <House size={25} strokeWidth={1.8} />
          </div>

          <div className="fourbhk-banner__quality-text">
            <h3>Spacious 4 BHK Living</h3>
            <p>Designed for modern families.</p>
          </div>
        </div>
      </section>

      {/* ================= FIVE FEATURES ================= */}
      <section className="fourbhk-features">
        <div className="fourbhk-features__container">
          <div className="fourbhk-feature">
            <House className="fourbhk-feature__icon" />
            <div className="fourbhk-feature__text">
              <h3>Spacious Layout</h3>
              <p>Ideal for large families</p>
            </div>
          </div>

          <div className="fourbhk-feature">
            <Wrench className="fourbhk-feature__icon" />
            <div className="fourbhk-feature__text">
              <h3>Fast Installation</h3>
              <p>Complete in weeks</p>
            </div>
          </div>

          <div className="fourbhk-feature">
            <Leaf className="fourbhk-feature__icon" />
            <div className="fourbhk-feature__text">
              <h3>Energy Efficient</h3>
              <p>Designed for a greener future</p>
            </div>
          </div>

          <div className="fourbhk-feature">
            <ShieldCheck className="fourbhk-feature__icon" />
            <div className="fourbhk-feature__text">
              <h3>Durable &amp; Safe</h3>
              <p>Built to last</p>
            </div>
          </div>

          <div className="fourbhk-feature">
            <Settings className="fourbhk-feature__icon" />
            <div className="fourbhk-feature__text">
              <h3>Customizable</h3>
              <p>Design as per your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOUR BHK HOME CARDS ================= */}
      <section className="fourbhk-designs" id="fourbhk-designs">
        <div className="fourbhk-designs__container">
          <header className="fourbhk-designs__heading">
            <div className="fourbhk-designs__eyebrow">
              <span />
              OUR 4 BHK DESIGNS
              <span />
            </div>

            <h2>
              Explore Our <span>4 BHK</span> Prefab Homes
            </h2>

            <p>
              Discover beautifully designed 4 BHK prefab homes that combine
              style, functionality and sustainability.
            </p>
          </header>

          <div className="fourbhk-grid">
            {homes.map((home, index) => (
              <article className="fourbhk-card" key={home.name}>
                {/* Image: blurred copy fills the frame, sharp copy sits on top */}
                <div className="fourbhk-card__image">
                  <img
                    className="fourbhk-card__backdrop"
                    src={home.image}
                    alt=""
                    aria-hidden="true"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <img
                    className="fourbhk-card__photo"
                    src={home.image}
                    alt={home.name}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>

                <div className="fourbhk-card__body">
                  <div className="fourbhk-card__title-row">
                    <h3>{home.name}</h3>
                    <span className="fourbhk-card__area">{home.area}</span>
                  </div>

                  <div className="fourbhk-card__meta">
                    <span>
                      <BedDouble size={16} />
                      4 Bedrooms
                    </span>

                    <span>
                      <Bath size={16} />
                      4 Bathrooms
                    </span>

                    <span>
                      <MapPin size={16} />
                      {home.type}
                    </span>
                  </div>

                  <p className="fourbhk-card__description">
                    {home.description}
                  </p>

                  <Link
                    to="/contact"
                    className="fourbhk-card__details"
                    aria-label={`Enquire about ${home.name}`}
                  >
                    <span>View Details</span>
                    <span className="fourbhk-card__arrow">
                      <ArrowRight size={18} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE BANNER — BELOW ALL DESIGN CARDS ================= */}
      <section className="fourbhk-quote">
        <div className="fourbhk-quote__image">
          <img
            src={cottage09}
            alt="Spacious 4 BHK prefab home surrounded by nature"
            loading="lazy"
          />
        </div>

        <div className="fourbhk-quote__content">
          <div className="fourbhk-quote__main">
            <p className="fourbhk-quote__eyebrow">
              READY TO BUILD YOUR DREAM HOME?
            </p>

            <h2>
              Get a Quote for Your <span>4 BHK Home</span>
            </h2>

            <p className="fourbhk-quote__description">
              Share your requirements and our team will help you with the best
              design, customization options and a personalized quote.
            </p>

            <Link to="/contact" className="fourbhk-quote__button">
              Get a Quote
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="fourbhk-quote__benefits">
            <div className="fourbhk-quote__benefit">
              <span className="fourbhk-quote__benefit-icon">
                <Palette size={17} />
              </span>
              <span>Custom Designs</span>
            </div>

            <div className="fourbhk-quote__benefit">
              <span className="fourbhk-quote__benefit-icon">
                <MonitorCheck size={17} />
              </span>
              <span>Expert Guidance</span>
            </div>

            <div className="fourbhk-quote__benefit">
              <span className="fourbhk-quote__benefit-icon">
                <ShieldCheck size={17} />
              </span>
              <span>Quality Construction</span>
            </div>

            <div className="fourbhk-quote__benefit">
              <span className="fourbhk-quote__benefit-icon">
                <CalendarCheck size={17} />
              </span>
              <span>On-Time Delivery</span>
            </div>
          </div>

          <div className="fourbhk-quote__decoration" />
        </div>
      </section>
    </main>
  );
};

export default FourBhk;
