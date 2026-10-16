
import React, { useEffect, useState } from "react";
import "./GetQuote.css";

const GET_QUOTE_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/getquote";

const PROJECT_TYPES = [
  "Prefab home",
  "Modular villa",
  "Resort / hospitality cottages",
  "Farmhouse / second home",
  "Café, office or site building",
  "Not sure yet",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  location: "",
  projectType: "Prefab home",
  design: "",
  message: "",
};

export default function GetQuote() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const openPopup = () => {
      setSubmitMessage("");
      setSubmitSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener("open-quote-popup", openPopup);

    return () => {
      window.removeEventListener("open-quote-popup", openPopup);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, submitting]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitMessage) {
      setSubmitMessage("");
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitMessage("");
    setSubmitSuccess(false);

    try {
      const response = await fetch(GET_QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your quote request."
        );
      }

      setSubmitSuccess(true);
      setSubmitMessage(
        "Thank you! Your quote request has been submitted successfully."
      );
      setFormData({ ...INITIAL_FORM });
    } catch (error) {
      console.error("Get Quote submission error:", error);

      setSubmitSuccess(false);
      setSubmitMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="sk-quote-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !submitting
        ) {
          setIsOpen(false);
        }
      }}
    >
      <section
        className="sk-quote-card sk-quote-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sk-quote-title"
      >
        <button
          type="button"
          className="sk-quote-close"
          onClick={() => !submitting && setIsOpen(false)}
          aria-label="Close quote form"
          disabled={submitting}
        >
          &times;
        </button>

        <div className="sk-quote-header">
          <h2 id="sk-quote-title">Get a Quote</h2>
          <p>Fields marked * are required.</p>
        </div>

        <form className="sk-quote-form" onSubmit={handleSubmit}>
          <div className="sk-quote-grid">
            <div className="sk-quote-field">
              <label htmlFor="quote-name">Name *</label>
              <input
                id="quote-name"
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                disabled={submitting}
              />
            </div>

            <div className="sk-quote-field">
              <label htmlFor="quote-phone">Phone *</label>
              <input
                id="quote-phone"
                type="tel"
                name="phone"
                placeholder="+91"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                disabled={submitting}
              />
            </div>

            <div className="sk-quote-field">
              <label htmlFor="quote-email">Email</label>
              <input
                id="quote-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={submitting}
              />
            </div>

            <div className="sk-quote-field">
              <label htmlFor="quote-location">Plot location</label>
              <input
                id="quote-location"
                type="text"
                name="location"
                placeholder="City or town"
                value={formData.location}
                onChange={handleChange}
                autoComplete="address-level2"
                disabled={submitting}
              />
            </div>

            <div className="sk-quote-field">
              <label htmlFor="quote-project-type">
                Project type
              </label>
              <select
                id="quote-project-type"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                disabled={submitting}
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="sk-quote-field">
              <label htmlFor="quote-design">
                Design of interest
              </label>
              <input
                id="quote-design"
                type="text"
                name="design"
                placeholder="e.g. A-Frame Cottage"
                value={formData.design}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            <div className="sk-quote-field sk-quote-message">
              <label htmlFor="quote-message">
                Anything else we should know?
              </label>
              <textarea
                id="quote-message"
                name="message"
                placeholder="Size, timeline, budget range, number of units..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                disabled={submitting}
              />
            </div>
          </div>

          {submitMessage && (
            <p
              role="status"
              aria-live="polite"
              style={{
                color: submitSuccess ? "#16803d" : "#c62828",
                margin: "12px 0",
              }}
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            className="sk-quote-submit"
            disabled={submitting}
          >
            <span>
              {submitting ? "Submitting..." : "Request my quote"}
            </span>
            <span aria-hidden="true" className="sk-quote-arrow">
              {submitting ? "…" : "→"}
            </span>
          </button>
        </form>
      </section>
    </div>
  );
}
