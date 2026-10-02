import { useState } from "react";

function ApplicationForm({ addApplication }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    applicationDate: "",
    status: "Applied",
    jobType: "Full-time",
    jobUrl: "",
    notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   if (
  //     !formData.company.trim()||
  //     !formData.role.trim()||
  //     !formData.location.trim()||
  //     !formData.applicationDate
  //   ){
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   addApplication(formData);

  //   setFormData({
  //     company: "",
  //     role: "",
  //     location: "",
  //     applicationDate: "",
  //     status: "Applied",
  //     jobType: "Full-time",
  //     jobUrl: "",
  //     notes: "",
  //   });
  // }

  //  async function handleSubmit(event){
  //   event.preventDefault();

  //   if (
  //     !formData.company.trim() ||
  //     !formData.role.trim() ||
  //     !formData.location.trim()||
  //     !formData.applicationDate
  //   ){
  //     alert("Please fill all required fields.");
  //     return;
  //   }

  //   try {
  //     const response = await featch(
  //       "http://localhost:5000/api/applications",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body : JSON.stringify(formData),
  //       }
  //     );
      
  //     const dated = await response.json();

  //     if(!response.ok){
  //       throw new Error(DataTransfer.message || "Failed to add application");
  //     }
       
  //      console.log("Application saved:", data);
  //      addApplication(data);
  //      alert("Application added successfully!");

  //      setFormData({
  //       company:"",
  //       role: "",
  //       location: "",
  //       applicationDate: "",
  //       status:"Applied",
  //       jobType: "Full-time",
  //       jobUrl: "",
  //       notes: "",
  //      });
  //     } catch (error){
  //       console.error("Error adding application:", error);

  //       alert("Failed to add application. please try again.");
  //     }
  //  }

  async function handleSubmit(event) {
  event.preventDefault();

  if (
    !formData.company.trim() ||
    !formData.role.trim() ||
    !formData.location.trim() ||
    !formData.applicationDate
  ) {
    alert("Please fill all required fields.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add application");
    }

    console.log("Application saved:", data);

    addApplication(data);

    alert("Application added successfully!");

    setFormData({
      company: "",
      role: "",
      location: "",
      applicationDate: "",
      status: "Applied",
      jobType: "Full-time",
      jobUrl: "",
      notes: "",
    });
  } catch (error) {
    console.error("Error adding application:", error);

    alert("Failed to add application. Please try again.");
  }
}

  return (
    <section className="application-form" id="add-job">
      <h2>Add Job Application</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="form-group">
          <label>Job Role</label>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. React Developer"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Pune"
            required
          />
        </div>

        <div className="form-group">
          <label>Application Date</label>

          <input
            type="date"
            name="applicationDate"
            value={formData.applicationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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
            value={formData.jobType}
            onChange={handleChange}
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
            value={formData.jobUrl}
            onChange={handleChange}
            placeholder="https://example.com/job"
          />
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this application..."
            rows="4"
          ></textarea>
        </div>

        <button type="submit">Add Application</button>
      </form>
    </section>
  );
}

export default ApplicationForm;