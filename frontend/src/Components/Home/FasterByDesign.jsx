import React, { useState } from "react";
import { LuFactory, LuClock, LuPanelsTopLeft } from "react-icons/lu";
import "./FasterByDesign.css";

/* Edit the text of the three items here */
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

/* "grow" only sets the relative width of each block (schematic, not to scale) */
const conventional = [
  { label: "Site prep", grow: 0.74 },
  { label: "Foundation", grow: 1 },
  { label: "Structure", grow: 1.25 },
  { label: "Walls & roof", grow: 1 },
  { label: "Finishes", grow: 1 },
];

const FasterByDesign = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="fb-section">
      <div className="fb-container">
        <div className="fb-layout">
          {/* ---------- LEFT: TEXT ---------- */}
          <div className="fb-copy">
            <span className="fb-eyebrow">Faster by design</span>

            {/* Two lines on desktop: each span is one line */}
            <h2 className="fb-title">
  Faster Prefab Construction
  <br />
  with Smart Planning
</h2>
            
            <p className="fb-lead">
              Steel Craft combines factory fabrication with on-site preparation to deliver efficient prefab homes, cottages, villas, and resort buildings.
            </p>

            <ul className="fb-features">
              {features.map(({ id, title, text, Icon }, index) => (
                <li
                  key={id}
                  className={`fb-feature ${index === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="fb-feature-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="fb-feature-body">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- RIGHT: SCHEMATIC ---------- */}
          <figure
            className="fb-diagram"
            aria-label="Schematic comparing a conventional build with a prefab steel build"
          >
            <p className="fb-label">Conventional build</p>

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
