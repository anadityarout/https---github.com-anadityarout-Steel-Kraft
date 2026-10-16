
import React, { useState } from "react";
import {
  Plus,
  Search,
  Save,
  X,
  Trash2,
} from "lucide-react";

import "./SeoAdmin.css";

const PAGE_OPTIONS = [
  "Home",
  "Project",
  "Home & Cottage",
  "Contact",
];

export default function SEOAdmin() {
  const [seoItems, setSeoItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const initialForm = {
    page: "",
    metaTitle: "",
    description: "",
    keywords: "",
    canonicalUrl: "",
    altText: "",
  };

  const [formData, setFormData] = useState(initialForm);

  // Update form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open form
  const handleAdd = () => {
    setFormData({ ...initialForm });
    setShowForm(true);
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({ ...initialForm });
    setShowForm(false);
  };

  // Save SEO entry
  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.page) {
      alert("Please select a page.");
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
      alert("Please enter at least one SEO field.");
      return;
    }

    const newSEO = {
      id: `${Date.now()}-${Math.random()}`,
      ...formData,
      metaTitle: formData.metaTitle.trim(),
      description: formData.description.trim(),
      keywords: formData.keywords.trim(),
      canonicalUrl: formData.canonicalUrl.trim(),
      altText: formData.altText.trim(),
    };

    setSeoItems((previous) => [...previous, newSEO]);
    setFormData({ ...initialForm });
    setShowForm(false);
  };

  // Delete SEO entry
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this SEO entry?"
    );

    if (!confirmed) return;

    setSeoItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

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
            <p>Manage SEO metadata for your website pages.</p>
          </div>
        </div>

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
              <label htmlFor="seo-page">Select Page</label>

              <select
                id="seo-page"
                name="page"
                value={formData.page}
                onChange={handleChange}
                required
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
              <label htmlFor="seo-meta-title">Meta Title</label>

              <input
                id="seo-meta-title"
                name="metaTitle"
                type="text"
                placeholder="Meta Title"
                value={formData.metaTitle}
                onChange={handleChange}
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
                placeholder="Meta Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* META KEYWORDS */}
            <div className="seo-field">
              <label htmlFor="seo-keywords">Meta Keywords</label>

              <input
                id="seo-keywords"
                name="keywords"
                type="text"
                placeholder="Meta Keywords"
                value={formData.keywords}
                onChange={handleChange}
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
                placeholder="Canonical URL"
                value={formData.canonicalUrl}
                onChange={handleChange}
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
                placeholder="Alternative Text"
                value={formData.altText}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FORM BUTTONS */}
          <div className="seo-form-actions">
            <button type="submit" className="seo-save-btn">
              <Save size={17} />
              Save SEO
            </button>

            <button
              type="button"
              className="seo-cancel-btn"
              onClick={handleCancel}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SAVED SEO TABLE */}
      {seoItems.length > 0 ? (
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
                <tr key={item.id}>
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
                      onClick={() => handleDelete(item.id)}
                      aria-label={`Delete SEO for ${item.page}`}
                    >
                      <Trash2 size={15} />
                      Delete
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
