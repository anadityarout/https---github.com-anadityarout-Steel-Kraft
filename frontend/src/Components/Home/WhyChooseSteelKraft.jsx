import React, { useState } from "react";
import "./WhyChooseSteelKraft.css";

import {
  FaDraftingCompass,
  FaLeaf,
  FaBolt,
  FaCoins,
  FaShieldAlt,
  FaHome,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaDraftingCompass />,
    title: "Modern Design",
    description: (
      <>
        Contemporary & elegant
        <br />
        architectural designs
      </>
    ),
  },

  {
    id: 2,
    icon: <FaLeaf />,
    title: "Sustainable",
    description: (
      <>
        Eco-friendly materials
        <br />
        & energy efficient
      </>
    ),
  },

  {
    id: 3,
    icon: <FaBolt />,
    title: "Quick Installation",
    description: (
      <>
        70-80% faster
        <br />
        than traditional construction
      </>
    ),
  },

  {
    id: 4,
    icon: <FaCoins />,
    title: "Cost Effective",
    description: <>Better value for money</>,
  },

  {
    id: 5,
    icon: <FaShieldAlt />,
    title: "Durable & Safe",
    description: (
      <>
        Built to last with high
        <br />
        quality steel structures
      </>
    ),
  },

  {
    id: 6,
    icon: <FaHome />,
    title: "End-to-End Support",
    description: (
      <>
        From design to delivery
        <br />
        we’re with you
      </>
    ),
  },
];

const WhyChooseSteelKraft = () => {
  const [activeId, setActiveId] = useState(null);

  const handleCardClick = (id) => {
    setActiveId(id);
  };

  return (
    <section className="steel-why-section">
      <div className="steel-why-container">

        {/* SECTION TITLE */}
        <div className="steel-why-header">
          <h2>Why Choose Steel Kraft?</h2>
        </div>

        {/* FEATURES */}
        <div className="steel-why-grid">

          {features.map((feature) => {
            const isActive = activeId === feature.id;

            return (
              <div
                key={feature.id}
                className={`steel-why-card ${
                  isActive ? "active" : ""
                }`}
                onClick={() => handleCardClick(feature.id)}
                onTouchStart={() => handleCardClick(feature.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleCardClick(feature.id);
                  }
                }}
              >

                {/* ICON CIRCLE */}
                <div className="steel-why-icon">
                  {feature.icon}
                </div>

                {/* TITLE */}
                <h3>{feature.title}</h3>

                {/* DESCRIPTION */}
                <div className="steel-why-description">
                  {feature.description}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default WhyChooseSteelKraft;