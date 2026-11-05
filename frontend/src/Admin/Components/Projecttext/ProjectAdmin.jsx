
import React, { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./ProjectAdmin.css";

// =====================================
// AWS API GATEWAY URL
// =====================================

const API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/projectadmin";

// =====================================
// EMPTY FORM
// =====================================

const EMPTY_FORM = {
  name: "",
  subtitle: "",
  description: "",
};

export default function ProjectAdmin() {
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD PROJECTS FROM AWS
  // =====================================

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Unable to load project data.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid project data received.");
      }

      setProjects(data);

      return data;

    } catch (error) {
      console.error("Error loading projects:", error);
      throw error;

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================

  useEffect(() => {
    loadProjects().catch(() => {
      alert("Unable to load projects from AWS. Please try again.");
    });
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
  // SAVE / UPDATE PROJECT
  // =====================================

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
      };

      let response;

      if (editingId !== null) {
        // UPDATE EXISTING PROJECT

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
        // ADD NEW PROJECT

        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save project."
        );
      }

      // Reload records from AWS
      await loadProjects();

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      alert(
        editingId !== null
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

    } catch (error) {
      console.error("Error saving project:", error);

      alert(
        error.message || "Something went wrong while saving."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // EDIT PROJECT
  // =====================================

  const handleEdit = (project) => {
    setFormData({
      name: project.name || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
    });

    setEditingId(project.id);

    setShowForm(true);
  };

  // =====================================
  // DELETE PROJECT
  // =====================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
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

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete project."
        );
      }

      await loadProjects();

      if (editingId === id) {
        handleCancel();
      }

      alert("Project deleted successfully!");

    } catch (error) {
      console.error("Error deleting project:", error);

      alert(
        error.message || "Something went wrong while deleting."
      );

    } finally {
      setLoading(false);
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
      return "-";
    }

    return parsedDate.toLocaleDateString("en-GB");
  };

  // =====================================
  // JSX
  // =====================================

  return (
    <div className="project-admin">

      {/* PAGE HEADER */}

      <div className="project-admin-header">

        <div>
          <h2>Home Project Admin</h2>
          <p>Manage your home project content here.</p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="project-add-btn"
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
        <div className="project-form-card">

          <form onSubmit={handleSave}>

            <div className="project-form-body">

              {/* NAME */}

              <div className="project-form-group">

                <label htmlFor="project-name">
                  Name
                </label>

                <input
                  id="project-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />

              </div>

              {/* SUBTITLE */}

              <div className="project-form-group">

                <label htmlFor="project-subtitle">
                  Subtitle
                </label>

                <input
                  id="project-subtitle"
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter subtitle"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="project-form-group">

                <label htmlFor="project-description">
                  Description
                </label>

                <textarea
                  id="project-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  rows="5"
                />

              </div>

              <p className="project-optional-text">
                All fields are optional. You can save without
                entering any information.
              </p>

            </div>

            {/* FORM BUTTONS */}

            <div className="project-form-footer">

              <button
                type="submit"
                className="project-save-btn"
                disabled={loading}
              >
                <Save size={19} />

                {loading
                  ? "Please wait..."
                  : editingId !== null
                  ? "Update"
                  : "Save"}
              </button>

              <button
                type="button"
                className="project-cancel-btn"
                onClick={handleCancel}
                disabled={loading}
              >
                <X size={19} />
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* PROJECT TABLE */}

      {!showForm && (
        <div className="project-table-card">

          <div className="project-table-wrapper">

            <table className="project-table">

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
                    <td colSpan="7" className="project-empty">
                      Loading projects...
                    </td>
                  </tr>

                ) : projects.length > 0 ? (

                  projects.map((project, index) => (

                    <tr key={project.id}>

                      <td>{index + 1}</td>

                      <td>
                        <span className="project-type-badge">
                          {project.type || "Text"}
                        </span>
                      </td>

                      <td className="project-name-cell">
                        {project.name || "-"}
                      </td>

                      <td>
                        {project.subtitle || "-"}
                      </td>

                      <td className="project-description-cell">
                        {project.description || "-"}
                      </td>

                      <td>
                        {formatDate(
                          project.createdAt || project.created
                        )}
                      </td>

                      <td>

                        <div className="project-action-buttons">

                          <button
                            type="button"
                            className="project-edit-btn"
                            onClick={() => handleEdit(project)}
                            title="Edit"
                            disabled={loading}
                          >
                            <Pencil size={19} />
                          </button>

                          <button
                            type="button"
                            className="project-delete-btn"
                            onClick={() => handleDelete(project.id)}
                            title="Delete"
                            disabled={loading}
                          >
                            <Trash2 size={19} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="7" className="project-empty">
                      No projects added yet. Click + Add to create
                      your first project.
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
