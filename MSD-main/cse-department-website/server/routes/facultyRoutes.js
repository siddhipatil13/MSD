const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const {
  getFaculty,
  getFacultyById,
  createFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");

// File upload configuration (optional faculty photo)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename(req, file, cb) {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, safeName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2 MB
  fileFilter(req, file, cb) {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

router.get("/", getFaculty);
router.get("/:id", getFacultyById);
router.post("/", protect, upload.single("photo"), createFaculty);
router.delete("/:id", protect, deleteFaculty);

module.exports = router;
