// Project model - student projects shown on the Projects page.
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },
    technologies: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one technology is required",
      },
    },
    year: {
      type: String,
      required: true,
      enum: ["FE", "SE", "TE", "BE"],
    },
    studentName: { type: String, trim: true, default: "Sample Student" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
