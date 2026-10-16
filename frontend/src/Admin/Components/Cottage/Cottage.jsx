import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  HousePlus,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Cottage.css";

// ==========================================
// AWS API GATEWAY
// ==========================================

const COTTAGE_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/cottages";

export default function Cottage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // API RESPONSE HANDLER
  // ==========================================

  const readResponse = async (response) => {
    const text = await response.text();

    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("The API returned an invalid JSON response.");
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed with status ${response.status}.`
      );
    }

    return data;
  };

  // ==========================================
  // LOAD COTTAGES FROM AWS
  // ==========================================

  const fetchItems = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(COTTAGE_API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal,
      });

      const data = await readResponse(response);

      if (!Array.isArray(data)) {
        throw new Error("The API did not return a cottage array.");
      }

      setItems(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Load cottages error:", err);
        setError(err.message || "Unable to load cottage data.");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchItems(controller.signal);

    return () => controller.abort();
  }, [fetchItems]);

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
  // SAVE COTTAGE TO AWS
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    if (!name.trim() && !subtitle.trim() && !description.trim()) {
      setError("Please enter a name, subtitle, or description.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(COTTAGE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          subtitle: subtitle.trim(),
          description: description.trim(),
        }),
      });

      // Lambda should return success only after saving to S3.
      await readResponse(response);

      // Reload the saved records from AWS rather than
      // assuming the POST response has a particular shape.
      await fetchItems();

      resetForm();
      setSuccess("Home & Cottage content saved successfully.");
    } catch (err) {
      console.error("Save cottage error:", err);
      setError(err.message || "Unable to save cottage.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE COTTAGE FROM AWS
  // ==========================================

  const handleDelete = async (id) => {
    if (!id) {
      setError("This record has no ID and cannot be deleted.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${COTTAGE_API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      await readResponse(response);

      setItems((previous) =>
        previous.filter((item) => String(item.id) !== String(id))
      );

      setSuccess("Home & Cottage content deleted successfully.");
    } catch (err) {
      console.error("Delete cottage error:", err);
      setError(err.message || "Unable to delete cottage.");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="cottage-admin">
      {/* PAGE HEADER */}

      <div className="cottage-header">
        <div className="cottage-heading">
          <div className="cottage-heading-icon">
            <HousePlus size={23} />
          </div>

          <div>
            <h1>Home & Cottage</h1>
            <p>Manage your home and cottage content.</p>
          </div>
        </div>

        {!showForm && (
          <button
            type="button"
            className="cottage-add-btn"
            onClick={() => {
              setError("");
              setSuccess("");
              setShowForm(true);
            }}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* STATUS MESSAGES */}

      {error && (
        <div className="cottage-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="cottage-success" role="status">
          {success}
        </div>
      )}

      {/* ADD FORM */}

      {showForm && (
        <form className="cottage-form" onSubmit={handleSave}>
          <div className="cottage-form-heading">
            <h2>Add Home & Cottage Text</h2>
            <p>
              Enter a name, subtitle, description, or any combination
              of these fields.
            </p>
          </div>

          <div className="cottage-form-body">
            <div className="cottage-field">
              <label htmlFor="cottage-name">Name (optional)</label>

              <input
                id="cottage-name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="cottage-field">
              <label htmlFor="cottage-subtitle">
                Subtitle (optional)
              </label>

              <input
                id="cottage-subtitle"
                type="text"
                placeholder="Enter subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
              />
            </div>

            <div className="cottage-field">
              <label htmlFor="cottage-description">
                Description (optional)
              </label>

              <textarea
                id="cottage-description"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </div>
          </div>

          <div className="cottage-form-actions">
            <button
              type="submit"
              className="cottage-save-btn"
              disabled={saving}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="cottage-cancel-btn"
              onClick={resetForm}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* SAVED ENTRIES TABLE */}

      {loading ? (
        <p>Loading Home & Cottage content...</p>
      ) : items.length > 0 ? (
        <div className="cottage-table-wrapper">
          <table className="cottage-table">
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
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.type || "Text"}</td>

                  <td className="cottage-name-cell">
                    {item.name || "—"}
                  </td>

                  <td className="cottage-subtitle-cell">
                    {item.subtitle || "—"}
                  </td>

                  <td className="cottage-description-cell">
                    {item.description || "—"}
                  </td>

                  <td>{item.created || "—"}</td>

                  <td>
                    <button
                      type="button"
                      className="cottage-delete-btn"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      aria-label={`Delete entry ${index + 1}`}
                    >
                      <Trash2 size={16} />
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showForm && (
          <div className="cottage-empty-state">
            <HousePlus size={36} strokeWidth={1.5} />

            <h3>No content added yet</h3>

            <p>Click Add to enter your cottage content.</p>
          </div>
        )
      )}
    </section>
  );
}