
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Onebhkadmin.css";

// ==========================================
// AWS API CONFIGURATION
// ==========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/onebhkadmin";

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function Onebhkadmin() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET DATA FROM AWS S3 THROUGH API
  // ==========================================

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch 1BHK data.");
      }

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching 1BHK data:", err);
      setError(err.message || "Unable to load 1BHK data.");
    } finally {
      setLoading(false);
    }
  };

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
          result.message || "Failed to save 1BHK data."
        );
      }

      // Refresh data from AWS
      await fetchItems();

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      alert(
        isEditing
          ? "1BHK item updated successfully!"
          : "1BHK item added successfully!"
      );
    } catch (err) {
      console.error("Error saving 1BHK data:", err);
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
      "Are you sure you want to delete this 1BHK item?"
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
          result.message || "Failed to delete 1BHK item."
        );
      }

      await fetchItems();

      if (editingId === id) {
        handleCancel();
      }

      alert("1BHK item deleted successfully!");
    } catch (err) {
      console.error("Error deleting 1BHK data:", err);
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
    <div className="onebhk-admin">

      {/* PAGE HEADER */}

      <div className="onebhk-admin-header">

        <div>
          <h2>1BHK Admin</h2>
          <p>Manage your 1BHK content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="onebhk-add-btn"
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

        <div className="onebhk-form-card">

          <form onSubmit={handleSave}>

            <div className="onebhk-form-body">

              {/* NAME */}

              <div className="onebhk-form-group">

                <label htmlFor="onebhk-name">
                  Name
                </label>

                <input
                  id="onebhk-name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              {/* SUBTITLE */}

              <div className="onebhk-form-group">

                <label htmlFor="onebhk-subtitle">
                  Subtitle
                </label>

                <input
                  id="onebhk-subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="onebhk-form-group">

                <label htmlFor="onebhk-description">
                  Description
                </label>

                <textarea
                  id="onebhk-description"
                  name="description"
                  placeholder="Enter description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <p className="onebhk-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* SAVE AND CANCEL */}

            <div className="onebhk-form-footer">

              <button
                type="submit"
                className="onebhk-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className="onebhk-cancel-btn"
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

        <div className="onebhk-table-card">

          <div className="onebhk-table-wrapper">

            <table className="onebhk-table">

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
                    <td colSpan="7" className="onebhk-empty">
                      Loading 1BHK data...
                    </td>
                  </tr>

                ) : items.length > 0 ? (

                  items.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="onebhk-type-badge">
                          {item.type || "Text"}
                        </span>
                      </td>

                      <td className="onebhk-name-cell">
                        {item.name}
                      </td>

                      <td>
                        {item.subtitle}
                      </td>

                      <td className="onebhk-description-cell">
                        {item.description}
                      </td>

                      <td>
                        {item.created || "-"}
                      </td>

                      <td>

                        <div className="onebhk-action-buttons">

                          <button
                            type="button"
                            className="onebhk-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="onebhk-delete-btn"
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
                    <td colSpan="7" className="onebhk-empty">
                      No 1BHK items added yet. Click + Add to
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
