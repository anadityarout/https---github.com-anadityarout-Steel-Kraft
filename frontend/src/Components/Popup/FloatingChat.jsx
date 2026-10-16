
import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  ArrowUp,
  X,
  Bot,
  Send,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import "./FloatingChat.css";

// =====================================================
// AWS API GATEWAY
// =====================================================

const FLOATING_CHAT_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/floatingchat";

// =====================================================
// PROJECT TYPES
// =====================================================

const PROJECT_TYPES = [
  "Prefab home",
  "Modular villa",
  "Resort / hospitality cottages",
  "Farmhouse / second home",
  "Café, office or site building",
  "Not sure yet",
];

// =====================================================
// CHAT QUESTIONS
// =====================================================

const questions = [
  {
    key: "name",
    text: "First, may I know your name?",
    placeholder: "Enter your full name",
    type: "text",
    autoComplete: "name",
  },
  {
    key: "email",
    text: "Nice to meet you! What is your email address?",
    placeholder: "Enter your email",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "location",
    text: "Which city or location are you from?",
    placeholder: "Enter your city or location",
    type: "text",
    autoComplete: "address-level2",
  },
  {
    key: "phone",
    text: "Please enter your phone number.",
    placeholder: "Enter your phone number",
    type: "tel",
    autoComplete: "tel",
  },
  {
    key: "projectType",
    text: "What type of project are you interested in?",
    type: "options",
    options: PROJECT_TYPES,
  },
  {
    key: "design",
    text: "Do you have a particular design in mind?",
    placeholder: "e.g. A-Frame Cottage",
    type: "text",
    optional: true,
  },
  {
    key: "notes",
    text: "Anything else we should know?",
    placeholder: "Size, timeline, budget range, number of units...",
    type: "textarea",
    optional: true,
  },
];

// =====================================================
// INITIAL CHAT DETAILS
// =====================================================

const emptyDetails = {
  name: "",
  email: "",
  location: "",
  phone: "",
  projectType: "",
  design: "",
  notes: "",
};

// =====================================================
// BOT MESSAGE
// =====================================================

const BotMessage = ({ children }) => (
  <div className="sk-chat-bot-group">
    <div className="sk-chat-welcome-icon">
      <Bot size={24} />
    </div>

    <div className="sk-chat-bubble sk-chat-bot">
      {children}
    </div>
  </div>
);

// =====================================================
// FLOATING CHAT COMPONENT
// =====================================================

