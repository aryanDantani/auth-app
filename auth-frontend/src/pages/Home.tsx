import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);

    const timeout = setTimeout(() => {
      const confetti = document.getElementById("confetti-container");
      if (confetti) {
        for (let i = 0; i < 100; i++) {
          createConfetti(confetti as HTMLDivElement);
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const createConfetti = (container: HTMLDivElement) => {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confetti.style.backgroundColor = getRandomColor();
    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  };

  const getRandomColor = () => {
    const colors = ["#ff6b6b", "#48dbfb", "#1dd1a1", "#feca57", "#5f27cd"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={`admin-container ${loaded ? "loaded" : ""}`}>
      <div id="confetti-container" className="confetti-container"></div>
      <div className="welcome-card">
        <div className="checkmark-container">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1 className="welcome-title">Admin Login Successful!</h1>
        <p className="welcome-message">Welcome back to the dashboard</p>
        <div className="button-container">
          <button
            className="dashboard-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
