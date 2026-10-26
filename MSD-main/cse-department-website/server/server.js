// ============================================================
// CSE Department Website - Express server (Node.js + Express)
// Run with:  npm run dev   (or)  npm start
// ============================================================
require("dotenv").config(); // loads .env into process.env

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Import route files (Node.js MODULE system - require())
const facultyRoutes = require("./routes/facultyRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const themeRoutes = require("./routes/themeRoutes");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // React dev servers
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json()); // parse JSON request bodies -> req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookies -> req.cookies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// Simple request logger so students can SEE the event loop handling requests
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route
});

// ---------- ROUTES ----------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CSE Department API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/faculty", facultyRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/theme", themeRoutes);

// ---------- ERROR HANDLING ----------
app.use(notFound); // 404 for unknown routes
app.use(errorHandler); // catch-all for thrown errors

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health\n`);
  });
});

// Note: app.listen callback + promise .then() are examples of ASYNC code.
// Node's EVENT LOOP keeps the process alive and runs callbacks when ready.
