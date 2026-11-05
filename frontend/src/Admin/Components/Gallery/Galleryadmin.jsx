
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Galleryadmin.css";

// =====================================
// AWS API CONFIGURATION
// =====================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/galleryadmin";

// =====================================
// EMPTY FORM
// =====================================

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function Galleryadmin() {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  // =====================================
  // LOAD GALLERY DATA FROM AWS
  // =====================================

  const loadItems = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to load gallery data.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid gallery data received.");
      }

      setItems(data);
    } catch (error) {
      console.error("Gallery loading error:", error);

      alert("Unable to load gallery data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA WHEN COMPONENT OPENS
  // =====================================

  useEffect(() => {
    loadItems();
  }, []);

  // =====================================
  // OPEN ADD FORM
  // =====================================

  const handleAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // SAVE / UPDATE GALLERY
  // =====================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
      };

      let response;

      // UPDATE EXISTING ITEM
      if (editingId !== null) {
        response = await fetch(API_URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingId,
            ...payload,
          }),
        });
      }

      // ADD NEW ITEM
      else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save gallery item."
        );
      }

      alert(
        editingId !== null
          ? "Gallery updated successfully!"
          : "Gallery added successfully!"
      );

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      // REFRESH DATA FROM AWS
      await loadItems();

    } catch (error) {
      console.error("Gallery save error:", error);

      alert(error.message || "Unable to save gallery data.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // EDIT GALLERY
  // =====================================

  const handleEdit = (item) => {
    setFormData({
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setShowForm(true);
  };

  // =====================================
  // DELETE GALLERY
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete gallery item."
        );
      }

      alert("Gallery deleted successfully!");

      if (editingId === id) {
        handleCancel();
      }

      // REFRESH DATA FROM AWS
      await loadItems();

    } catch (error) {
      console.error("Gallery delete error:", error);

      alert(error.message || "Unable to delete gallery item.");
    }
  };

  // =====================================
  // CANCEL FORM
  // =====================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <div className="gallery-admin">

      {/* HEADER */}

      <div className="gallery-admin-header">

        <div>
          <h2>Home Gallery Admin</h2>
          <p>Manage your home gallery content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="gallery-add-btn"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (

        <div className="gallery-form-card">

          <form onSubmit={handleSave}>

            <div className="gallery-form-body">

              {/* NAME */}

              <div className="gallery-form-group">

                <label htmlFor="gallery-name">
                  Name
                </label>

                <input
                  id="gallery-name"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              {/* SUBTITLE */}

              <div className="gallery-form-group">

                <label htmlFor="gallery-subtitle">
                  Subtitle
                </label>

                <input
                  id="gallery-subtitle"
                  type="text"
                  name="subtitle"
                  placeholder="Enter subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="gallery-form-group">

                <label htmlFor="gallery-description">
                  Description
                </label>

                <textarea
                  id="gallery-description"
                  name="description"
                  placeholder="Enter description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <p className="gallery-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* FORM FOOTER */}

            <div className="gallery-form-footer">

              <button
                type="submit"
                className="gallery-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update"
                    : "Save"}
              </button>

              <button
                type="button"
                className="gallery-cancel-btn"
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

      {/* GALLERY TABLE */}

      {!showForm && (

        <div className="gallery-table-card">

          <div className="gallery-table-wrapper">

            <table className="gallery-table">

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
                    <td colSpan="7" className="gallery-empty">
                      Loading gallery data...
                    </td>
                  </tr>

                ) : items.length > 0 ? (

                  items.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="gallery-type-badge">
                          {item.type || "Text"}
                        </span>
                      </td>

                      <td className="gallery-name-cell">
                        {item.name || "-"}
                      </td>

                      <td>
                        {item.subtitle || "-"}
                      </td>

                      <td className="gallery-description-cell">
                        {item.description || "-"}
                      </td>

                      <td>
                        {formatDate(
                          item.createdAt || item.created
                        )}
                      </td>

                      <td>

                        <div className="gallery-action-buttons">

                          <button
                            type="button"
                            className="gallery-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="gallery-delete-btn"
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
                    <td colSpan="7" className="gallery-empty">
                      No gallery items added yet. Click + Add
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
