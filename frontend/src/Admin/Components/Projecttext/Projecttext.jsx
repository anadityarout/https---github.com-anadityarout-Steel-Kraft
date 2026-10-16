
import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  FileText,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./Projecttext.css";

// Replace this with your actual Project Text API Gateway URL.
// Do not use the homebanner URL unless that Lambda is configured
// specifically to store Project Text records.

const PROJECT_TEXT_API_URL =
  "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/projecttext";
  
export default function Projecttext() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Read the API response safely.
  const readResponse = async (response) => {
    const text = await response.text();
    let data = {};

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  };

  // Load project text records from the backend.
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (
        !PROJECT_TEXT_API_URL ||
        PROJECT_TEXT_API_URL.includes("PASTE_YOUR")
      ) {
        throw new Error(
          "Add your Project Text API Gateway URL in PROJECT_TEXT_API_URL."
        );
      }

      const response = await fetch(PROJECT_TEXT_API_URL, {
        method: "GET",
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
          "The API response is not an array. Check your Lambda GET response."
        );
      }

      setProjects(records);
    } catch (err) {
      setError(err.message || "Unable to load project text.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset form.
  const resetForm = () => {
    setName("");
    setSubtitle("");
    setDescription("");
    setShowForm(false);
  };

  // Save project text to the backend.
  const handleSave = async (event) => {
    event.preventDefault();

    if (
      !name.trim() &&
      !subtitle.trim() &&
      !description.trim()
    ) {
      setError("Please enter a name, subtitle, or description.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const newProject = {
      type: "Text",
      name: name.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
    };

    try {
      const response = await fetch(PROJECT_TEXT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      await readResponse(response);

      await fetchProjects();

      resetForm();
      setSuccess("Project text saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save project text.");
    } finally {
      setSaving(false);
    }
  };

  // Delete project text from the backend.
  const handleDelete = async (id) => {
    if (!id) {
      setError("This record has no ID. Check your Lambda GET response.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this project text?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${PROJECT_TEXT_API_URL}?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      await readResponse(response);

      await fetchProjects();
      setSuccess("Project text deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete project text.");
    } finally {
      setDeletingId(null);
    }
  };

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
            onClick={() => {
              setError("");
              setSuccess("");
              setShowForm(true);
            }}
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

      {/* ADD FORM */}
      {showForm && (
        <form
          className="projecttext-form"
          onSubmit={handleSave}
        >
          <div className="projecttext-form-header">
            <h2>Add Project Text</h2>
            <p>
              Enter a name, subtitle, or description before saving.
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
              {saving ? "Saving..." : "Save"}
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

                  <td>
                    <button
                      type="button"
                      className="projecttext-delete-btn"
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      aria-label={`Delete project text ${index + 1}`}
                    >
                      <Trash2 size={16} />
                      {deletingId === project.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
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
              Click Add to enter a project name, subtitle, and description.
            </p>
          </div>
        )
      )}
    </section>
  );
}
