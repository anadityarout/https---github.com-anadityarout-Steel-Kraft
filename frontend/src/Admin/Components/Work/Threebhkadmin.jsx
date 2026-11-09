
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Threebhkadmin.css";

// ==========================================
// AWS API CONFIGURATION
// ==========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/threebhkadmin";

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function Threebhkadmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // GET DATA FROM AWS
  // ==========================================

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch 3BHK data.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data received from AWS.");
      }

      setItems(data);
      return true;
    } catch (err) {
      console.error("Error fetching 3BHK data:", err);
      setError(err.message || "Unable to load 3BHK data.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchItems();
  }, []);

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    setFormData({ ...EMPTY_FORM });
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

    if (saving) return;

    try {
      setSaving(true);
      setError("");

      const isEditing = editingId !== null;

      const payload = {
        name: formData.name,
        subtitle: formData.subtitle,
        description: formData.description,
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
          result.message || "Failed to save 3BHK data."
        );
      }

      setFormData({ ...EMPTY_FORM });
      setEditingId(null);
      setShowForm(false);

      const refreshed = await fetchItems();

      if (!refreshed) {
        setError(
          "Saved successfully, but could not refresh the table."
        );
      }

      window.alert(
        isEditing
          ? "3BHK item updated successfully!"
          : "3BHK item added successfully!"
      );
    } catch (err) {
      console.error("Error saving 3BHK data:", err);
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
      "Are you sure you want to delete this 3BHK item?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
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
          result.message || "Failed to delete 3BHK item."
        );
      }

      const refreshed = await fetchItems();

      if (!refreshed) {
        setError(
          "Deleted successfully, but could not refresh the table."
        );
      }

      window.alert("3BHK item deleted successfully!");
    } catch (err) {
      console.error("Error deleting 3BHK data:", err);
      setError(err.message || "Unable to delete data.");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setError("");
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <div className="threebhk-admin">

      {/* PAGE HEADER */}
      <div className="threebhk-admin-header">
        <div>
          <h2>3BHK Admin</h2>
          <p>Manage your 3BHK content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="threebhk-add-btn"
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
        <div className="threebhk-form-card">
          <form onSubmit={handleSave}>

            <div className="threebhk-form-body">

              {/* NAME */}
              <div className="threebhk-form-group">
                <label htmlFor="threebhk-name">
                  Name
                </label>

                <input
                  id="threebhk-name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {/* SUBTITLE */}
              <div className="threebhk-form-group">
                <label htmlFor="threebhk-subtitle">
                  Subtitle
                </label>

                <input
                  id="threebhk-subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="threebhk-form-group">
                <label htmlFor="threebhk-description">
                  Description
                </label>

                <textarea
                  id="threebhk-description"
                  name="description"
                  placeholder="Enter description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <p className="threebhk-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* SAVE AND CANCEL */}
            <div className="threebhk-form-footer">
              <button
                type="submit"
                className="threebhk-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className="threebhk-cancel-btn"
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
        <div className="threebhk-table-card">
          <div className="threebhk-table-wrapper">
            <table className="threebhk-table">

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
                    <td
                      colSpan="7"
                      className="threebhk-empty"
                    >
                      Loading 3BHK data...
                    </td>
                  </tr>
                ) : items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="threebhk-type-badge">
                          {item.type || "Text"}
                        </span>
                      </td>

                      <td className="threebhk-name-cell">
                        {item.name}
                      </td>

                      <td>{item.subtitle}</td>

                      <td className="threebhk-description-cell">
                        {item.description}
                      </td>

                      <td>{item.created || "-"}</td>

                      <td>
                        <div className="threebhk-action-buttons">

                          <button
                            type="button"
                            className="threebhk-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                            disabled={deletingId !== null}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="threebhk-delete-btn"
                            title="Delete"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            disabled={deletingId !== null}
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="threebhk-empty"
                    >
                      No 3BHK items added yet. Click + Add
                      to create your first item.
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
