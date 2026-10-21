
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  X,
  Trash2,
  RefreshCw,
} from "lucide-react";

import "./SeoAdmin.css";

// ==========================================
// AWS API CONFIGURATION
// ==========================================

const SEO_API =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/seo";

const PAGE_OPTIONS = [
  "Home",
  "Project",
  "Home & Cottage",
  "Contact",
];

const initialForm = {
  page: "",
  metaTitle: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  altText: "",
};

// ==========================================
// SEO ADMIN COMPONENT
// ==========================================

export default function SEOAdmin() {
  const [seoItems, setSeoItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD SEO DATA FROM LAMBDA / S3
  // ==========================================

  const loadSEO = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(SEO_API, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load SEO (${res.status}).`);
      }

      const data = await res.json();

      // Supports both an array response and
      // { success: true, items: [...] }.
      const items = Array.isArray(data)
        ? data
        : Array.isArray(data.items)
          ? data.items
          : null;

      if (!items) {
        throw new Error("Invalid SEO data returned by the API.");
      }

      setSeoItems(items);
    } catch (err) {
      console.error("Load SEO error:", err);
      setError(
        err.message ||
          "Unable to load SEO data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSEO();
  }, [loadSEO]);

  // ==========================================
  // FORM HANDLERS
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleAdd = () => {
    setFormData({ ...initialForm });
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleCancel = () => {
    setFormData({ ...initialForm });
    setShowForm(false);
    setError("");
  };

  // ==========================================
  // SAVE SEO THROUGH API GATEWAY
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.page) {
      setError("Please select a page.");
      return;
    }

    const hasSEOContent = [
      formData.metaTitle,
      formData.description,
      formData.keywords,
      formData.canonicalUrl,
      formData.altText,
    ].some((value) => value.trim() !== "");

    if (!hasSEOContent) {
      setError("Please enter at least one SEO field.");
      return;
    }

    // Warn before replacing the selected page's existing SEO.
    const existing = seoItems.find(
      (item) =>
        item.page?.toLowerCase() ===
        formData.page.toLowerCase()
    );

    if (
      existing &&
      !window.confirm(
        `SEO already exists for ${formData.page}. Replace it?`
      )
    ) {
      return;
    }

    const payload = {
      page: formData.page,
      metaTitle: formData.metaTitle.trim(),
      description: formData.description.trim(),
      keywords: formData.keywords.trim(),
      canonicalUrl: formData.canonicalUrl.trim(),
      altText: formData.altText.trim(),
    };

    setSaving(true);

    try {
      const res = await fetch(SEO_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message || "Failed to save SEO."
        );
      }

      // Reload the persisted data from S3 via Lambda.
      await loadSEO();

      setFormData({ ...initialForm });
      setShowForm(false);
      setSuccess(
        data.message || "SEO saved successfully."
      );
    } catch (err) {
      console.error("Save SEO error:", err);
      setError(
        err.message ||
          "Unable to save SEO. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE SEO THROUGH API GATEWAY
  // ==========================================

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete SEO for ${item.page}?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(item.id);

    try {
      // The Lambda supports deleting by page or ID.
      const params = new URLSearchParams();

      if (item.page) {
        params.set("page", item.page);
      } else {
        params.set("id", item.id);
      }

      const res = await fetch(
        `${SEO_API}?${params.toString()}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(
          data.message || "Failed to delete SEO."
        );
      }

      await loadSEO();

      setSuccess(
        data.message || "SEO deleted successfully."
      );
    } catch (err) {
      console.error("Delete SEO error:", err);
      setError(
        err.message ||
          "Unable to delete SEO. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="seo-admin">
      {/* PAGE HEADER */}
      <div className="seo-header">
        <div className="seo-heading">
          <div className="seo-heading-icon">
            <Search size={23} />
          </div>

          <div>
            <h1>SEO Management</h1>
            <p>
              Manage SEO metadata for your website pages.
            </p>
          </div>
        </div>

        <div className="seo-header-actions">
          <button
            type="button"
            className="seo-cancel-btn"
            onClick={loadSEO}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          {!showForm && (
            <button
              type="button"
              className="seo-add-btn"
              onClick={handleAdd}
            >
              <Plus size={18} />
              Add SEO
            </button>
          )}
        </div>
      </div>

      {/* STATUS MESSAGES */}
      {error && (
        <div className="seo-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="seo-success" role="status">
          {success}
        </div>
      )}

      {/* ADD SEO FORM */}
      {showForm && (
        <form className="seo-form" onSubmit={handleSave}>
          <div className="seo-form-heading">
            <h2>Add SEO</h2>
            <p>
              Select a page and enter the SEO information you need.
            </p>
          </div>

          <div className="seo-form-body">
            {/* PAGE SELECT */}
            <div className="seo-field">
              <label htmlFor="seo-page">
                Select Page
              </label>

              <select
                id="seo-page"
                name="page"
                value={formData.page}
                onChange={handleChange}
                required
                disabled={saving}
              >
                <option value="">Select Page</option>

                {PAGE_OPTIONS.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
            </div>

            {/* META TITLE */}
            <div className="seo-field">
              <label htmlFor="seo-meta-title">
                Meta Title
              </label>

              <input
                id="seo-meta-title"
                name="metaTitle"
                type="text"
                maxLength={300}
                placeholder="Meta Title"
                value={formData.metaTitle}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* META DESCRIPTION */}
            <div className="seo-field">
              <label htmlFor="seo-description">
                Meta Description
              </label>

              <textarea
                id="seo-description"
                name="description"
                rows={4}
                maxLength={5000}
                placeholder="Meta Description"
                value={formData.description}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* META KEYWORDS */}
            <div className="seo-field">
              <label htmlFor="seo-keywords">
                Meta Keywords
              </label>

              <input
                id="seo-keywords"
                name="keywords"
                type="text"
                maxLength={2000}
                placeholder="Meta Keywords"
                value={formData.keywords}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* CANONICAL URL */}
            <div className="seo-field">
              <label htmlFor="seo-canonical">
                Canonical URL
              </label>

              <input
                id="seo-canonical"
                name="canonicalUrl"
                type="url"
                maxLength={2048}
                placeholder="https://yourwebsite.com/"
                value={formData.canonicalUrl}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* ALTERNATIVE TEXT */}
            <div className="seo-field">
              <label htmlFor="seo-alt-text">
                Alternative Text
              </label>

              <input
                id="seo-alt-text"
                name="altText"
                type="text"
                maxLength={1000}
                placeholder="Alternative Text"
                value={formData.altText}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
          </div>

          {/* FORM BUTTONS */}
          <div className="seo-form-actions">
            <button
              type="submit"
              className="seo-save-btn"
              disabled={saving}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save SEO"}
            </button>

            <button
              type="button"
              className="seo-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SAVED SEO TABLE */}
      {loading ? (
        <div className="seo-empty-state">
          <RefreshCw size={28} />
          <h3>Loading SEO data...</h3>
          <p>Please wait while your saved entries load.</p>
        </div>
      ) : seoItems.length > 0 ? (
        <div className="seo-table-wrapper">
          <table className="seo-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Meta Title</th>
                <th>Description</th>
                <th>Keywords</th>
                <th>Canonical URL</th>
                <th>Alt Text</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {seoItems.map((item) => (
                <tr key={item.id || item.page}>
                  <td>{item.page}</td>
                  <td>{item.metaTitle || "—"}</td>
                  <td>{item.description || "—"}</td>
                  <td>{item.keywords || "—"}</td>

                  <td>
                    {item.canonicalUrl ? (
                      <a
                        className="seo-url"
                        href={item.canonicalUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.canonicalUrl}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>{item.altText || "—"}</td>

                  <td>
                    <button
                      type="button"
                      className="seo-delete-btn"
                      onClick={() => handleDelete(item)}
                      disabled={deletingId === item.id}
                      aria-label={`Delete SEO for ${item.page}`}
                    >
                      <Trash2 size={15} />
                      {deletingId === item.id
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
          <div className="seo-empty-state">
            <Search size={35} strokeWidth={1.5} />
            <h3>No SEO entries added yet</h3>
            <p>
              Click Add SEO to create metadata for a website page.
            </p>
          </div>
        )
      )}
    </section>
  );
}
