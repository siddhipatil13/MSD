// Auth controller - simple admin login using JWT.
// NOTE (read this for the viva): credentials come from .env for demonstration.
// A production system would store a hashed password inside an "admins" collection.
const jwt = require("jsonwebtoken");

// POST /api/auth/login
function login(req, res) {
  const { username, password } = req.body || {};

  // Compare with values stored in the .env file
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  // Create a signed token that expires in 1 day
  const token = jwt.sign(
    { username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    admin: { username, role: "admin" },
  });
}

// GET /api/auth/verify -> checks whether the sent token is still valid
function verify(req, res) {
  res.status(200).json({ success: true, admin: req.admin });
}

module.exports = { login, verify };
