
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Save,
  X,
  Trash2,
  RefreshCw,
  Pencil,
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
  "One BHK",
  "Two BHK",
  "Three BHK",
  "Four BHK",
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
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({ ...initialForm });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingPage, setDeletingPage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD SEO DATA FROM LAMBDA / S3
  // ==========================================

  const loadSEO = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(SEO_API, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load SEO data (${response.status}).`
        );
      }

      const data = await response.json();

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data.items)
          ? data.items
          : null;

      if (!items) {
        throw new Error(
          "Invalid SEO data returned by the API."
        );
      }

      setSeoItems(items);
    } catch (err) {
      console.error("Load SEO error:", err);
      setError(
        err.message || "Unable to load SEO data."
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

  // Open a blank form to add SEO
  const handleAdd = () => {
    setEditingPage(null);
    setFormData({ ...initialForm });
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Open the form with the selected SEO record
  const handleEdit = (item) => {
    setEditingPage(item.page);

    setFormData({
      page: item.page || "",
      metaTitle: item.metaTitle || "",
      description: item.description || "",
      keywords: item.keywords || "",
      canonicalUrl: item.canonicalUrl || "",
      altText: item.altText || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel adding or editing
  const handleCancel = () => {
    setFormData({ ...initialForm });
    setEditingPage(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  // ==========================================
  // ADD OR EDIT SEO
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.page) {
      setError("Please select a page.");
      return;
    }

    const fields = [
      formData.metaTitle,
      formData.description,
      formData.keywords,
      formData.canonicalUrl,
      formData.altText,
    ];

    if (!fields.some((value) => value.trim() !== "")) {
      setError("Please enter at least one SEO field.");
      return;
    }

    // Only check for duplicates when adding a new record.
    // Editing an existing page should not trigger this warning.
    if (!editingPage) {
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
    }

    const payload = {
      page: formData.page,
      metaTitle: formData.metaTitle.trim(),
      description: formData.description.trim(),
      keywords: formData.keywords.trim(),
      canonicalUrl: formData.canonicalUrl.trim(),
      altText: formData.altText.trim(),
    };

    // PUT updates an existing record.
    // POST adds a record or follows your Lambda's add behavior.
    const method = editingPage ? "PUT" : "POST";

    setSaving(true);

    try {
      const response = await fetch(SEO_API, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message ||
            `Failed to ${editingPage ? "update" : "save"} SEO.`
        );
      }

      // Reload the saved data from S3 through Lambda.
      await loadSEO();

      setFormData({ ...initialForm });
      setEditingPage(null);
      setShowForm(false);

      setSuccess(
        data.message ||
          (method === "PUT"
            ? "SEO updated successfully."
            : "SEO saved successfully.")
      );
    } catch (err) {
      console.error("Save SEO error:", err);

      setError(
        err.message || "Unable to save SEO changes."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE SEO
  // ==========================================

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete SEO for ${item.page}?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingPage(item.page);

    try {
      const params = new URLSearchParams();

      if (item.page) {
        params.set("page", item.page);
      } else if (item.id) {
        params.set("id", item.id);
      } else {
        throw new Error(
          "The selected SEO record has no page or ID."
        );
      }

      const response = await fetch(
        `${SEO_API}?${params.toString()}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Failed to delete SEO."
        );
      }

      await loadSEO();

      setSuccess(
        data.message || "SEO deleted successfully."
      );

      if (editingPage === item.page) {
        handleCancel();
      }
    } catch (err) {
      console.error("Delete SEO error:", err);

      setError(
        err.message || "Unable to delete SEO."
      );
    } finally {
      setDeletingPage(null);
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
            disabled={loading || saving}
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

      {/* ADD / EDIT FORM */}
      {showForm && (
        <form
          className="seo-form"
          onSubmit={handleSave}
        >
          <div className="seo-form-heading">
            <h2>
              {editingPage ? "Edit SEO" : "Add SEO"}
            </h2>

            <p>
              {editingPage
                ? `Update SEO metadata for ${editingPage}.`
                : "Select a page and enter its SEO information."}
            </p>
          </div>

          <div className="seo-form-body">
            {/* PAGE */}
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
                disabled={saving || Boolean(editingPage)}
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
                placeholder="Enter meta title"
                value={formData.metaTitle}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="seo-field">
              <label htmlFor="seo-description">
                Meta Description
              </label>

              <textarea
                id="seo-description"
                name="description"
                rows={4}
                maxLength={5000}
                placeholder="Enter meta description"
                value={formData.description}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* KEYWORDS */}
            <div className="seo-field">
              <label htmlFor="seo-keywords">
                Meta Keywords
              </label>

              <input
                id="seo-keywords"
                name="keywords"
                type="text"
                maxLength={2000}
                placeholder="Enter keywords separated by commas"
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
                placeholder="https://www.example.com/"
                value={formData.canonicalUrl}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* ALT TEXT */}
            <div className="seo-field">
              <label htmlFor="seo-alt-text">
                Alternative Text
              </label>

              <input
                id="seo-alt-text"
                name="altText"
                type="text"
                maxLength={1000}
                placeholder="Enter image alternative text"
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
              {saving
                ? "Saving..."
                : editingPage
                  ? "Save Changes"
                  : "Save SEO"}
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
          <p>
            Please wait while your saved entries load.
          </p>
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
                    <div className="seo-row-actions">
                      <button
                        type="button"
                        className="seo-edit-btn"
                        onClick={() => handleEdit(item)}
                        disabled={
                          saving ||
                          deletingPage === item.page
                        }
                        aria-label={`Edit SEO for ${item.page}`}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="seo-delete-btn"
                        onClick={() => handleDelete(item)}
                        disabled={
                          deletingPage === item.page ||
                          saving
                        }
                        aria-label={`Delete SEO for ${item.page}`}
                      >
                        <Trash2 size={15} />
                        {deletingPage === item.page
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
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
