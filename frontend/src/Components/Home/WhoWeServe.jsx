import React, { useState, useRef } from "react";
import {
  LuTractor,
  LuHotel,
  LuMountain,
  LuTreePalm,
  LuTent,
  LuHouse,
} from "react-icons/lu";
import "./WhoWeServe.css";

import farmhouse from "../../assets/farmhouse.jpg";
import resort from "../../assets/resort.jpg";
import hillCottage from "../../assets/hill-cottage.jpg";
import beachVilla from "../../assets/beach-villa.jpg";
import glampingResort from "../../assets/glamping-resort.jpg";
import holidayHome from "../../assets/holiday-home.jpg";

/* Edit the name and description of every application here */
const applications = [
  {
    id: "farm-house",
    name: "Farm House",
    description:
      "Quiet, light-filled homes set among fields and orchards, built for slow weekends or full-time country living.",
    image: farmhouse,
    Icon: LuTractor,
  },
  {
    id: "resort",
    name: "Resort",
    description:
      "Guest rooms and villas in one consistent design, with finishes made for daily hospitality use and easy to extend as your property grows.",
    image: resort,
    Icon: LuHotel,
  },
  {
    id: "hill-cottage",
    name: "Hill Cottage",
    description:
      "Warm timber cottages designed for slopes, cool nights and mountain views.",
    image: hillCottage,
    Icon: LuMountain,
  },
  {
    id: "beach-villa",
    name: "Beach Villa",
    description:
      "Open, airy villas made for sea air and sun, using materials chosen to handle salt and humidity.",
    image: beachVilla,
    Icon: LuTreePalm,
  },
  {
    id: "glamping-resort",
    name: "Glamping Resort",
    description:
      "Elevated tents and cabins with comfortable interiors, quick to install so guests enjoy the outdoors without giving up comfort.",
    image: glampingResort,
    Icon: LuTent,
  },
  {
    id: "holiday-home",
    name: "Holiday Home",
    description:
      "Private getaways for families and renters, designed to be low-maintenance and comfortable all year round.",
    image: holidayHome,
    Icon: LuHouse,
  },
];

const WhoWeServe = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const current = applications[active];
  const CurrentIcon = current.Icon;

  const handleKeyDown = (e) => {
    const last = applications.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;

    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section className="ws-section">
      <div className="ws-container">
        {/* HEADER (centered) */}
        <div className="ws-header">
          <span className="ws-label">Applications</span>
          <h2>From first call to the keys, in five steps</h2>
          <span className="ws-rule" aria-hidden="true" />
          <p>Select an application to see what we build.</p>
        </div>

        {/* STEPPER */}
        <div
          className="ws-steps"
          role="tablist"
          aria-label="Applications"
          onKeyDown={handleKeyDown}
        >
          {applications.map((app, index) => (
            <button
              key={app.id}
              ref={(el) => (tabRefs.current[index] = el)}
              id={`ws-tab-${app.id}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="ws-panel"
              tabIndex={index === active ? 0 : -1}
              className={`ws-step ${index === active ? "is-active" : ""} ${
                index < active ? "is-done" : ""
              }`}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <span className="ws-step-circle">{index + 1}</span>
              <span className="ws-step-label">{app.name}</span>
            </button>
          ))}
        </div>

        {/* DETAIL CARD */}
        <div
          key={current.id}
          id="ws-panel"
          className="ws-card"
          role="tabpanel"
          aria-labelledby={`ws-tab-${current.id}`}
        >
          <div className="ws-media">
            <img src={current.image} alt={current.name} decoding="async" />
            <span className="ws-badge" aria-hidden="true">
              <CurrentIcon />
            </span>
          </div>

          <div className="ws-body">
            <h3>{current.name}</h3>
            <p>{current.description}</p>
          </div>
        </div>

        {/* CTA (delete this block if you do not want the button) */}
        
      </div>
    </section>
  );
};

export default WhoWeServe;
