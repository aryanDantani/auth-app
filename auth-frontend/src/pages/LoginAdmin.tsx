import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css"; // Import the CSS file

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData
      );
      if (response.data.role !== "admin") {
        setMessage("You are not allowed to login from here.");
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
        setMessage("Login successful!");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.error || "Login failed.");
      } else {
        setMessage("Login failed.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="register-links">
          <button 
            className="register-link" 
            onClick={() => navigate("/register-admin")}
          >
            Register as admin
          </button>
          <button 
            className="register-link" 
            onClick={() => navigate("/register-customer")}
          >
            Register as customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;