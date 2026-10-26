const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

router.get("/", getAnnouncements);
router.post("/", protect, createAnnouncement);
router.put("/:id", protect, updateAnnouncement);
router.delete("/:id", protect, deleteAnnouncement);

module.exports = router;
