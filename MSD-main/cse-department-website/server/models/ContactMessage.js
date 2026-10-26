// ContactMessage model - stores messages submitted from the Contact page.
const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
