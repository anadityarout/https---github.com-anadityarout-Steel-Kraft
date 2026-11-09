
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ChevronDown,
} from "lucide-react";

import "./AboutPageAdmin.css";

// AWS API URL
const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/aboutpageadmin";

const EMPTY_FORM = {
  type: "",
  name: "",
  subtitle: "",
  description: "",
};

export default function AboutPageAdmin() {
  const [items, setItems] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // GET: LOAD DATA FROM AWS
  const loadItems = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load About Page data");
      }

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Error loading About Page data:", error);
      alert("Unable to load About Page data from AWS.");
    } finally {
      setLoading(false);
    }
  };

  // LOAD DATA WHEN COMPONENT OPENS
  useEffect(() => {
    loadItems();
  }, []);

  // OPEN SELECTED FORM
  const handleSelectType = (type) => {
    setFormData({
      ...EMPTY_FORM,
      type,
    });

    setEditingId(null);
    setShowDropdown(false);
    setShowForm(true);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // POST / PUT: SAVE DATA TO AWS
  const handleSave = async (e) => {
    e.preventDefault();

    if (saving) return;

    try {
      setSaving(true);

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
          result.message || "Failed to save About Page content"
        );
      }

      alert(
        isEditing
          ? "About Page content updated successfully!"
          : "About Page content added successfully!"
      );

      handleCancel();

      // Refresh data from AWS
      await loadItems();

    } catch (error) {
      console.error("Error saving About Page data:", error);
      alert(error.message || "Unable to save data.");
    } finally {
      setSaving(false);
    }
  };

  // EDIT ITEM
  const handleEdit = (item) => {
    setFormData({
      type: item.type || "",
      name: item.name || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
    });

    setEditingId(item.id);
    setShowDropdown(false);
    setShowForm(true);
  };

  // DELETE: REMOVE DATA FROM AWS
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this About Page item?"
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
          result.message || "Failed to delete About Page content"
        );
      }

      alert("About Page content deleted successfully!");

      if (editingId === id) {
        handleCancel();
      }

      // Refresh data from AWS
      await loadItems();

    } catch (error) {
      console.error("Error deleting About Page data:", error);
      alert(error.message || "Unable to delete data.");
    }
  };

  // CANCEL FORM
  const handleCancel = () => {
    setShowForm(false);
    setShowDropdown(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  return (
    <div className="about-page-admin">

      {/* PAGE HEADER */}
      <div className="about-page-header">

        <div>
          <h2>About Page Admin</h2>
          <p>Manage your About page content here.</p>
        </div>

        {!showForm && (
          <div className="about-add-wrapper">

            {/* ADD BUTTON */}
            <button
              type="button"
              className="about-add-btn"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Plus size={19} />
              Add
              <ChevronDown size={17} />
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
              <div className="about-add-dropdown">

                <button
                  type="button"
                  onClick={() => handleSelectType("Banner")}
                >
                  Banner
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectType("WHO WE ARE")}
                >
                  WHO WE ARE
                </button>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="about-form-card">

          <form onSubmit={handleSave}>

            <div className="about-form-body">

              {/* SELECTED TYPE */}
              <div className="about-selected-type">
                <span>Content Type:</span>
                <strong>{formData.type}</strong>
              </div>

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
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              <p className="about-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* SAVE AND CANCEL */}
            <div className="about-form-footer">

              <button
                type="submit"
                className="about-save-btn"
                disabled={saving}
              >
                <Save size={19} />
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className="about-cancel-btn"
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
        <div className="about-table-card">

          <div className="about-table-wrapper">

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
                      Loading About Page content...
                    </td>
                  </tr>

                ) : items.length > 0 ? (

                  items.map((item, index) => (

                    <tr key={item.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="about-type-badge">
                          {item.type}
                        </span>
                      </td>

                      <td className="about-name-cell">
                        {item.name}
                      </td>

                      <td>{item.subtitle}</td>

                      <td className="about-description-cell">
                        {item.description}
                      </td>

                      <td>{item.created || "-"}</td>

                      <td>
                        <div className="about-action-buttons">

                          <button
                            type="button"
                            className="about-edit-btn"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil size={19} />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            className="about-delete-btn"
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={18} />
                            <span>Delete</span>
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="about-empty">
                      No About Page content added yet.
                      Click + Add to create your first item.
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
