
import React, { useEffect, useState } from "react";
import {
  Plus,
  Save,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import "./Fasterdesign.css";

// =====================================
// AWS API GATEWAY URL
// =====================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/fasterdesignadmin";

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

const Fasterdesign = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA FROM AWS
  // =====================================

  const loadItems = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to load Faster By Design data.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data received from server.");
      }

      setItems(data);
    } catch (error) {
      console.error("Error loading Faster By Design data:", error);
      alert(error.message || "Unable to load data from AWS.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================

  useEffect(() => {
    loadItems();
  }, []);

  // =====================================
  // ADD BUTTON
  // =====================================

  const handleAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
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
  // SAVE / UPDATE DATA TO AWS
  // ALL FIELDS OPTIONAL
  // =====================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        subtitle: form.subtitle.trim(),
        description: form.description.trim(),
      };

      let response;

      if (editingId) {
        // UPDATE EXISTING RECORD

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
      } else {
        // CREATE NEW RECORD

        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error("Unable to save Faster By Design data.");
      }

      await loadItems();

      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      alert(
        editingId
          ? "Faster By Design updated successfully!"
          : "Faster By Design added successfully!"
      );
    } catch (error) {
      console.error("Error saving Faster By Design data:", error);
      alert(error.message || "Something went wrong while saving.");
    } finally {
      setLoading(false);
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
    setShowForm(true);
  };

  // =====================================
  // DELETE ITEM FROM AWS
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Unable to delete Faster By Design data.");
      }

      await loadItems();

      alert("Faster By Design deleted successfully!");
    } catch (error) {
      console.error("Error deleting Faster By Design data:", error);
      alert(error.message || "Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // CANCEL FORM
  // =====================================

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
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
    <div className="faster-admin">

      {/* HEADER */}

      <div className="faster-admin-header">

        <div>
          <h2>FASTER BY DESIGN</h2>
          <p>Manage your Faster By Design content</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="faster-add-btn"
            onClick={handleAdd}
            disabled={loading}
          >
            <Plus size={19} />
            Add
          </button>
        )}

      </div>

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="faster-form"
          onSubmit={handleSave}
          noValidate
        >

          <div className="faster-form-body">

            {/* NAME */}

            <div className="faster-form-group">

              <label htmlFor="faster-name">
                Name
              </label>

              <input
                id="faster-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
              />

            </div>

            {/* SUBTITLE */}

            <div className="faster-form-group">

              <label htmlFor="faster-subtitle">
                Subtitle
              </label>

              <input
                id="faster-subtitle"
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="faster-form-group">

              <label htmlFor="faster-description">
                Description
              </label>

              <textarea
                id="faster-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows="5"
              />

            </div>

            <small className="faster-optional-note">
              All fields are optional. You can save without entering any information.
            </small>

          </div>

          {/* FORM FOOTER */}

          <div className="faster-form-footer">

            <button
              type="submit"
              className="faster-save-btn"
              disabled={loading}
            >
              <Save size={17} />
              {loading
                ? "Please wait..."
                : editingId
                ? "Update"
                : "Save"}
            </button>

            <button
              type="button"
              className="faster-cancel-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              <X size={17} />
              Cancel
            </button>

          </div>

        </form>
      )}

      {/* TABLE */}

      {!showForm && (
        <div className="faster-table-wrapper">

          <table className="faster-table">

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
                  <td colSpan="7" className="faster-empty">
                    Loading data...
                  </td>
                </tr>

              ) : items.length > 0 ? (

                items.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>
                      <span className="faster-type-badge">
                        Text
                      </span>
                    </td>

                    <td className="faster-name-cell">
                      {item.name || "-"}
                    </td>

                    <td>
                      {item.subtitle || "-"}
                    </td>

                    <td className="faster-description-cell">
                      {item.description || "-"}
                    </td>

                    <td>
                      {formatDate(item.createdAt)}
                    </td>

                    <td>

                      <div className="faster-actions">

                        <button
                          type="button"
                          className="faster-edit-btn"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                          disabled={loading}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="faster-delete-btn"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="faster-empty"
                  >
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

export default Fasterdesign;
