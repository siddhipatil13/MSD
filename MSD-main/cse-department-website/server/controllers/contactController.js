// Contact controller - stores messages from the Contact page.
const ContactMessage = require("../models/ContactMessage");
const { validators } = require("../middleware/validate");

// POST /api/contact -> public
async function createContactMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;

    const errors = [
      validators.isRequired(name, "Name"),
      validators.isEmail(email, "Email"),
      validators.isRequired(message, "Message"),
      validators.maxLength(message, 2000, "Message"),
    ].filter(Boolean);

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const saved = await ContactMessage.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received.",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/contact -> ADMIN only (reads all submitted messages)
async function getContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
}

module.exports = { createContactMessage, getContactMessages };
