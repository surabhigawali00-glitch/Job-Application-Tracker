import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // GET applications from MongoDB
  // ========================================

  useEffect(() => {
    fetch("http://localhost:5000/api/applications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        return response.json();
      })
      .then((data) => {
        setApplications(data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        setError("Unable to load applications. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  // ========================================
  // ADD application
  // ========================================

  function addApplication(newApplication) {
    setApplications((prevApplications) => [
      ...prevApplications,
      newApplication,
    ]);
  }


  // ========================================
  // UPDATE application
  // ========================================

  async function updateApplication(updatedApplication) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${updatedApplication._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedApplication),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update application"
        );
      }

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === data._id
            ? data
            : application
        )
      );

      alert("Application updated successfully!");

      return true;
    } catch (error) {
      console.error("Error updating application:", error);

      alert(
        "Failed to update application. Please try again."
      );

      return false;
    }
  }


  // ========================================
  // DELETE application
  // ========================================

  async function deleteApplication(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/applications/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete application"
        );
      }

      setApplications((prevApplications) =>
        prevApplications.filter(
          (application) => application._id !== id
        )
      );

      alert("Application deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);

      alert(
        "Failed to delete application. Please try again."
      );
    }
  }


  return (
    <div>
      <Navbar />

      <main>
        <h1>Job Application Tracker</h1>

        <p>
          Track your job applications in one place.
        </p>

        {loading && (
          <p style={{textAlign: "center"}}>
            Loading applications...
          </p>
        )}

        {error &&(
          <p style={{textAlign: "center"}}>
            {error}
          </p>
        )}

        <Dashboard
          applications={applications}
        />

        <ApplicationForm
          addApplication={addApplication}
        />

        <ApplicationList
          applications={applications}
          deleteApplication={deleteApplication}
          updateApplication={updateApplication}
        />
      </main>
    </div>
  );
}

export default App;