import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="stars"></div>
      <div className="twinkling"></div>

      <div className="dashboard-content">
        <h1 className="main-title">Choose Your Path</h1>

        <div className="cards-container">
          {/* Admin Card */}
          <div
            className="card admin-card"
            onClick={() => navigate("/register-admin")}
          >
            <div className="card-content">
              <div className="card-front">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L10.2 9.7L4 10.2L8.5 14.1L7.2 20L12 16.8L16.8 20L15.5 14.1L20 10.2L13.8 9.7L12 4Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="card-title">Admin Portal</h2>
              </div>

              <div className="card-back">
                <h3>Register as Admin</h3>
                <ul>
                  <li>Manage system users</li>
                  <li>Configure platform settings</li>
                  <li>Monitor activities</li>
                  <li>Generate reports</li>
                </ul>
                <div className="card-cta">Click to continue</div>
              </div>
            </div>
          </div>

          {/* Customer Card */}
          <div
            className="card customer-card"
            onClick={() => navigate("/register-customer")}
          >
            <div className="card-content">
              <div className="card-front">
                <div className="card-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="card-title">Customer Access</h2>
              </div>

              <div className="card-back">
                <h3>Register as Customer</h3>
                <ul>
                  <li>Browse product catalog</li>
                  <li>Track your orders</li>
                  <li>Access support center</li>
                  <li>Manage your profile</li>
                </ul>
                <div className="card-cta">Click to continue</div>
              </div>
            </div>
          </div>
        </div>

        <div className="login-prompt">
          Already registered? <a href="/login-admin">Log in here</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
