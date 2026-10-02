function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        💼 JobTrack
      </div>

      <div className="navbar-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#applications">Applications</a>
        <a href="#add-job">+ Add Job</a>
      </div>
    </nav>
  );
}

export default Navbar;