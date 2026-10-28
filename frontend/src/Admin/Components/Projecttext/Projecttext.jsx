
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  FileText,
  Trash2,
  Save,
  X,
  Pencil,
} from "lucide-react";

import "./Projecttext.css";

const PROJECT_TEXT_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/projecttext";

export default function Projecttext() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // HANDLE API RESPONSE
  // ==========================================

  const readResponse = async (response) => {
    const text = await response.text();
    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("The API returned an invalid response.");
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}.`
      );
    }

    return data;
  };

  // ==========================================
  // LOAD PROJECT TEXT
  // ==========================================

  const fetchProjects = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError("");

      const response = await fetch(PROJECT_TEXT_API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await readResponse(response);

      const records = Array.isArray(data)
        ? data
        : Array.isArray(data.items)
        ? data.items
        : Array.isArray(data.projects)
        ? data.projects
        : null;

      if (!records) {
        throw new Error(
          "The API did not return a valid project array."
        );
      }

      setProjects(records);
      return true;
    } catch (err) {
      console.error("Load project text error:", err);
      setError(err.message || "Unable to load project text.");
      return false;
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();

  }, [fetchProjects]);

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setName("");
    setSubtitle("");
    setDescription("");
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAdd = () => {
    resetForm();
    setSuccess("");
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const handleEdit = (project) => {
    if (!project.id) {
      setError(
        "This record has no ID and cannot be edited."
      );
      return;
    }

    setEditingId(project.id);
    setName(project.name || "");
    setSubtitle(project.subtitle || "");
    setDescription(project.description || "");

    setError("");
    setSuccess("");
    setShowForm(true);

    window.setTimeout(() => {
      document
        .getElementById("projecttext-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // ==========================================
  // ADD OR UPDATE PROJECT TEXT
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    if (
      !name.trim() &&
      !subtitle.trim() &&
      !description.trim()
    ) {
      setError(
        "Please enter a name, subtitle, or description."
      );
      return;
    }

    const isEditing = editingId !== null;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        type: "Text",
        name: name.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
      };

      // Send the existing ID when editing.
      if (isEditing) {
        payload.id = editingId;
      }

      const response = await fetch(PROJECT_TEXT_API_URL, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await readResponse(response);

      // Refresh the table from the API after saving.
      const refreshed = await fetchProjects(false);

      if (!refreshed) {
        throw new Error(
          "The save request succeeded, but the table could not refresh. Reload the page to verify the saved data."
        );
      }

      resetForm();

      setSuccess(
        result.message ||
          (isEditing
            ? "Project text updated successfully."
            : "Project text added successfully.")
      );
    } catch (err) {
      console.error("Save project text error:", err);
      setError(
        err.message || "Unable to save project text."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE PROJECT TEXT
  // ==========================================

  const handleDelete = async (id) => {
    if (!id) {
      setError(
        "This record has no ID and cannot be deleted."
      );
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this project text?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${PROJECT_TEXT_API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await readResponse(response);

      setProjects((previous) =>
        previous.filter(
          (project) => String(project.id) !== String(id)
        )
      );

      if (String(editingId) === String(id)) {
        resetForm();
      }

      setSuccess(
        result.message || "Project text deleted successfully."
      );
    } catch (err) {
      console.error("Delete project text error:", err);
      setError(
        err.message || "Unable to delete project text."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="projecttext-admin">

      {/* PAGE HEADER */}

      <div className="projecttext-header">
        <div className="projecttext-heading">
          <div className="projecttext-heading-icon">
            <FileText size={22} />
          </div>

          <div>
            <h1>Project Text</h1>
            <p>
              Manage your project names, subtitles, and descriptions.
            </p>
          </div>
        </div>

        {!showForm && (
          <button
            type="button"
            className="projecttext-add-btn"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add
          </button>
        )}
      </div>

      {/* STATUS MESSAGES */}

      {error && (
        <div className="projecttext-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="projecttext-success" role="status">
          {success}
        </div>
      )}

      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          id="projecttext-form"
          className="projecttext-form"
          onSubmit={handleSave}
        >
          <div className="projecttext-form-header">
            <h2>
              {editingId !== null
                ? "Edit Project Text"
                : "Add Project Text"}
            </h2>

            <p>
              {editingId !== null
                ? "Update the fields below and save your changes."
                : "Enter a name, subtitle, or description before saving."}
            </p>
          </div>

          <div className="projecttext-form-body">

            {/* NAME */}

            <div className="projecttext-field">
              <label htmlFor="projecttext-name">
                Name
              </label>

              <input
                id="projecttext-name"
                type="text"
                placeholder="Enter project name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                disabled={saving}
              />
            </div>

            {/* SUBTITLE */}

            <div className="projecttext-field">
              <label htmlFor="projecttext-subtitle">
                Subtitle
              </label>

              <input
                id="projecttext-subtitle"
                type="text"
                placeholder="Enter project subtitle"
                value={subtitle}
                onChange={(event) =>
                  setSubtitle(event.target.value)
                }
                disabled={saving}
              />
            </div>

            {/* DESCRIPTION */}

            <div className="projecttext-field">
              <label htmlFor="projecttext-description">
                Description
              </label>

              <textarea
                id="projecttext-description"
                rows={4}
                placeholder="Enter project description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                disabled={saving}
              />
            </div>
          </div>

          {/* FORM ACTIONS */}

          <div className="projecttext-form-actions">
            <button
              type="submit"
              className="projecttext-save-btn"
              disabled={saving}
            >
              <Save size={17} />

              {saving
                ? "Saving..."
                : editingId !== null
                ? "Save Changes"
                : "Save"}
            </button>

            <button
              type="button"
              className="projecttext-cancel-btn"
              onClick={resetForm}
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* PROJECT TABLE */}

      {loading ? (
        <div className="projecttext-empty-state">
          <p>Loading project text...</p>
        </div>
      ) : projects.length > 0 ? (
        <div className="projecttext-table-wrapper">
          <table className="projecttext-table">
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
              {projects.map((project, index) => (
                <tr key={project.id || index}>
                  <td>{index + 1}</td>

                  <td>{project.type || "Text"}</td>

                  <td className="projecttext-name-cell">
                    {project.name || "—"}
                  </td>

                  <td className="projecttext-subtitle-cell">
                    {project.subtitle || "—"}
                  </td>

                  <td className="projecttext-description-cell">
                    {project.description || "—"}
                  </td>

                  <td>{project.created || "—"}</td>

                  {/* EDIT AND DELETE */}

                  <td>
                    <div className="projecttext-action-buttons">
                      <button
                        type="button"
                        className="projecttext-edit-btn"
                        onClick={() => handleEdit(project)}
                        disabled={
                          saving || deletingId !== null
                        }
                        aria-label={`Edit project text ${index + 1}`}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="projecttext-delete-btn"
                        onClick={() => handleDelete(project.id)}
                        disabled={
                          saving || deletingId === project.id
                        }
                        aria-label={`Delete project text ${index + 1}`}
                      >
                        <Trash2 size={15} />

                        {deletingId === project.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showForm && (
          <div className="projecttext-empty-state">
            <FileText size={34} strokeWidth={1.5} />

            <h3>No project text added yet</h3>

            <p>
              Click Add to enter a project name, subtitle,
              and description.
            </p>
          </div>
        )
      )}
    </section>
  );
}
