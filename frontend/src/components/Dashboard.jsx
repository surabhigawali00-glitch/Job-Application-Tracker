function Dashboard({ applications }) {
  const totalApplications = applications.length;
  
  const appliedCount = applications.filter(
    (application) => application.status === "Applied"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selectCount = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Applications</h3>
          <p>{totalApplications}</p>
        </div>

        <div className="dashboard-card">
          <h3>Applied</h3>
          <p>{appliedCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Interview</h3>
          <p>{interviewCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Selected</h3>
          <p>{selectCount}</p>
        </div>

      </div>
    </section>
  );
}

export default Dashboard;