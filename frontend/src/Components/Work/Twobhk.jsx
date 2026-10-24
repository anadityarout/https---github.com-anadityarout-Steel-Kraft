import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  House,
  Wrench,
  Leaf,
  Settings,
  BedDouble,
  Bath,
  MapPin,
  Palette,
  MonitorCheck,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";

import "./Twobhk.css";

import twoBhkBanner from "../../assets/Cottage_17.png";
import cottage03 from "../../assets/Cottage_08.jpeg";
import cottage12 from "../../assets/Cottage_10.jpeg";
import cottage15 from "../../assets/Cottage_17.png";
import cottage16 from "../../assets/Cottage_18.jpeg";
import cottage22 from "../../assets/Cottage_24.jpeg";
import cottage30 from "../../assets/Cottage_28.png";
import cottage41 from "../../assets/Cottage_33.jpeg";
import cottage44 from "../../assets/Cottage_34.png";
import cottage46 from "../../assets/Cottage_38.png";
import cottage47 from "../../assets/Cottage_40.jpeg";
import cottage48 from "../../assets/Cottage_42.png";
import cottage50 from "../../assets/Cottage_45.png";
import cottage60 from "../../assets/Cottage_53.png";
import cottage54 from "../../assets/Cottage_54.png";
import cottage55 from "../../assets/Cottage_55.jpeg";
import cottage56 from "../../assets/Cottage_56.png";

const homes = [
  {
    image: cottage03,
    name: "Modern Family Home",
    area: "950 sq ft",
    type: "Modern",
    description:
      "A spacious and elegant 2 BHK home designed for modern family living with an open layout.",
  },
  {
    image: cottage12,
    name: "Garden View Villa",
    area: "950 sq ft",
    type: "Villa",
    description:
      "A modern 2 BHK villa with beautiful garden views and premium finishes.",
  },
  {
    image: cottage15,
    name: "Weekend Retreat",
    area: "1000 sq ft",
    type: "Cottage",
    description:
      "A peaceful 2 BHK home designed for comfort and a better tomorrow.",
  },
  {
    image: cottage16,
    name: "Nature View Cottage",
    area: "850 sq ft",
    type: "Cottage",
    description:
      "Surrounded by nature, this 2 BHK cottage offers a calm and refreshing living experience.",
  },
  {
    image: cottage22,
    name: "Luxury 2 BHK Villa",
    area: "1100 sq ft",
    type: "Villa",
    description:
      "A premium 2 BHK villa with contemporary design and spacious interiors.",
  },
  {
    image: cottage30,
    name: "Hillside Home",
    area: "950 sq ft",
    type: "Hillside",
    description:
      "A beautiful prefab home with hillside views, ideal for holidays or permanent living.",
  },
  {
    image: cottage41,
    name: "Contemporary Garden Home",
    area: "900 sq ft",
    type: "Garden Home",
    description:
      "A contemporary design combining natural surroundings and practical living spaces.",
  },
  {
    image: cottage44,
    name: "Forest Family Retreat",
    area: "1000 sq ft",
    type: "Forest Home",
    description:
      "A tranquil home surrounded by greenery, perfect for relaxing with family.",
  },
  {
    image: cottage46,
    name: "Premium Prefab Home",
    area: "1050 sq ft",
    type: "Modern Villa",
    description:
      "Thoughtfully planned interiors and a stylish exterior for modern living.",
  },
  {
    image: cottage47,
    name: "Compact Family Villa",
    area: "900 sq ft",
    type: "Family Home",
    description:
      "A comfortable two-bedroom layout designed to make everyday living easier.",
  },
  {
    image: cottage48,
    name: "Luxury Garden Retreat",
    area: "1100 sq ft",
    type: "Garden Villa",
    description:
      "A welcoming retreat with elegant design and a connection to the outdoors.",
  },
  {
    image: cottage50,
    name: "Modern Nature Cottage",
    area: "950 sq ft",
    type: "Cottage",
    description:
      "A contemporary cottage with a nature-inspired setting and warm interiors.",
  },
  {
    image: cottage60,
    name: "Signature 2 BHK Home",
    area: "1000 sq ft",
    type: "Modern Home",
    description:
      "A refined prefab home combining functionality, comfort and modern design.",
  },
  {
    image: cottage54,
    name: "Contemporary Family Villa",
    area: "1200 sq ft",
    type: "Duplex Villa",
    description:
      "A stylish two-storey home featuring spacious balconies, elegant wooden accents, and a peaceful garden setting.",
  },
  {
    image: cottage55,
    name: "Serenity Garden Villa",
    area: "1050 sq ft",
    type: "Garden Villa",
    description:
      "A modern villa surrounded by lush greenery, offering a relaxing atmosphere and comfortable living spaces.",
  },
  {
    image: cottage56,
    name: "Premium Hillside Cottage",
    area: "950 sq ft",
    type: "Prefab Cottage",
    description:
      "A contemporary prefab cottage with a distinctive exterior, generous outdoor space, and scenic surroundings.",
  },
];

