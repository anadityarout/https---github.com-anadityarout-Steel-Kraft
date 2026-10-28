
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  HousePlus,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";

import "./Cottage.css";

const COTTAGE_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/cottages";

export default function Cottage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // HANDLE API RESPONSE
  // ==========================================

  const readResponse = async (response) => {
    const text = await response.text();
    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from API.");
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed: ${response.status}`
      );
    }

    return data;
  };

  // ==========================================
  // LOAD COTTAGES
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
      return true;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Load cottages error:", err);
        setError(err.message || "Unable to load cottage data.");
      }

      return false;
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
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    resetForm();
    setSuccess("");
    setShowForm(true);
  };

  // ==========================================
  // EDIT EXISTING COTTAGE
  // ==========================================

  const handleEdit = (item) => {
    if (!item.id) {
      setError("This record has no ID and cannot be edited.");
      return;
    }

    setEditingId(item.id);
    setName(item.name || "");
    setSubtitle(item.subtitle || "");
    setDescription(item.description || "");

    setError("");
    setSuccess("");
    setShowForm(true);

    window.setTimeout(() => {
      document.getElementById("cottage-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // ==========================================
  // ADD OR UPDATE COTTAGE
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

      const isEditing = editingId !== null;

      const payload = {
        name: name.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
      };

      if (isEditing) {
        payload.id = editingId;
      }

      const response = await fetch(COTTAGE_API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      await readResponse(response);

      // Reload records from S3 through the API.
      const refreshed = await fetchItems();

      if (!refreshed) {
        throw new Error(
          "The save request succeeded, but the table could not refresh. Please reload the page."
        );
      }

      resetForm();

      setSuccess(
        isEditing
          ? "Cottage content updated successfully."
          : "Cottage content added successfully."
      );
    } catch (err) {
      console.error("Save cottage error:", err);
      setError(err.message || "Unable to save cottage content.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE COTTAGE
  // ==========================================

  const handleDelete = async (id) => {
    if (!id) {
      setError("This record has no ID and cannot be deleted.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return;
    }

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

      if (String(editingId) === String(id)) {
        resetForm();
      }

      setSuccess("Cottage content deleted successfully.");
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
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

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

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          id="cottage-form"
          className="cottage-form"
          onSubmit={handleSave}
        >
          <div className="cottage-form-heading">
            <h2>
              {editingId !== null
                ? "Edit Home & Cottage Content"
                : "Add Home & Cottage Text"}
            </h2>

            <p>
              {editingId !== null
                ? "Update the fields and save your changes."
                : "Enter a name, subtitle, or description."}
            </p>
          </div>

          <div className="cottage-form-body">
            <div className="cottage-field">
              <label htmlFor="cottage-name">Name</label>
              <input
                id="cottage-name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={saving}
              />
            </div>

            <div className="cottage-field">
              <label htmlFor="cottage-subtitle">Subtitle</label>
              <input
                id="cottage-subtitle"
                type="text"
                placeholder="Enter subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                disabled={saving}
              />
            </div>

            <div className="cottage-field">
              <label htmlFor="cottage-description">Description</label>
              <textarea
                id="cottage-description"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={saving}
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
              {saving
                ? "Saving..."
                : editingId !== null
                ? "Save Changes"
                : "Save"}
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

      {/* COTTAGE TABLE */}

      {loading ? (
        <p className="cottage-loading">
          Loading Home & Cottage content...
        </p>
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
                <tr key={item.id || index}>
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
                    <div className="cottage-action-buttons">
                      <button
                        type="button"
                        className="cottage-edit-btn"
                        onClick={() => handleEdit(item)}
                        disabled={saving || deletingId !== null}
                        aria-label={`Edit entry ${index + 1}`}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="cottage-delete-btn"
                        onClick={() => handleDelete(item.id)}
                        disabled={saving || deletingId === item.id}
                        aria-label={`Delete entry ${index + 1}`}
                      >
                        <Trash2 size={15} />
                        {deletingId === item.id
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
