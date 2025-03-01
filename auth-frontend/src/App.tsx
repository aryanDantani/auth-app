import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterAdmin from "./pages/RegisterAdmin";
import LoginAdmin from "./pages/LoginAdmin";
import RegisterCustomer from "./pages/RegisterCustomer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
  );
};

export default App;
