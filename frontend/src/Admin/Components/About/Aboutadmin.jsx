
import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Aboutadmin.css";

// ========================================
// AWS API GATEWAY
// ========================================

const ABOUT_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/aboutadmin";

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
// API REQUEST HELPER
// ========================================

const apiRequest = async (method, body = null) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
    },
  };

  if (body !== null) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(ABOUT_API_URL, options);

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid response received from API.");
  }

  if (!response.ok) {
    throw new Error(
      data.message || `API request failed: ${response.status}`
    );
  }

  return data;
};

// ========================================
// ABOUT ADMIN COMPONENT
// ========================================

export default function AboutAdmin() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ========================================
  // GET: LOAD ABOUT DATA FROM AWS
  // ========================================

  const fetchAboutData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("GET");

      if (!Array.isArray(data)) {
        throw new Error("API did not return an array of About banners.");
      }

      setItems(data);
    } catch (err) {
      console.error("About GET error:", err);
      setError(err.message || "Unable to load About banner data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  // ========================================
  // OPEN ADD FORM
  // ========================================

  const handleAdd = () => {
    setFormData(EMPTY_FORM);
    setEditId(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // SAVE / UPDATE DATA
  // ========================================

  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) return;

    setError("");
    setSuccess("");

    const updatedData = {
      name: formData.name.trim(),
      subtitle: formData.subtitle.trim(),
      description: formData.description.trim(),
    };

    if (
      !updatedData.name &&
      !updatedData.subtitle &&
      !updatedData.description
    ) {
      setError("Please enter at least one About banner field.");
      return;
    }

    setSaving(true);

    try {
      if (editId !== null) {
        // PUT: UPDATE EXISTING BANNER

        await apiRequest("PUT", {
          id: editId,
          ...updatedData,
        });

        setSuccess("About banner updated successfully.");
      } else {
        // POST: ADD NEW BANNER

        await apiRequest("POST", updatedData);

        setSuccess("About banner added successfully.");
      }

      setFormData(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);

      await fetchAboutData();
    } catch (err) {
      console.error("About save error:", err);
      setError(err.message || "Unable to save About banner.");
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // EDIT DATA
  // ========================================

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditId(item.id);
    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========================================
  // DELETE DATA
  // ========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this About content?"
    );

    if (!confirmDelete) return;

    setError("");
    setSuccess("");

    try {
      // DELETE: REMOVE BANNER FROM AWS S3

      await apiRequest("DELETE", { id });

      setSuccess("About banner deleted successfully.");

      if (editId === id) {
        setFormData(EMPTY_FORM);
        setEditId(null);
        setShowForm(false);
      }

      await fetchAboutData();
    } catch (err) {
      console.error("About delete error:", err);
      setError(err.message || "Unable to delete About banner.");
    }
  };

  // ========================================
  // CANCEL FORM
  // ========================================

  const handleCancel = () => {
    setFormData(EMPTY_FORM);
    setEditId(null);
    setShowForm(false);
    setError("");
  };

  // ========================================
  // RETURN JSX
  // ========================================

  return (
    <div className="about-admin">

      {/* HEADER */}

      <div className="about-admin-header">
        <div>
          <h2>About Banner</h2>

          <p>
            Manage your About page banner content.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="about-add-btn"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div
          className="about-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* SUCCESS MESSAGE */}

      {success && (
        <div
          className="about-success"
          role="status"
        >
          {success}
        </div>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="about-form"
          onSubmit={handleSave}
        >
          <div className="about-form-body">

            {/* NAME */}

            <div className="about-form-group">
              <label htmlFor="about-name">
                Name
              </label>

              <input
                id="about-name"
                type="text"
                name="name"
                placeholder="Enter banner name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* SUBTITLE */}

            <div className="about-form-group">
              <label htmlFor="about-subtitle">
                Subtitle
              </label>

              <input
                id="about-subtitle"
                type="text"
                name="subtitle"
                placeholder="Enter banner subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}

            <div className="about-form-group">
              <label htmlFor="about-description">
                Description
              </label>

              <textarea
                id="about-description"
                name="description"
                placeholder="Enter banner description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
              />
            </div>
          </div>

          {/* SAVE / CANCEL */}

          <div className="about-form-footer">
            <button
              type="submit"
              className="about-save-btn"
              disabled={saving}
            >
              <Save size={17} />

              {saving
                ? "Saving..."
                : editId !== null
                  ? "Update"
                  : "Save"}
            </button>

            <button
              type="button"
              className="about-cancel-btn"
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

      <div className="about-table-container">
        <table className="about-table">

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
                <td colSpan="7" className="about-empty">
                  Loading About banner data...
                </td>
              </tr>
            ) : items.length > 0 ? (
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>{item.type || "Text"}</td>

                  <td className="about-name-cell">
                    {item.name || "-"}
                  </td>

                  <td>{item.subtitle || "-"}</td>

                  <td className="about-description-cell">
                    {item.description || "-"}
                  </td>

                  <td>
                    {formatDate(item.created)}
                  </td>

                  <td>
                    <div className="about-action-buttons">

                      {/* EDIT */}

                      <button
                        type="button"
                        className="about-edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="about-delete-btn"
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
                <td
                  colSpan="7"
                  className="about-empty"
                >
                  No About banner data found.
                  Click + Add to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
