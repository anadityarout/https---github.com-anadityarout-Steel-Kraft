
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Fourbhkadmin.css";

// ==========================================
// AWS API URL
// ==========================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/fourbhkadmin";

// ==========================================
// EMPTY FORM
// ==========================================

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function Fourbhkadmin() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD DATA FROM AWS
  // ==========================================

  const loadItems = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load 4BHK data");
      }

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error loading 4BHK data:", error);
      alert("Unable to load 4BHK data from AWS.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
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
  // SAVE DATA TO AWS
  // ==========================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let response;

      if (editingId !== null) {
        // UPDATE EXISTING ITEM

        response = await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingId,
            ...formData,
          }),
        });

      } else {
        // ADD NEW ITEM

        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save 4BHK data"
        );
      }

      await loadItems();

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      alert(
        editingId !== null
          ? "4BHK item updated successfully!"
          : "4BHK item added successfully!"
      );

    } catch (error) {
      console.error("Error saving 4BHK data:", error);
      alert(error.message || "Error saving 4BHK data.");
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
  };

  // ==========================================
  // DELETE ITEM FROM AWS
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this 4BHK item?"
    );

    if (!confirmDelete) return;

    try {
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
          result.message || "Unable to delete 4BHK item"
        );
      }

      await loadItems();

      if (editingId === id) {
        handleCancel();
      }

      alert("4BHK item deleted successfully!");

    } catch (error) {
      console.error("Error deleting 4BHK item:", error);
      alert(error.message || "Error deleting 4BHK item.");
    }
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <div className="fourbhk-admin">

      {/* PAGE HEADER */}

      <div className="fourbhk-admin-header">

        <div>
          <h2>4BHK Admin</h2>
          <p>Manage your 4BHK content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="fourbhk-add-btn"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (

        <div className="fourbhk-form-card">

          <form onSubmit={handleSave}>

            <div className="fourbhk-form-body">

              {/* NAME */}

              <div className="fourbhk-form-group">

                <label htmlFor="fourbhk-name">
                  Name
                </label>

                <input
                  id="fourbhk-name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              {/* SUBTITLE */}

              <div className="fourbhk-form-group">

                <label htmlFor="fourbhk-subtitle">
                  Subtitle
                </label>

                <input
                  id="fourbhk-subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="fourbhk-form-group">

                <label htmlFor="fourbhk-description">
                  Description
                </label>

                <textarea
                  id="fourbhk-description"
                  name="description"
                  placeholder="Enter description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <p className="fourbhk-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* SAVE AND CANCEL */}

            <div className="fourbhk-form-footer">

              <button
                type="submit"
                className="fourbhk-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className="fourbhk-cancel-btn"
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

        <div className="fourbhk-table-card">

          <div className="fourbhk-table-wrapper">

            <table className="fourbhk-table">

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
                    <td colSpan="7" className="fourbhk-empty">
                      Loading 4BHK data...
                    </td>
                  </tr>

                ) : items.length > 0 ? (

                  items.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="fourbhk-type-badge">
                          {item.type || "Text"}
                        </span>
                      </td>

                      <td className="fourbhk-name-cell">
                        {item.name}
                      </td>

                      <td>{item.subtitle}</td>

                      <td className="fourbhk-description-cell">
                        {item.description}
                      </td>

                      <td>{item.created || "-"}</td>

                      <td>

                        <div className="fourbhk-action-buttons">

                          <button
                            type="button"
                            className="fourbhk-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="fourbhk-delete-btn"
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
                    <td colSpan="7" className="fourbhk-empty">
                      No 4BHK items added yet. Click + Add to
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
