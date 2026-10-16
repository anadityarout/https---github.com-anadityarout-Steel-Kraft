
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Open popup from existing Get a Quote buttons
  useEffect(() => {
    const openPopup = () => {
      setIsOpen(true);
      setIsSuccess(false);
      setErrorMessage("");
    };

    window.addEventListener("open-quote-popup", openPopup);

    return () => {
      window.removeEventListener("open-quote-popup", openPopup);
    };
  }, []);

  // Lock page scrolling and support Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
    // closePopup is stable in behavior and uses component state setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setFormData(INITIAL_FORM);
    setErrorMessage("");
    setSubmitting(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
  };

  // Submit quote to AWS API Gateway
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(GET_QUOTE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          location: formData.location.trim(),
          projectType: formData.projectType,
          design: formData.design.trim(),
          message: formData.message.trim(),
          source: "get-a-quote",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your quote request."
        );
      }

      // Show thank-you screen only after API success
      setIsSuccess(true);
    } catch (error) {
      console.error("Get a Quote submission error:", error);

      setErrorMessage(
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
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <section
        className={`sk-quote-card sk-quote-modal ${
          isSuccess ? "sk-quote-success-modal" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sk-quote-title"
      >
        <button
          type="button"
          className="sk-quote-close"
          onClick={closePopup}
          aria-label="Close popup"
        >
          &times;
        </button>

        {isSuccess ? (
          // ==========================================
          // THANK YOU SCREEN
          // ==========================================
          <div className="sk-quote-success">
            <h2 id="sk-quote-title">Thank you!</h2>

            <p>
              We've received your quote request and will
              get in touch with you within 24 hours.
            </p>

            <button
              type="button"
              className="sk-quote-success-close"
              onClick={closePopup}
            >
              CLOSE
            </button>
          </div>
        ) : (
          // ==========================================
          // QUOTE FORM
          // ==========================================
          <>
            <div className="sk-quote-header">
              <h2 id="sk-quote-title">Get a Quote</h2>
              <p>Fields marked * are required.</p>
            </div>

            <form
              className="sk-quote-form"
              onSubmit={handleSubmit}
            >
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
                  />
                </div>

                <div className="sk-quote-field">
                  <label htmlFor="quote-location">
                    Plot location
                  </label>
                  <input
                    id="quote-location"
                    type="text"
                    name="location"
                    placeholder="City or town"
                    value={formData.location}
                    onChange={handleChange}
                    autoComplete="address-level2"
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
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="sk-quote-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="sk-quote-submit"
                disabled={submitting}
              >
                <span>
                  {submitting
                    ? "Submitting..."
                    : "Request my quote"}
                </span>

                <span
                  aria-hidden="true"
                  className="sk-quote-arrow"
                >
                  →
                </span>
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
