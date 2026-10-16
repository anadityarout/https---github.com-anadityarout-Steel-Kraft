
import React, { useEffect, useState } from "react";
import "./Popup.css";

 const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/popup";
  
// =====================================================
// SETTINGS
// =====================================================


// Popup opens 1.2 seconds after the Home page loads.
const OPEN_DELAY = 1200;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
};

function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  // =====================================================
  // OPEN POPUP AFTER PAGE LOAD
  // =====================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY);

    return () => clearTimeout(timer);
  }, []);

  // =====================================================
  // LOCK BACKGROUND SCROLL
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // =====================================================
  // CLOSE WITH ESCAPE KEY
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // =====================================================
  // FORM HANDLERS
  // =====================================================

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (status === "error") {
      setStatus("idle");
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    const digits = form.phone.replace(/\D/g, "");

    if (!digits) {
      newErrors.phone = "Please enter your phone number.";
    } else if (digits.length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Please enter your location.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    // Do not pretend that data was saved if the API is missing.
    if (!API_URL) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "consultation-popup",
        }),
      });

      if (!response.ok) {
        throw new Error("Consultation request failed.");
      }

      setStatus("success");
      setForm(initialForm);
      setErrors({});

      // Close after the thank-you message is displayed.
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 2500);
    } catch (error) {
      console.error("Consultation submission failed:", error);
      setStatus("error");
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  if (!isOpen) return null;

  return (
    <div
      className="sk-popup-overlay"
      onClick={closePopup}
      role="presentation"
    >
      <div
        className="sk-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sk-popup-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="sk-popup-close"
          onClick={closePopup}
          aria-label="Close consultation popup"
        >
          &times;
        </button>

        {status === "success" ? (
          /* SUCCESS MESSAGE */

          <div className="sk-popup-success">
            <div className="sk-popup-tick">&#10003;</div>

            <h2 id="sk-popup-title">Thank You!</h2>

            <p>
              Your consultation request has been received.
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* HEADING */}

            <h2 id="sk-popup-title" className="sk-popup-title">
              Get Free Consultation
            </h2>

            <p className="sk-popup-sub">
              Connect with our experts and explore how we can
              transform your vision into reality.
            </p>

            {/* FORM */}

            <form onSubmit={handleSubmit} noValidate>
              <div className="sk-popup-grid">
                {/* FULL NAME */}

                <div className="sk-popup-field">
                  <label htmlFor="sk-name">FULL NAME *</label>

                  <input
                    id="sk-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className={errors.name ? "has-error" : ""}
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <span className="sk-popup-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* EMAIL */}

                <div className="sk-popup-field">
                  <label htmlFor="sk-email">EMAIL ADDRESS *</label>

                  <input
                    id="sk-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className={errors.email ? "has-error" : ""}
                    aria-invalid={Boolean(errors.email)}
                  />

                  {errors.email && (
                    <span className="sk-popup-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* PHONE */}

                <div className="sk-popup-field">
                  <label htmlFor="sk-phone">PHONE NUMBER *</label>

                  <input
                    id="sk-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className={errors.phone ? "has-error" : ""}
                    aria-invalid={Boolean(errors.phone)}
                  />

                  {errors.phone && (
                    <span className="sk-popup-error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* LOCATION */}

                <div className="sk-popup-field">
                  <label htmlFor="sk-location">LOCATION *</label>

                  <input
                    id="sk-location"
                    type="text"
                    name="location"
                    placeholder="City, State"
                    value={form.location}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    className={errors.location ? "has-error" : ""}
                    aria-invalid={Boolean(errors.location)}
                  />

                  {errors.location && (
                    <span className="sk-popup-error">
                      {errors.location}
                    </span>
                  )}
                </div>
              </div>

              {/* SUBMISSION ERROR */}

              {status === "error" && (
                <p
                  className="sk-popup-error sk-popup-error-main"
                  role="alert"
                >
                  {!API_URL
                    ? "The consultation form is not connected to the backend yet."
                    : "Unable to submit your request. Please try again."}
                </p>
              )}

              {/* BUTTONS */}

              <div className="sk-popup-actions">
                <button
                  type="submit"
                  className="sk-popup-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? "Sending..."
                    : "Request Consultation"}
                </button>

                <button
                  type="button"
                  className="sk-popup-cancel"
                  onClick={closePopup}
                >
                  Cancel
                </button>
              </div>

              {/* PRIVACY MESSAGE */}

              <p className="sk-popup-privacy">
                We respect your privacy. Your information is secure with us.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Popup;
