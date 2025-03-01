import { useState, useEffect } from "react";
import axios from "axios";
import "./adminRegisterStyles.css";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setAnimated(true);
    }, 100);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:5001/api/auth/register/admin",
        formData
      );
      setMessageType("success");
      setMessage("Admin registered successfully! Please verify your email.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error: unknown) {
      setMessageType("error");
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.error || "Registration failed.");
      } else {
        setMessage("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-register-container">
      {/* Decorative elements */}
      <div className="decoration-circle circle1"></div>
      <div className="decoration-circle circle2"></div>
      <div className="decoration-circle circle3"></div>

      <div className={`admin-card ${animated ? "animated" : ""}`}>
        <div className="admin-card-header">
          <h1 className="admin-title">Admin Registration</h1>
          <p className="admin-subtitle">Join the administration panel</p>
        </div>

        {message && (
          <div className={`message-container ${messageType}`}>
            <div className="message-icon">
              {messageType === "success" ? "✓" : "!"}
            </div>
            <p className="message-text">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter your first name"
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter your last name"
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Create a strong password"
                onChange={handleChange}
                className="admin-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              "Register Account"
            )}
          </button>
        </form>

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <a href="#" className="login-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
