
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Prefabadmin.css";

// ========================================
// AWS API GATEWAY
// ========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/prefabadmin";

// ========================================
// EMPTY FORM
// ========================================

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

// ========================================
// FORMAT DATE
// ========================================

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB");
};

// ========================================
// API REQUEST
// ========================================

const apiRequest = async (method, body = null) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL, options);

  const text = await response.text();

  let result = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid response from server.");
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Request failed: ${response.status}`
    );
  }

  return result;
};

// ========================================
// PREFAB ADMIN COMPONENT
// ========================================

export default function Prefabadmin() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  // ======================================
  // LOAD DATA FROM AWS
  // ======================================

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await apiRequest("GET");

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result.items)
        ? result.items
        : [];

      setItems(data);
    } catch (err) {
      console.error("Prefab GET error:", err);
      setError(err.message || "Unable to load prefab content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ======================================
  // OPEN ADD FORM
  // ======================================

  const handleAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ======================================
  // INPUT CHANGE
  // ======================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================
  // SAVE / UPDATE
  // ALL FIELDS ARE OPTIONAL
  // ======================================

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      type: "Text",
    };

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingId !== null) {
        await apiRequest("PUT", {
          id: editingId,
          ...payload,
        });

        setMessage("Prefab content updated successfully.");
      } else {
        await apiRequest("POST", payload);

        setMessage("Prefab content added successfully.");
      }

      await loadItems();

      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Prefab save error:", err);
      setError(err.message || "Unable to save prefab content.");
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // EDIT
  // ======================================

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setShowForm(true);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ======================================
  // DELETE
  // ======================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prefab content?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await apiRequest("DELETE", { id });

      setMessage("Prefab content deleted successfully.");

      if (editingId === id) {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setShowForm(false);
      }

      await loadItems();
    } catch (err) {
      console.error("Prefab DELETE error:", err);
      setError(err.message || "Unable to delete prefab content.");
    }
  };

  // ======================================
  // CANCEL
  // ======================================

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setError("");
    setMessage("");
  };

  // ======================================
  // RETURN JSX
  // ======================================

  return (
    <div className="prefab-admin">

      {/* HEADER */}

      <div className="prefab-admin-header">
        <div>
          <h2>WHY PREFAB STEEL</h2>
          <p>Manage your Why Prefab Steel content</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="prefab-add-btn"
            onClick={handleAdd}
          >
            <Plus size={18} />
            Add
          </button>
        )}
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="prefab-success-message">
          {message}
          <button
            type="button"
            onClick={() => setMessage("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="prefab-error-message">
          {error}
          <button
            type="button"
            onClick={() => setError("")}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="prefab-form"
          onSubmit={handleSave}
        >
          <div className="prefab-form-body">

            {/* NAME */}

            <div className="prefab-form-group">
              <label htmlFor="prefab-name">
                Name
              </label>

              <input
                id="prefab-name"
                type="text"
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* SUBTITLE */}

            <div className="prefab-form-group">
              <label htmlFor="prefab-subtitle">
                Subtitle
              </label>

              <input
                id="prefab-subtitle"
                type="text"
                name="subtitle"
                placeholder="Enter subtitle"
                value={form.subtitle}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}

            <div className="prefab-form-group">
              <label htmlFor="prefab-description">
                Description
              </label>

              <textarea
                id="prefab-description"
                name="description"
                placeholder="Enter description"
                rows="5"
                value={form.description}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* FORM BUTTONS */}

          <div className="prefab-form-footer">
            <button
              type="submit"
              className="prefab-save-btn"
              disabled={saving}
            >
              <Save size={17} />
              {saving
                ? "Saving..."
                : editingId !== null
                ? "Update"
                : "Save"}
            </button>

            <button
              type="button"
              className="prefab-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* DATA TABLE */}

      <div className="prefab-table-wrapper">
        <table className="prefab-table">
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
            {loading ? (
              <tr>
                <td colSpan="7" className="prefab-empty">
                  Loading content...
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <span className="prefab-type-text">
                      {item.type || "Text"}
                    </span>
                  </td>

                  <td className="prefab-name-cell">
                    {item.name || "-"}
                  </td>

                  <td>
                    {item.subtitle || "-"}
                  </td>

                  <td className="prefab-description-cell">
                    {item.description || "-"}
                  </td>

                  <td>
                    {formatDate(item.created || item.createdAt)}
                  </td>

                  <td>
                    <div className="prefab-actions">

                      <button
                        type="button"
                        className="prefab-edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="prefab-delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="prefab-empty">
                  No Why Prefab Steel content found.
                  Click Add to create content.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
