
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Image as ImageIcon,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";

import "./Banner.css";

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/homebanner";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
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
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    resetForm();
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setName(banner.name || "");
    setSubtitle(banner.subtitle || "");
    setDescription(banner.description || "");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // SAVE NEW BANNER OR UPDATE EXISTING BANNER
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
      setError(
        "Please enter a name, subtitle, or description."
      );
      return;
    }

    const isEditing = editingId !== null;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(isEditing ? { id: editingId } : {}),
          name: trimmedName,
          subtitle: trimmedSubtitle,
          description: trimmedDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (isEditing
              ? "Failed to update banner."
              : "Failed to save banner.")
        );
      }

      // Update the existing row or add a new row.
      if (data.banner) {
        if (isEditing) {
          setBanners((previous) =>
            previous.map((banner) =>
              String(banner.id) === String(editingId)
                ? data.banner
                : banner
            )
          );
        } else {
          setBanners((previous) => [
            ...previous,
            data.banner,
          ]);
        }
      } else {
        await fetchBanners();
      }

      resetForm();

      window.alert(
        isEditing
          ? "Banner updated successfully!"
          : "Banner saved successfully!"
      );
    } catch (err) {
      console.error("Save banner error:", err);
      setError(
        err.message || "Unable to save banner content."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE BANNER
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

      if (String(editingId) === String(id)) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete banner error:", err);
      setError(
        err.message || "Unable to delete banner."
      );
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
            onClick={handleAdd}
            disabled={loading}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          className="banner-error-message"
          role="alert"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={fetchBanners}
            disabled={loading || saving}
          >
            Retry
          </button>
        </div>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="banner-form"
          onSubmit={handleSave}
        >
          <div className="banner-form-header">
            <h2>
              {editingId !== null
                ? "Edit Banner Content"
                : "Add Banner Content"}
            </h2>

            <p>
              {editingId !== null
                ? "Update the banner fields you want to change."
                : "Enter a name, subtitle, or description."}
            </p>
          </div>

          <div className="banner-form-body">
            <div className="banner-field">
              <label htmlFor="banner-name">Name</label>

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

              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Save Changes"
                  : "Save"}
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

      {/* SAVED BANNERS TABLE */}

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
                    <div className="banner-action-buttons">
                      <button
                        type="button"
                        className="banner-edit-button"
                        onClick={() => handleEdit(banner)}
                        disabled={
                          saving || deletingId !== null
                        }
                        aria-label={`Edit banner ${index + 1}`}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="banner-delete-button"
                        onClick={() =>
                          handleDelete(banner.id)
                        }
                        disabled={
                          deletingId !== null || saving
                        }
                        aria-label={`Delete banner ${index + 1}`}
                      >
                        <Trash2 size={15} />

                        {deletingId === banner.id
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
          <div className="banner-empty-state">
            <ImageIcon size={34} strokeWidth={1.5} />

            <h3>No banner content added yet</h3>

            <p>
              Click Add to enter a name, subtitle, or
              description.
            </p>
          </div>
        )
      )}
    </section>
  );
}
