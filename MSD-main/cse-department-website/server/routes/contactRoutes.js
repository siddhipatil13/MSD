const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createContactMessage,
  getContactMessages,
} = require("../controllers/contactController");

router.post("/", createContactMessage); // public - anyone can write
router.get("/", protect, getContactMessages); // admin only - reads messages

module.exports = router;
