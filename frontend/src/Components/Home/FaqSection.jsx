import { useState } from "react";
import "./FaqSection.css";
import faqImg from "../../assets/faq.png"; // src/assets/faq.png

const FAQS = [
  {
    q: "How long does a prefab steel build take?",
    a: "Most projects are ready in 6–12 weeks depending on size and finish. Factory work runs in parallel with your site prep, so there is far less waiting on site.",
  },
  {
    q: "Do I still need a foundation?",
    a: "Yes. A light, simple foundation is still needed, but steel is much lighter than masonry, so it is quicker and cheaper to build than a conventional one.",
  },
  {
    q: "Can the design be customised?",
    a: "Yes. Layout, size, cladding, interiors and fittings can all be tailored. Share your plan or idea and we will adapt it.",
  },
  {
    q: "Is steel suitable for hills, heat and monsoon?",
    a: "Yes. We use galvanised, weather-treated steel with insulated panels, designed for heavy rain, high winds and wide temperature swings.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes. We deliver and install across India, including remote hill locations. Delivery time depends on distance and road access.",
  },
];

export default function FaqSection({
  image = faqImg,
  imageLabel = "Guest room",
  contactHref = "/contact",
}) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="fq-section" id="faq">
      <div className="fq-container">
        {/* HEADER (always centered) */}
        <div className="fq-header">
          <p className="fq-label">Questions</p>
          <h2>Before you ask</h2>
          <span className="fq-rule" aria-hidden="true" />
          <p className="fq-sub">
            Short answers to what people ask most. Anything else, send us a note.
          </p>
        </div>

        {/* BODY */}
        <div className="fq-body">
          <figure className="fq-media">
            <img src={image} alt={imageLabel} loading="lazy" />
            <figcaption className="fq-tag">{imageLabel}</figcaption>
          </figure>

          <div className="fq-list">
            {FAQS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={i} className={`fq-item ${open ? "is-open" : ""}`}>
                  <h3 className="fq-heading">
                    <button
                      type="button"
                      className="fq-question"
                      aria-expanded={open}
                      aria-controls={`fq-panel-${i}`}
                      id={`fq-btn-${i}`}
                      onClick={() => toggle(i)}
                    >
                      <span>{item.q}</span>
                      <span className="fq-icon" aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    id={`fq-panel-${i}`}
                    role="region"
                    aria-labelledby={`fq-btn-${i}`}
                    className="fq-panel"
                  >
                    <div className="fq-panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA (centered) */}
        <div className="fq-cta">
          <a href={contactHref} className="fq-btn">
            Ask a question
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
