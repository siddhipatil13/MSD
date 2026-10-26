// Theme route - demonstrates COOKIES (syllabus concept).
// The visitor's colour theme choice is stored in a cookie for 7 days.
const express = require("express");
const router = express.Router();

// POST /api/theme  body: { theme: "light" | "dark" }
router.post("/", (req, res) => {
  const { theme } = req.body || {};
  if (!["light", "dark"].includes(theme)) {
    return res.status(400).json({ success: false, message: "Invalid theme value" });
  }

  // cookie(name, value, options) - response sends a Set-Cookie header
  res.cookie("theme", theme, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: false, // readable by React for this demo
  });

  res.status(200).json({ success: true, theme });
});

// GET /api/theme -> reads the cookie back
router.get("/", (req, res) => {
  res.status(200).json({ success: true, theme: req.cookies.theme || "light" });
});

module.exports = router;
