
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Image as ImageIcon,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Banner.css";

// ==========================================
// AWS API GATEWAY
// ==========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD BANNERS FROM AWS
  // ==========================================

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load banner content."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid banner data received.");
      }

      setBanners(data);
    } catch (err) {
      console.error("Load banners error:", err);
      setError(err.message || "Unable to load banner content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setName("");
    setSubtitle("");
    setDescription("");
    setShowForm(false);
  };

  // ==========================================
  // SAVE BANNER TO AWS
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedSubtitle = subtitle.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedName &&
      !trimmedSubtitle &&
      !trimmedDescription
    ) {
      alert("Please enter a name, subtitle, or description.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          subtitle: trimmedSubtitle,
          description: trimmedDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save banner."
        );
      }

      if (data.banner) {
        setBanners((previous) => [
          ...previous,
          data.banner,
        ]);
      } else {
        await fetchBanners();
      }

      resetForm();
      alert("Banner content saved successfully!");
    } catch (err) {
      console.error("Save banner error:", err);
      setError(err.message || "Unable to save banner.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE BANNER FROM AWS
  // ==========================================

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this entry?")) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete banner."
        );
      }

      setBanners((previous) =>
        previous.filter(
          (banner) => String(banner.id) !== String(id)
        )
      );
    } catch (err) {
      console.error("Delete banner error:", err);
      setError(err.message || "Unable to delete banner.");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="banner-admin">
      {/* HEADER */}

      <div className="banner-page-header">
        <div className="banner-heading">
          <span className="banner-heading-icon">
            <ImageIcon size={22} />
          </span>

          <div>
            <h1>Home Banner</h1>
            <p>Manage your home banner content.</p>
          </div>
        </div>

        {!showForm && (
          <button
            type="button"
            className="banner-add-button"
            onClick={() => {
              setError("");
              setShowForm(true);
            }}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          role="alert"
          style={{
            margin: "16px 0",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "#fff1f0",
            color: "#b42318",
          }}
        >
          {error}

          <button
            type="button"
            onClick={fetchBanners}
            disabled={loading}
            style={{ marginLeft: "12px", cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ADD FORM */}

      {showForm && (
        <form className="banner-form" onSubmit={handleSave}>
          <div className="banner-form-header">
            <h2>Add Banner Content</h2>
            <p>
              Enter a name, subtitle, description, or any
              combination of these fields.
            </p>
          </div>

          <div className="banner-form-body">
            {/* NAME */}

            <div className="banner-field">
              <label htmlFor="banner-name">
                Name
              </label>

              <input
                id="banner-name"
                type="text"
                placeholder="Enter banner name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                disabled={saving}
              />
            </div>

            {/* SUBTITLE */}

            <div className="banner-field">
              <label htmlFor="banner-subtitle">
                Subtitle
              </label>

              <input
                id="banner-subtitle"
                type="text"
                placeholder="Enter banner subtitle"
                value={subtitle}
                onChange={(event) =>
                  setSubtitle(event.target.value)
                }
                disabled={saving}
              />
            </div>

            {/* DESCRIPTION */}

            <div className="banner-field">
              <label htmlFor="banner-description">
                Description
              </label>

              <textarea
                id="banner-description"
                rows={4}
                placeholder="Enter banner description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                disabled={saving}
              />
            </div>
          </div>

          {/* FORM ACTIONS */}

          <div className="banner-form-actions">
            <button
              type="submit"
              className="banner-save-button"
              disabled={saving}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="banner-cancel-button"
              onClick={resetForm}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SAVED TABLE */}

      {loading ? (
        <div className="banner-empty-state">
          <p>Loading banner content...</p>
        </div>
      ) : banners.length > 0 ? (
        <div className="banner-table-wrapper">
          <table className="banner-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Type</th>
                <th>Name</th>
                <th>Subtitle</th>
                <th>Description</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner.id}>
                  <td>{index + 1}</td>

                  <td>{banner.type || "Text"}</td>

                  <td className="banner-table-name">
                    {banner.name || "—"}
                  </td>

                  <td className="banner-table-description">
                    {banner.subtitle || "—"}
                  </td>

                  <td className="banner-table-description">
                    {banner.description || "—"}
                  </td>

                  <td>{banner.created || "—"}</td>

                  <td>
                    <button
                      type="button"
                      className="banner-delete-button"
                      onClick={() => handleDelete(banner.id)}
                      disabled={deletingId === banner.id}
                      aria-label={`Delete entry ${index + 1}`}
                    >
                      <Trash2 size={16} />

                      {deletingId === banner.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showForm && (
          <div className="banner-empty-state">
            <ImageIcon size={34} strokeWidth={1.5} />

            <h3>No banner content added yet</h3>

            <p>
              Click Add to enter a name, subtitle, or description.
            </p>
          </div>
        )
      )}
    </section>
  );
}
