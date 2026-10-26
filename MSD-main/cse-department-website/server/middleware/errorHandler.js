// Central error handling middleware.
// Any error passed to next(error) in a route lands here.

function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error("SERVER ERROR:", err.message);

  // Mongoose validation errors -> 400 with readable messages
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, errors: messages });
  }

  // Bad MongoDB ObjectId -> 400 instead of a crash
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, errors: ["Invalid id format"] });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
}

module.exports = { notFound, errorHandler };
