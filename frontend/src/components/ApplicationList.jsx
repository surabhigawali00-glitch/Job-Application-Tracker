import { useState } from "react";

function ApplicationList({
  applications,
  deleteApplication,
  updateApplication,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    company: "",
    role: "",
    location: "",
    applicationDate: "",
    status: "Applied",
    jobType: "Full-time",
    jobUrl: "",
    notes: "",
  });

  // Format application date
  function formatDate(date) {
    if (!date) {
      return "Not provided";
    }

    const [year, month, day] = date.split("-");

    const formattedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // Search and status filter
  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.role.toLowerCase().includes(search) ||
      application.location.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All Status" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Start editing an application
  function handleEdit(application) {
    setEditingId(application._id);

    setEditForm({
      company: application.company,
      role: application.role,
      location: application.location,
      applicationDate: application.applicationDate,
      status: application.status,
      jobType: application.jobType,
      jobUrl: application.jobUrl || "",
      notes: application.notes || "",
    });
  }

  // Handle edit form changes
  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditForm({
      ...editForm,
      [name]: value,
    });
  }

  // Save updated application
  async function handleUpdate(event) {
    event.preventDefault();

    const success = await updateApplication({
      _id: editingId,
      ...editForm,
    });

    if (success) {
      setEditingId(null);
    }
  }

  // Cancel editing
  function cancelEdit() {
    setEditingId(null);
  }

  return (
    <section className="application-list" id="applications">
      <div className="application-list-header">
        <h2>My Applications</h2>

        <button
          className="add-job-button"
          onClick={() => {
            document
              .getElementById("add-job")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          + Add Job
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by company, role or location..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All Status</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Applications */}
      <div className="applications">
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>
            <p>
              Add a job application or change your search/filter.
            </p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              className="application-card"
              key={application._id}
            >
              {editingId === application._id ? (
                <form
                  onSubmit={handleUpdate}
                  className="edit-form"
                >
                  <div className="form-group">
                    <label>Company Name</label>

                    <input
                      type="text"
                      name="company"
                      value={editForm.company}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Job Role</label>

                    <input
                      type="text"
                      name="role"
                      value={editForm.role}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Location</label>

                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Application Date</label>

                    <input
                      type="date"
                      name="applicationDate"
                      value={editForm.applicationDate}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    >
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Type</label>

                    <select
                      name="jobType"
                      value={editForm.jobType}
                      onChange={handleEditChange}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job URL</label>

                    <input
                      type="url"
                      name="jobUrl"
                      value={editForm.jobUrl}
                      onChange={handleEditChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Notes</label>

                    <textarea
                      name="notes"
                      value={editForm.notes}
                      onChange={handleEditChange}
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="application-actions">
                    <button type="submit">
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="application-info">
                    <h3>{application.company}</h3>

                    <p className="application-role">
                      {application.role}
                    </p>

                    <p className="application-location">
                      📍 {application.location}
                    </p>

                    <div className="application-meta">
                      <p>
                        📅 Applied on:{" "}
                        <strong>
                          {formatDate(application.applicationDate)}
                        </strong>
                      </p>

                      <p>
                        💼 Job Type:{" "}
                        <strong>{application.jobType}</strong>
                      </p>
                    </div>

                    {application.notes && (
                      <div className="application-note">
                        <p>
                          📝 <strong>Notes:</strong>
                        </p>

                        <p>{application.notes}</p>
                      </div>
                    )}

                    {application.jobUrl && (
                      <div className="application-job-link">
                        <a
                          href={application.jobUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Job
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="application-actions">
                    <span
                      className={`status ${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>

                    <button
                      onClick={() => handleEdit(application)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this application?"
                        );

                        if (confirmDelete) {
                          deleteApplication(application._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ApplicationList;