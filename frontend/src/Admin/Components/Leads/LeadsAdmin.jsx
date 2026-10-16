
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import "./Leads.css";

// =====================================================
// AWS API GATEWAY
// =====================================================

const API_URLS = {
  popup:
    "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/popup",
  quote:
    "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/getquote",
  floatingchat:
    "https://u1mfaahkgg.execute-api.ap-south-1.amazonaws.com/prod/floatingchat",
};

const FILTER_OPTIONS = [
  "All",
  "Popup",
  "Get a Quote",
  "FloatingChat",
];

// =====================================================
// DATE FORMAT
// =====================================================

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

// =====================================================
// NORMALIZE LEAD RECORDS
// Keep original backend ID for delete requests.
// =====================================================

const normalizeLead = (lead, index, source) => {
  const sourceSettings = {
    popup: {
      type: "Popup",
      source: "consultation-popup",
      productService: "Consultation Popup",
    },
    quote: {
      type: "Get a Quote",
      source: "get-a-quote",
      productService: "Get a Quote",
    },
    floatingchat: {
      type: "FloatingChat",
      source: "floating-chat",
      productService: "FloatingChat",
    },
  };

  const settings = sourceSettings[source];

  return {
    ...lead,
    id: `${source}-${lead.id ?? lead.leadId ?? index}`,
    backendId: lead.id ?? lead.leadId ?? null,
    apiSource: source,
    type: settings.type,
    source: settings.source,
    name: lead.name || lead.fullName || "",
    email: lead.email || "",
    phone:
      lead.phone || lead.phoneNumber || lead.mobile || "",
    location: lead.location || lead.city || "",
    productService:
      lead.productService ||
      lead.service ||
      settings.productService,
    projectType: lead.projectType || lead.project || "",
    designOfInterest:
      lead.designOfInterest || lead.design || "",
    message:
      lead.message ||
      lead.notes ||
      lead.description ||
      lead.answersText ||
      "",
    status: lead.status || "New",
    date: lead.date || lead.createdAt || lead.timestamp || "",
  };
};

// =====================================================
// FILTER
// =====================================================

const matchesFilter = (lead, filter) => {
  if (filter === "All") return true;
  if (filter === "Popup") return lead.apiSource === "popup";
  if (filter === "Get a Quote") return lead.apiSource === "quote";
  if (filter === "FloatingChat") {
    return lead.apiSource === "floatingchat";
  }

  return true;
};

// =====================================================
// LEAD DETAILS
// =====================================================

const getDetailRows = (lead) =>
  [
    ["Type", lead.type],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Location", lead.location],
    ["Product / Service", lead.productService],
    ["Project Type", lead.projectType],
    ["Design of Interest", lead.designOfInterest],
    ["Message", lead.message],
    ["Status", lead.status],
    ["Source", lead.source],
    ["Date", formatDate(lead.date)],
  ].filter(([, value]) => value !== undefined && value !== null && value !== "");

// =====================================================
// FETCH API
// =====================================================

