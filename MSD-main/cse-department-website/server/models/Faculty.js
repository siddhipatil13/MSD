// Faculty model - stores faculty records in the "faculty" collection.
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    designation: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    expertise: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    // Optional profile photo uploaded through the admin panel
    photo: { type: String, default: "" },
    // Sample data flag - set true until official college data is verified
    isSample: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Faculty", facultySchema);
