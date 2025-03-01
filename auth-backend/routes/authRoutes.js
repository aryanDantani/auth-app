const express = require("express");
const { 
  registerCustomer, 
  registerAdmin, 
  verifyEmail, 
  login, 
  forgotPassword, 
  resetPassword 
} = require("../controllers/authController");

const router = express.Router();

// Customer Registration
router.post("/register/customer", registerCustomer);

// Admin Registration
router.post("/register/admin", registerAdmin);

// Email Verification
router.get("/verify", verifyEmail);

// Admin Login (Customers not allowed)
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

module.exports = router;
