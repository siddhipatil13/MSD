// Announcement controller - workshops, seminars, competitions, notices.
const Announcement = require("../models/Announcement");
const { validators } = require("../middleware/validate");

// GET /api/announcements -> public
async function getAnnouncements(req, res, next) {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res
      .status(200)
      .json({ success: true, count: announcements.length, data: announcements });
  } catch (error) {
    next(error);
  }
}

// POST /api/announcements -> ADMIN only
async function createAnnouncement(req, res, next) {
  try {
    const { title, description, category, date, venue } = req.body;

    // Extra validation inside the controller (belt and braces)
    const errors = [
      validators.isRequired(title, "Title"),
      validators.isRequired(description, "Description"),
      validators.maxLength(title, 150, "Title"),
      validators.maxLength(description, 1000, "Description"),
      category
        ? validators.isIn(
            category,
            ["Workshop", "Seminar", "Competition", "Event", "Notice"],
            "Category"
          )
        : null,
    ].filter(Boolean);

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const announcement = await Announcement.create({
      title,
      description,
      category: category || "Notice",
      date: date || Date.now(),
      venue: venue || "",
    });

    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
}

// PUT /api/announcements/:id -> ADMIN only (edit)
async function updateAnnouncement(req, res, next) {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/announcements/:id -> ADMIN only
async function deleteAnnouncement(req, res, next) {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }
    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
