
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Twobhkadmin.css";

// ==========================================
// AWS API CONFIGURATION
// ==========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/twobhkadmin";

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function Twobhkadmin() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET DATA FROM AWS
  // ==========================================

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch 2BHK data.");
      }

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching 2BHK data:", err);
      setError(err.message || "Unable to load 2BHK data.");
    } finally {
      setLoading(false);
    }
  };

  // LOAD DATA WHEN PAGE OPENS

  useEffect(() => {
    fetchItems();
  }, []);

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE DATA - POST / PUT
  // ==========================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const isEditing = editingId !== null;

      const payload = {
        ...formData,
      };

      if (isEditing) {
        payload.id = editingId;
      }

      const response = await fetch(API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save 2BHK data."
        );
      }

      await fetchItems();

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      alert(
        isEditing
          ? "2BHK item updated successfully!"
          : "2BHK item added successfully!"
      );

    } catch (err) {
      console.error("Error saving 2BHK data:", err);
      setError(err.message || "Unable to save data.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // EDIT ITEM
  // ==========================================

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setShowForm(true);
    setError("");
  };

  // ==========================================
  // DELETE ITEM
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this 2BHK item?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete 2BHK item."
        );
      }

      await fetchItems();

      if (editingId === id) {
        handleCancel();
      }

      alert("2BHK item deleted successfully!");

    } catch (err) {
      console.error("Error deleting 2BHK data:", err);
      setError(err.message || "Unable to delete data.");
    }
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setError("");
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <div className="twobhk-admin">

      {/* PAGE HEADER */}

      <div className="twobhk-admin-header">
        <div>
          <h2>2BHK Admin</h2>
          <p>Manage your 2BHK content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="twobhk-add-btn"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <p
          role="alert"
          style={{
            color: "#d93025",
            marginBottom: "15px",
          }}
        >
          {error}
        </p>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <div className="twobhk-form-card">

          <form onSubmit={handleSave}>

            <div className="twobhk-form-body">

              {/* NAME */}

              <div className="twobhk-form-group">
                <label htmlFor="twobhk-name">
                  Name
                </label>

                <input
                  id="twobhk-name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* SUBTITLE */}

              <div className="twobhk-form-group">
                <label htmlFor="twobhk-subtitle">
                  Subtitle
                </label>

                <input
                  id="twobhk-subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>

              {/* DESCRIPTION */}

              <div className="twobhk-form-group">
                <label htmlFor="twobhk-description">
                  Description
                </label>

                <textarea
                  id="twobhk-description"
                  name="description"
                  placeholder="Enter description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <p className="twobhk-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* SAVE AND CANCEL */}

            <div className="twobhk-form-footer">

              <button
                type="submit"
                className="twobhk-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className="twobhk-cancel-btn"
                onClick={handleCancel}
                disabled={saving}
              >
                <X size={19} />
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* DATA TABLE */}

      {!showForm && (
        <div className="twobhk-table-card">

          <div className="twobhk-table-wrapper">

            <table className="twobhk-table">

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
                    <td colSpan="7" className="twobhk-empty">
                      Loading 2BHK data...
                    </td>
                  </tr>

                ) : items.length > 0 ? (

                  items.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="twobhk-type-badge">
                          {item.type || "Text"}
                        </span>
                      </td>

                      <td className="twobhk-name-cell">
                        {item.name}
                      </td>

                      <td>{item.subtitle}</td>

                      <td className="twobhk-description-cell">
                        {item.description}
                      </td>

                      <td>{item.created || "-"}</td>

                      <td>
                        <div className="twobhk-action-buttons">

                          <button
                            type="button"
                            className="twobhk-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="twobhk-delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="twobhk-empty">
                      No 2BHK items added yet. Click + Add to
                      create your first item.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>
      )}

    </div>
  );
}
