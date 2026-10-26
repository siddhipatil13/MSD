// Authentication / Authorization middleware.
// Admin routes require a valid JWT token in the Authorization header.
// This protects the API on the SERVER side - hiding buttons in React is NOT enough.
const jwt = require("jsonwebtoken");

function protect(req, res, next) {
  const header = req.headers.authorization;

  // Header format: "Bearer <token>"
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized: no token provided",
    });
  }

  const token = header.split(" ")[1];

  try {
    // Verify the token using the same secret used while signing it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach admin info to the request object
    next(); // token is valid -> let the request continue
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized: token is invalid or expired",
    });
  }
}

module.exports = { protect };
