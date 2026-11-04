
import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Save,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import "./Cottageadmin.css";

// =====================================
// AWS API GATEWAY URL
// =====================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/cottageadmin";

// =====================================
// EMPTY FORM
// =====================================

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

const Cottageadmin = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // =====================================
  // API RESPONSE HANDLER
  // =====================================

  const readResponse = async (response) => {
    const text = await response.text();

    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Invalid response from server.");
    }

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed (${response.status}).`
      );
    }

    // Handle API Gateway Lambda proxy responses if needed.
    if (typeof data.body === "string") {
      try {
        data = JSON.parse(data.body);
      } catch {
        throw new Error("Invalid Lambda response body.");
      }
    }

    return data;
  };

  // =====================================
  // GET: LOAD COTTAGE DATA FROM AWS
  // =====================================

  const fetchItems = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
      });

      const data = await readResponse(response);

      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error loading cottage data:", error);
      setMessage(error.message || "Unable to load cottage data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // =====================================
  // OPEN ADD FORM
  // =====================================

  const handleAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setMessage("");
    setShowForm(true);
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // POST / PUT: SAVE OR UPDATE
  // ALL FIELDS ARE OPTIONAL
  // =====================================

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...(editingId ? { id: editingId } : {}),
      name: form.name.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
    };

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await readResponse(response);

      await fetchItems();

      setMessage(
        data.message ||
          (editingId
            ? "Cottage content updated successfully."
            : "Cottage content added successfully.")
      );

      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving cottage content:", error);
      setMessage(error.message || "Unable to save cottage content.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // EDIT ITEM
  // =====================================

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setMessage("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // DELETE ITEM
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cottage content?"
    );

    if (!confirmDelete) return;

    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await readResponse(response);

      await fetchItems();

      setMessage(
        data.message || "Cottage content deleted successfully."
      );
    } catch (error) {
      console.error("Error deleting cottage content:", error);
      setMessage(error.message || "Unable to delete cottage content.");
    }
  };

  // =====================================
  // CANCEL FORM
  // =====================================

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setMessage("");
  };

  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <div className="cottage-admin">

      {/* HEADER */}

      <div className="cottage-admin-header">
        <div>
          <h2>HOME COTTAGES</h2>
          <p>Manage your Home Cottages content</p>
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

      {/* MESSAGE */}

      {message && (
        <div className="cottage-message" role="status">
          {message}

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Close message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="cottage-form"
          onSubmit={handleSave}
          noValidate
        >
          <div className="cottage-form-body">

            {/* NAME */}

            <div className="cottage-form-group">
              <label htmlFor="cottage-name">Name</label>

              <input
                id="cottage-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            {/* SUBTITLE */}

            <div className="cottage-form-group">
              <label htmlFor="cottage-subtitle">Subtitle</label>

              <input
                id="cottage-subtitle"
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="cottage-form-group">
              <label htmlFor="cottage-description">
                Description
              </label>

              <textarea
                id="cottage-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="5"
              />
            </div>

            <small className="cottage-optional-note">
              All fields are optional. You can save without entering
              any information.
            </small>
          </div>

          {/* FORM FOOTER */}

          <div className="cottage-form-footer">
            <button
              type="submit"
              className="cottage-save-btn"
              disabled={saving}
            >
              <Save size={17} />
              {saving
                ? "Saving..."
                : editingId
                  ? "Update"
                  : "Save"}
            </button>

            <button
              type="button"
              className="cottage-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}

      {!showForm && (
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="cottage-empty">
                    Loading cottage data...
                  </td>
                </tr>
              ) : items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>
                      <span className="cottage-type-badge">
                        {item.type || "Text"}
                      </span>
                    </td>

                    <td className="cottage-name-cell">
                      {item.name || "-"}
                    </td>

                    <td>{item.subtitle || "-"}</td>

                    <td className="cottage-description-cell">
                      {item.description || "-"}
                    </td>

                    <td>
                      {formatDate(item.createdAt || item.created)}
                    </td>

                    <td>
                      <div className="cottage-actions">
                        <button
                          type="button"
                          className="cottage-edit-btn"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="cottage-delete-btn"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="cottage-empty">
                    No records found. Click + Add to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cottageadmin;
