// MongoDB connection using Mongoose.
// The connection string comes from the MONGODB_URI environment variable.
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Tip: start MongoDB locally or use a MongoDB Atlas URI.");
    process.exit(1);
  }
}

module.exports = connectDB;
