// Announcement model - workshops, seminars, events, notices.
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      enum: ["Workshop", "Seminar", "Competition", "Event", "Notice"],
      default: "Notice",
    },
    date: { type: Date, default: Date.now },
    venue: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
