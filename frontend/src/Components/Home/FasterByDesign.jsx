
import React, { useEffect, useState } from "react";
import {
  LuFactory,
  LuClock,
  LuPanelsTopLeft,
} from "react-icons/lu";

import "./FasterByDesign.css";

// =====================================
// AWS API URL
// =====================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/fasterdesignadmin";

// =====================================
// FEATURES
// =====================================

const features = [
  {
    id: "indoors",
    title: "Factory-Made Precision",
    text: "Prefab components are manufactured and finished in a controlled environment.",
    Icon: LuFactory,
  },
  {
    id: "site",
    title: "Faster On-Site Assembly",
    text: "Efficient installation helps reduce on-site construction time.",
    Icon: LuClock,
  },
  {
    id: "change",
    title: "Flexible Future Upgrades",
    text: "Modular designs can offer greater flexibility for future extensions and modifications.",
    Icon: LuPanelsTopLeft,
  },
];

// =====================================
// CONVENTIONAL BUILD
// =====================================

const conventional = [
  { label: "Site prep", grow: 0.74 },
  { label: "Foundation", grow: 1 },
  { label: "Structure", grow: 1.25 },
  { label: "Walls & roof", grow: 1 },
  { label: "Finishes", grow: 1 },
];

// =====================================
// MAIN COMPONENT
// =====================================

const FasterByDesign = () => {
  const [active, setActive] = useState(0);

  const [content, setContent] = useState({
    name: "",
    subtitle: "",
    description: "",
  });

  // =====================================
  // FETCH DATA FROM AWS
  // =====================================

  useEffect(() => {
    const fetchFasterContent = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(
            "Unable to fetch Faster By Design content."
          );
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Get latest admin dashboard entry
          const latestData = data[0];

          setContent({
            name: latestData.name || "",
            subtitle: latestData.subtitle || "",
            description: latestData.description || "",
          });
        } else {
          setContent({
            name: "",
            subtitle: "",
            description: "",
          });
        }
      } catch (error) {
        console.error(
          "Error fetching Faster By Design content:",
          error
        );
      }
    };

    fetchFasterContent();
  }, []);

  // =====================================
  // JSX
  // =====================================

  return (
    <section className="fb-section">
      <div className="fb-container">

        <div className="fb-layout">

          {/* LEFT: TEXT */}

          <div className="fb-copy">

            <span className="fb-eyebrow">
              {content.name}
            </span>

            <h2 className="fb-title">
              {content.subtitle}
            </h2>

            <p className="fb-lead">
              {content.description}
            </p>

            {/* FEATURES */}

            <ul className="fb-features">

              {features.map(
                ({ id, title, text, Icon }, index) => (

                  <li
                    key={id}
                    className={`fb-feature ${
                      index === active ? "is-active" : ""
                    }`}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >

                    <span
                      className="fb-feature-icon"
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>

                    <div className="fb-feature-body">

                      <h3>{title}</h3>

                      <p>{text}</p>

                    </div>

                  </li>

                )
              )}

            </ul>

          </div>

          {/* RIGHT: SCHEMATIC */}

          <figure
            className="fb-diagram"
            aria-label="Schematic comparing a conventional build with a prefab steel build"
          >

            <p className="fb-label">
              Conventional build
            </p>

            <div className="fb-row">

              {conventional.map(({ label, grow }) => (

                <div
                  key={label}
                  className="fb-block fb-block--dark"
                  style={{ "--g": grow }}
                >
                  {label}
                </div>

              ))}

            </div>

            <p className="fb-label fb-label--prefab">

              <LuFactory aria-hidden="true" />

              <span>Steel Craft Prefab</span>

            </p>

            <div className="fb-prefab">

              <div className="fb-block fb-block--light fb-a-prep">
                Site prep &amp; foundation
              </div>

              <div className="fb-block fb-block--blue fb-a-fact">
                Factory fabrication
              </div>

              <div className="fb-block fb-block--blue fb-a-assembly">
                Assembly
              </div>

              <div className="fb-block fb-block--blue fb-a-finishes">
                Finishes
              </div>

              <div className="fb-block fb-block--free fb-a-time">
                Time back to you
              </div>

            </div>

            <figcaption className="fb-caption">
              Schematic only, not to scale. Real schedules depend on size, site
              and finish level.
            </figcaption>

          </figure>

        </div>

      </div>
    </section>
  );
};

export default FasterByDesign;