const FloatingChat = () => {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [details, setDetails] = useState(emptyDetails);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const bodyRef = useRef(null);
  const formRef = useRef(null);
  const fieldRef = useRef(null);

  const showsOptions =
    !isFinished &&
    step < questions.length &&
    questions[step]?.type === "options";

  // ===================================================
  // SCROLL TO LATEST MESSAGE
  // ===================================================

  useEffect(() => {
    if (!isOpen || !bodyRef.current) return;

    bodyRef.current.scrollTop =
      bodyRef.current.scrollHeight;
  }, [isOpen, step, isSaving, saveError, isFinished]);

  // ===================================================
  // FOCUS CURRENT INPUT
  // ===================================================

  useEffect(() => {
    if (isOpen && fieldRef.current && !isSaving) {
      fieldRef.current.focus();
    }
  }, [isOpen, step, isSaving]);

  // ===================================================
  // CLOSE CHAT WITH ESCAPE
  // ===================================================

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSaving) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSaving]);

  // ===================================================
  // OPEN AND CLOSE CHAT
  // ===================================================

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    if (!isSaving) {
      setIsOpen(false);
    }
  };

  // ===================================================
  // SUBMIT ANSWER AND SAVE FINAL DETAILS TO AWS
  // ===================================================

  const submitValue = async (rawValue) => {
    if (isSaving || isFinished || step >= questions.length) {
      return;
    }

    const current = questions[step];
    const value = String(rawValue ?? "").trim();

    if (!value && !current.optional) {
      return;
    }

    // Validate email.
    if (current.key === "email") {
      const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!emailValid) {
        setSaveError("Please enter a valid email address.");
        return;
      }
    }

    // Validate phone number.
    if (current.key === "phone") {
      const digits = value.replace(/\D/g, "");

      if (digits.length < 10 || digits.length > 15) {
        setSaveError(
          "Please enter a valid phone number with 10 to 15 digits."
        );
        return;
      }
    }

    const updatedDetails = {
      ...details,
      [current.key]: value,
    };

    setDetails(updatedDetails);
    setAnswer("");
    setSaveError("");

    // Continue to the next question.
    if (step < questions.length - 1) {
      setStep((previous) => previous + 1);
      return;
    }

    // Final question: save all answers to AWS.
    setIsSaving(true);

    try {
      const response = await fetch(FLOATING_CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save your enquiry. Please try again."
        );
      }

      // Show thank-you message only after successful save.
      setIsFinished(true);
      setStep(questions.length);
      setSaveError("");
    } catch (error) {
      console.error("Floating Chat API error:", error);

      // Keep the last answer so the customer can retry.
      setAnswer(value);

      setSaveError(
        error.message ||
          "Unable to save your details. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ===================================================
  // FORM SUBMIT
  // ===================================================

  const handleSubmit = (event) => {
    event.preventDefault();
    submitValue(answer);
  };

  // ===================================================
  // TEXTAREA KEYBOARD HANDLING
  // ===================================================

  const handleTextareaKeyDown = (event) => {
    // Enter sends; Shift + Enter adds a new line.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  // ===================================================
  // RESET CHAT
  // ===================================================

  const resetChat = () => {
    if (isSaving) return;

    setStep(0);
    setAnswer("");
    setDetails({ ...emptyDetails });
    setSaveError("");
    setIsFinished(false);
  };

  // ===================================================
  // SCROLL TO TOP
  // ===================================================

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // RENDER CURRENT INPUT
  // ===================================================

  const renderField = () => {
    if (step >= questions.length) return null;

    const current = questions[step];

    if (current.type === "textarea") {
      return (
        <textarea
          key={current.key}
          ref={fieldRef}
          className="sk-chat-textarea"
          rows={3}
          placeholder={current.placeholder}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          onKeyDown={handleTextareaKeyDown}
          aria-label={current.placeholder}
          disabled={isSaving}
        />
      );
    }

    return (
      <input
        key={current.key}
        ref={fieldRef}
        type={current.type}
        placeholder={current.placeholder}
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        autoComplete={current.autoComplete}
        aria-label={current.placeholder}
        required={!current.optional}
        disabled={isSaving}
      />
    );
  };

  // Keep the chatbot on the homepage only.
  if (pathname !== "/") return null;

  // ===================================================
  // JSX
  // ===================================================

  return (
    <>
      {/* FLOATING BUTTONS */}
      <div className="floating-actions">
        <button
          type="button"
          className="floating-chat-outer"
          onClick={openChat}
          aria-label="Open Steel Craft chat"
        >
          <span className="floating-chat-inner">
            <MessageCircle className="floating-chat-icon" />
          </span>
        </button>

        <button
          type="button"
          className="floating-scroll-top"
          onClick={handleScrollTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="floating-up-icon" />
        </button>
      </div>

      {/* CHAT WINDOW */}
      {isOpen && (
        <section
          className="sk-chat-window"
          aria-label="Steel Craft Prefab chatbot"
        >
          {/* HEADER */}
          <header className="sk-chat-header">
            <div className="sk-chat-brand">
              <Bot size={21} />
              <span>Steel Craft Prefab</span>
            </div>

            <button
              type="button"
              className="sk-chat-close"
              onClick={closeChat}
              aria-label="Close chat"
              disabled={isSaving}
            >
              <X size={22} />
            </button>
          </header>

          {/* CHAT BODY */}
          <div className="sk-chat-body" ref={bodyRef}>
            <BotMessage>
              Hello! Welcome to Steel Craft Prefab. Let's find
              the perfect prefab solution for you.
            </BotMessage>

            {/* QUESTIONS AND ANSWERS */}
            {questions.map((question, index) => {
              if (index > step) return null;

              const answered = index < step;
              const savedValue = details[question.key];

              return (
                <React.Fragment key={question.key}>
                  <BotMessage>{question.text}</BotMessage>

                  {/* PROJECT TYPE OPTIONS */}
                  {!answered && question.type === "options" && (
                    <div
                      className="sk-chat-options"
                      role="group"
                      aria-label={question.text}
                    >
                      {question.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="sk-chat-option"
                          onClick={() => submitValue(option)}
                          disabled={isSaving}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* PREVIOUS ANSWER */}
                  {answered && (
                    <div className="sk-chat-bubble sk-chat-user">
                      {savedValue || "Skipped"}
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* SAVING MESSAGE */}
            {isSaving && (
              <BotMessage>
                Saving your details securely. Please wait...
              </BotMessage>
            )}

            {/* ERROR MESSAGE */}
            {saveError && (
              <BotMessage>
                {saveError}
                {step === questions.length - 1 &&
                  !isSaving &&
                  !isFinished &&
                  " Your last answer is still available. Press Send to retry."}
              </BotMessage>
            )}

            {/* SUCCESS MESSAGE */}
            {isFinished && (
              <>
                <BotMessage>
                  Thank you, {details.name}! Your details have
                  been saved successfully. Our team can assist
                  you with your prefab requirements.
                </BotMessage>

                <button
                  type="button"
                  className="sk-chat-restart"
                  onClick={resetChat}
                >
                  Start a new conversation
                </button>
              </>
            )}
          </div>

          {/* INPUT AREA */}
          {!isFinished && !showsOptions && (
            <form
              className="sk-chat-input-area"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {renderField()}

              <button
                type="submit"
                className="sk-chat-send"
                aria-label="Submit answer"
                disabled={isSaving}
              >
                <Send size={19} />
              </button>
            </form>
          )}
        </section>
      )}
    </>
  );
};

export default FloatingChat;
