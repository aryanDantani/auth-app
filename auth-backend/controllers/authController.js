const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Common function for registration
const registerUser = async (req, res, role) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(password,req.body, "register user");
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "hashed password");
  const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const query =
    "INSERT INTO users (first_name, last_name, email, password, role, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)";
  console.log(req.body, "123456");
  db.query(
    query,
    [firstName, lastName, email, hashedPassword, role, 0, verificationToken],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      console.log(req.body, "123457");
      const verificationLink = `${process.env.CLIENT_URL}/verify?token=${verificationToken}`;
      sendEmail(
        email,
        "Verify your account",
        `Click here to verify: ${verificationLink}`
      );

      res.json({
        message: `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } registered. Please verify your email.`,
      });
    }
  );
};

// ✅ Customer Registration (Assigns role 'customer')
const registerCustomer = (req, res) => {
  registerUser(req, res, "customer");
};

// ✅ Admin Registration (Assigns role 'admin')
const registerAdmin = (req, res) => {
  registerUser(req, res, "admin");
};

// ✅ Email Verification
const verifyEmail = (req, res) => {
  const { token } = req.query;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ error: "Invalid or expired token" });

    const query = "UPDATE users SET is_verified = 1 WHERE email = ?";
    db.query(query, [decoded.email], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      // res.json({ message: "Email verified successfully" });
      res.redirect("http://localhost:5173/login-admin");
    });
  });
};

// ✅ Admin Login (Prevents customer login)
const login = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ error: "Invalid credentials" });
    if (!user.is_verified)
      return res.status(403).json({ error: "Please verify your email first" });

    if (user.role !== "admin")
      return res
        .status(403)
        .json({ error: "You are not allowed to login from here" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, role: user.role });
  });
};

// ✅ Forgot Password (Sends reset link)
const forgotPassword = (req, res) => {
  const { email } = req.body;
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  sendEmail(
    email,
    "Reset Your Password",
    `Click here to reset your password: ${resetLink}`
  );

  res.json({ message: "Password reset link sent to your email." });
};

// ✅ Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(400).json({ error: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = "UPDATE users SET password = ? WHERE email = ?";
    db.query(query, [hashedPassword, decoded.email], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Password reset successful" });
    });
  });
};

module.exports = {
  registerCustomer,
  registerAdmin,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};