function Twobhk() {
  return (
    <main className="twobhk-page">
      {/* HERO BANNER */}
      <section className="twobhk-banner">
        <div
          className="twobhk-banner__image"
          style={{ backgroundImage: `url(${twoBhkBanner})` }}
          role="img"
          aria-label="Modern two bedroom prefab home"
        />

        <div className="twobhk-banner__shade" />

        <div className="twobhk-banner__content">
          <p className="twobhk-banner__eyebrow">
            MODERN <span>|</span> <strong>SUSTAINABLE</strong> <span>|</span>{" "}
            PREFABRICATED
          </p>

          <h1 className="twobhk-banner__title">
            2 BHK Prefab
            <span>Homes</span>
          </h1>

          <h2 className="twobhk-banner__subtitle">
            Spacious Living. Built Better.
          </h2>

          <p className="twobhk-banner__description">
            Beautiful, affordable and sustainable 2 BHK prefab homes designed
            for modern lifestyles. Perfect for families, holiday homes or a
            peaceful getaway.
          </p>

          <div className="twobhk-banner__buttons">
            <a
              href="#twobhk-designs"
              className="twobhk-banner__btn twobhk-banner__btn--gold"
            >
              Explore 2 BHK Designs
              <ArrowRight size={18} />
            </a>

            <Link
              to="/contact"
              className="twobhk-banner__btn twobhk-banner__btn--outline"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        <div className="twobhk-banner__quality">
          <div className="twobhk-banner__quality-icon">
            <House size={20} />
          </div>

          <div className="twobhk-banner__quality-text">
            <h3>Premium Quality</h3>
            <p>Modern Designs · Built to Last</p>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section className="twobhk-features">
        <div className="twobhk-features__container">
          <div className="twobhk-feature">
            <House size={32} />
            <div>
              <h3>Affordable</h3>
              <p>Cost-effective modern homes</p>
            </div>
          </div>

          <div className="twobhk-feature">
            <Wrench size={32} />
            <div>
              <h3>Fast Installation</h3>
              <p>Complete in weeks</p>
            </div>
          </div>

          <div className="twobhk-feature">
            <Leaf size={32} />
            <div>
              <h3>Sustainable</h3>
              <p>Eco-friendly and energy efficient</p>
            </div>
          </div>

          <div className="twobhk-feature">
            <Settings size={32} />
            <div>
              <h3>Customizable</h3>
              <p>Design as per your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 BHK DESIGN CARDS */}
      <section className="twobhk-designs" id="twobhk-designs">
        <div className="twobhk-designs__container">
          <header className="twobhk-designs__heading">
            <span className="twobhk-designs__eyebrow">OUR 2 BHK DESIGNS</span>

            <h2>Explore Our 2 BHK Prefab Homes</h2>

            <p>
              Discover modern two-bedroom prefab homes designed for comfort,
              functionality and contemporary living.
            </p>
          </header>

          <div className="twobhk-grid">
            {homes.map((home, index) => (
              <article className="twobhk-card" key={home.name}>
                <div className="twobhk-card__image">
                  <img
                    src={home.image}
                    alt={home.name}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>

                <div className="twobhk-card__body">
                  <div className="twobhk-card__title-row">
                    <h3>{home.name}</h3>
                    <span className="twobhk-card__area">{home.area}</span>
                  </div>

                  <div className="twobhk-card__meta">
                    <span>
                      <BedDouble size={15} />
                      2 Bedrooms
                    </span>

                    <span>
                      <Bath size={15} />
                      2 Bathrooms
                    </span>

                    <span>
                      <MapPin size={15} />
                      {home.type}
                    </span>
                  </div>

                  <p className="twobhk-card__description">
                    {home.description}
                  </p>

                  <Link
                    to="/contact"
                    className="twobhk-card__details"
                    aria-label={`Enquire about ${home.name}`}
                  >
                    View Details
                    <span>
                      <ArrowRight size={17} />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BANNER — BELOW ALL DESIGN CARDS */}
      <section className="twobhk-quote">
        <div className="twobhk-quote__image">
          <img
            src={cottage03}
            alt="Modern prefab home surrounded by nature"
            loading="lazy"
          />
        </div>

        <div className="twobhk-quote__content">
          <div className="twobhk-quote__main">
            <p className="twobhk-quote__eyebrow">
              READY TO BUILD YOUR DREAM HOME?
            </p>

            <h2>
              Get a Quote for Your <span>2 BHK Home</span>
            </h2>

            <p className="twobhk-quote__description">
              Share your requirements and our team will help you with the best
              design, customization options and a personalized quote.
            </p>

            <Link to="/contact" className="twobhk-quote__button">
              Get a Quote
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="twobhk-quote__benefits">
            <div className="twobhk-quote__benefit">
              <span className="twobhk-quote__benefit-icon">
                <Palette size={17} />
              </span>
              <span>Custom Designs</span>
            </div>

            <div className="twobhk-quote__benefit">
              <span className="twobhk-quote__benefit-icon">
                <MonitorCheck size={17} />
              </span>
              <span>Expert Guidance</span>
            </div>

            <div className="twobhk-quote__benefit">
              <span className="twobhk-quote__benefit-icon">
                <ShieldCheck size={17} />
              </span>
              <span>Quality Construction</span>
            </div>

            <div className="twobhk-quote__benefit">
              <span className="twobhk-quote__benefit-icon">
                <CalendarCheck size={17} />
              </span>
              <span>On-Time Delivery</span>
            </div>
          </div>

          <div className="twobhk-quote__decoration" />
        </div>
      </section>
    </main>
  );
}

export default Twobhk;
