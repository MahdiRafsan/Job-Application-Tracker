import { NavLink } from "react-router-dom";

import "./landing-page.css";

const LandingPageComponent = () => {
  return (
    <div className="landing-page-container">
      <header className="landing-page-header">
        <h1 className="landing-page-logo">Job Tracker</h1>
        <div className="landing-page-links">
          <NavLink to="#" activeclassname="active">
            Home
          </NavLink>
          <NavLink to="/auth/login" activeclassname="active">
            Login
          </NavLink>
          <NavLink to="/auth/register" activeclassname="active">
            Register
          </NavLink>
        </div>
      </header>
      <main className="landing-page-body">
        <h1>Job Tracker</h1>
        <p>
          Welcome to Job Tracker!
          <br />
          The solution to all your job application tracking needs.
          <br />
          Jump right in and use our software to track your applications and land
          the job of your dreams.
        </p>
      </main>
      <footer className="landing-page-footer">
        <p>&copy; 2022 Job Tracker</p>
      </footer>
    </div>
  );
};

export default LandingPageComponent;