const fetchLeadList = async (url, label) => {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`${label}: HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`${label} API did not return a JSON array.`);
  }

  return data;
};

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function LeadsAdmin() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  // ===================================================
  // FETCH ALL THREE SOURCES
  // ===================================================

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      fetchLeadList(API_URLS.popup, "Popup"),
      fetchLeadList(API_URLS.quote, "Get a Quote"),
      fetchLeadList(API_URLS.floatingchat, "FloatingChat"),
    ]);

    const combined = [];
    const errors = [];

    const sources = [
      { key: "popup", label: "Popup" },
      { key: "quote", label: "Get a Quote" },
      { key: "floatingchat", label: "FloatingChat" },
    ];

    results.forEach((result, index) => {
      const source = sources[index];

      if (result.status === "fulfilled") {
        combined.push(
          ...result.value.map((lead, leadIndex) =>
            normalizeLead(lead, leadIndex, source.key)
          )
        );
      } else {
        console.error(
          `${source.label} API error:`,
          result.reason
        );
        errors.push(`${source.label} leads could not load.`);
      }
    });

    combined.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    setLeads(combined);
    setError(errors.join(" "));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ===================================================
  // DELETE LEAD
  //
  // Requires DELETE support in the matching Lambda.
  // The backend ID, not the prefixed UI ID, is sent.
  // ===================================================

  const handleDelete = async (lead) => {
    if (!lead.backendId) {
      setDeleteError(
        "This lead has no backend ID, so it cannot be deleted safely."
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete the ${lead.type} lead for "${lead.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(lead.id);
    setDeleteError("");

    try {
      const url = new URL(API_URLS[lead.apiSource]);
      url.searchParams.set("id", String(lead.backendId));

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Delete failed: HTTP ${response.status}. Check the Lambda DELETE handler.`
        );
      }

      // Remove from the UI only after the backend confirms success.
      setLeads((previous) =>
        previous.filter((item) => item.id !== lead.id)
      );

      setSelectedLead((previous) =>
        previous?.id === lead.id ? null : previous
      );
    } catch (err) {
      console.error("Delete lead error:", err);
      setDeleteError(
        err.message || "Unable to delete this lead."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ===================================================
  // FILTERED LEADS
  // ===================================================

  const filteredLeads = useMemo(
    () => leads.filter((lead) => matchesFilter(lead, filter)),
    [leads, filter]
  );

  // ===================================================
  // COUNTS
  // ===================================================

  const counts = useMemo(
    () => ({
      total: leads.length,
      popup: leads.filter((lead) => lead.apiSource === "popup").length,
      quote: leads.filter((lead) => lead.apiSource === "quote").length,
      floatingchat: leads.filter(
        (lead) => lead.apiSource === "floatingchat"
      ).length,
    }),
    [leads]
  );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <section className="leads-page">
      <h1 className="leads-title">All Leads</h1>

      <div className="leads-filter-wrapper">
        <select
          className="leads-filter-select"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter leads"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="leads-header">
        <div>
          <h2 className="leads-subtitle">
            {filter === "All" ? "All Leads" : `${filter} Leads`}
          </h2>
          <p className="leads-description">
            Consultation requests, Get a Quote enquiries and FloatingChat submissions
          </p>
        </div>

        <button
          type="button"
          className="leads-refresh-btn"
          onClick={fetchLeads}
          disabled={loading || deletingId !== null}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="leads-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="leads-retry-btn"
            onClick={fetchLeads}
            disabled={loading}
          >
            Try Again
          </button>
        </div>
      )}

      {deleteError && (
        <div className="leads-error" role="alert">
          <span>{deleteError}</span>
          <button
            type="button"
            className="leads-retry-btn"
            onClick={() => setDeleteError("")}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="leads-stats">
        <div className="leads-stat-card">
          <span className="leads-stat-label">Total Leads</span>
          <strong className="leads-stat-value">{counts.total}</strong>
        </div>

        <div className="leads-stat-card">
          <span className="leads-stat-label">Popup</span>
          <strong className="leads-stat-value">{counts.popup}</strong>
        </div>

        <div className="leads-stat-card">
          <span className="leads-stat-label">Get a Quote</span>
          <strong className="leads-stat-value">{counts.quote}</strong>
        </div>

        <div className="leads-stat-card">
          <span className="leads-stat-label">FloatingChat</span>
          <strong className="leads-stat-value">
            {counts.floatingchat}
          </strong>
        </div>
      </div>

      <div className="leads-table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Product / Service</th>
              <th>Project Type</th>
              <th>Design of Interest</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={13} className="leads-empty">
                  Loading leads...
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={13} className="leads-empty">
                  No leads found.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, index) => (
                <tr key={lead.id}>
                  <td>{index + 1}</td>

                  <td>
                    <span
                      className={`leads-badge ${
                        lead.apiSource === "floatingchat"
                          ? "leads-badge-floating"
                          : "leads-badge-type"
                      }`}
                    >
                      {lead.type}
                    </span>
                  </td>

                  <td>{lead.name || "-"}</td>
                  <td>{lead.email || "-"}</td>
                  <td>{lead.phone || "-"}</td>
                  <td>{lead.location || "-"}</td>
                  <td>{lead.productService || "-"}</td>
                  <td>{lead.projectType || "-"}</td>
                  <td>{lead.designOfInterest || "-"}</td>
                  <td className="leads-message-cell">
                    {lead.message || "-"}
                  </td>
                  <td>
                    <span className="leads-badge leads-badge-status">
                      {lead.status}
                    </span>
                  </td>
                  <td>{formatDate(lead.date)}</td>

                  <td>
                    <div className="leads-actions">
                      <button
                        type="button"
                        className="leads-btn leads-btn-view"
                        onClick={() => setSelectedLead(lead)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="leads-btn leads-btn-delete"
                        onClick={() => handleDelete(lead)}
                        disabled={deletingId !== null}
                      >
                        {deletingId === lead.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <div
          className="leads-modal-overlay"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="leads-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leads-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="leads-modal-title">Lead Details</h3>

            <dl className="leads-details">
              {getDetailRows(selectedLead).map(([label, value]) => (
                <React.Fragment key={label}>
                  <dt>{label}</dt>
                  <dd>{String(value)}</dd>
                </React.Fragment>
              ))}
            </dl>

            <div className="leads-modal-actions">
              <button
                type="button"
                className="leads-btn leads-btn-view"
                onClick={() => setSelectedLead(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="leads-btn leads-btn-delete"
                onClick={() => handleDelete(selectedLead)}
                disabled={deletingId !== null}
              >
                {deletingId === selectedLead.id
                  ? "Deleting..."
                  : "Delete Lead"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
