import React from "react";
import "./WhyChooseBar.css";

const WhyChooseBar = () => {
  const features = [
    {
      title: "Sustainable",
      subtitle: "Living",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M38 8C22 9 11 16 10 29c-1 8 5 12 11 10 10-3 16-13 17-31Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 40c7-9 14-15 24-21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      title: "Faster",
      subtitle: "Construction",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M27 4 11 27h12l-2 17 16-24H25l2-16Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      title: "Cost",
      subtitle: "Efficient",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="24"
            cy="24"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />

          <path
            d="M24 5v6M24 37v6M5 24h6M37 24h6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <path
            d="m10.5 10.5 4.2 4.2M33.3 33.3l4.2 4.2M37.5 10.5l-4.2 4.2M14.7 33.3l-4.2 4.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <circle
            cx="24"
            cy="24"
            r="17"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },

    {
      title: "High",
      subtitle: "Durability",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="m24 5 17 7v10c0 10-7 17-17 21C14 39 7 32 7 22V12l17-7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          <path
            d="m17 24 5 5 10-11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      title: "Customizable",
      subtitle: "Designs",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="m6 23 18-16 18 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M10 21v20h28V21"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          <path
            d="M19 41V29h10v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          <path
            d="M17 17h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      title: "Pan India",
      subtitle: "Service",
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle
            cx="17"
            cy="17"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />

          <circle
            cx="31"
            cy="17"
            r="7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />

          <path
            d="M4 40c1-8 6-12 13-12s12 4 13 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <path
            d="M25 30c2-2 4-3 7-3 7 0 11 5 12 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="sk-feature-bar">
      <div className="sk-feature-container">
        {features.map((feature, index) => (
          <div className="sk-feature-item" key={index}>
            <div className="sk-feature-icon">
              {feature.icon}
            </div>

            <div className="sk-feature-content">
              <span>{feature.title}</span>
              <span>{feature.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseBar;