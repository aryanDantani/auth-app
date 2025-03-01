import { useState, useEffect } from "react";
import axios from "axios";
import "./registerCustomer.css";

export default function RegisterCustomer() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axios.post(
        "http://localhost:5001/api/auth/register/customer",
        formData
      );
      setMessageType("success");
      setMessage("Registration successful! Check your email.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
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
    <div className="customer-register-container">
      {/* Decorative elements */}
      <div className="decoration-circle circle1"></div>
      <div className="decoration-circle circle2"></div>
      <div className="decoration-circle circle3"></div>
      
      <div className={`customer-card ${animated ? 'animated' : ''}`}>
        <div className="customer-card-header">
          <h1 className="customer-title">Customer Registration</h1>
          <p className="customer-subtitle">Create your customer account</p>
        </div>
        
        {message && (
          <div className={`message-container ${messageType}`}>
            <div className="message-icon">
              {messageType === "success" ? "✓" : "!"}
            </div>
            <p className="message-text">{message}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="customer-form">
          <div className="form-group">
            <label htmlFor="firstName" className="input-label">First Name</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input 
                id="firstName"
                type="text" 
                name="firstName" 
                value={formData.firstName}
                placeholder="Enter your first name" 
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                className="customer-input" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName" className="input-label">Last Name</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input 
                id="lastName"
                type="text" 
                name="lastName" 
                value={formData.lastName}
                placeholder="Enter your last name" 
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                className="customer-input" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <div className="input-container">
              <span className="input-icon">✉️</span>
              <input 
                id="email"
                type="email" 
                name="email" 
                value={formData.email}
                placeholder="Enter your email" 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="customer-input" 
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input 
                id="password"
                type="password" 
                name="password" 
                value={formData.password}
                placeholder="Create a strong password" 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                className="customer-input" 
                required 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
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
          <p>Already have an account? <a href="#" className="login-link">Login</a></p>
        </div>
      </div>
    </div>
  );
}