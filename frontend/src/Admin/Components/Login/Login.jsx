
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // Demo credentials
    const validUsername = "anaditya";
    const validPassword = "admin123";

    if (
      username.trim() === validUsername &&
      password === validPassword
    ) {
      // Save login state for this browser session
      sessionStorage.setItem(
        "royalKraftAdminLoggedIn",
        "true"
      );

      // Update the parent App.jsx login state
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        // Fallback when Login is used as a separate route
        navigate("/admin", { replace: true });
      }
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="rk-login-page">
      <div className="rk-login-card">
        <header className="rk-login-brand">
          <h1>The Steel Craft</h1>
          <p>ADMIN PANEL</p>
          <span className="rk-brand-divider" />
        </header>

        <section className="rk-login-content">
          <h2>Sign In</h2>

          <p className="rk-login-description">
            Enter your credentials to access the admin panel.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="rk-form-group">
              <label htmlFor="rk-username">USERNAME</label>

              <input
                id="rk-username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                autoComplete="username"
                required
              />
            </div>

            <div className="rk-form-group">
              <label htmlFor="rk-password">PASSWORD</label>

              <div className="rk-password-wrapper">
                <input
                  id="rk-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="rk-password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rk-login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="rk-login-submit"
            >
              SIGN IN <span aria-hidden="true">→</span>
            </button>
          </form>

          <button
            type="button"
            className="rk-back-website"
            onClick={() => navigate("/")}
          >
            ← Back to Website
          </button>
        </section>
      </div>
    </div>
  );
}
