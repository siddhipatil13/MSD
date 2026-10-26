// Faculty controller - handles all request/response logic for faculty.
const Faculty = require("../models/Faculty");

// GET /api/faculty  -> returns all faculty records
async function getFaculty(req, res, next) {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: faculty.length, data: faculty });
  } catch (error) {
    next(error);
  }
}

// GET /api/faculty/:id -> returns one faculty record
async function getFacultyById(req, res, next) {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
}

// POST /api/faculty -> add a new faculty member (ADMIN only)
async function createFaculty(req, res, next) {
  try {
    const { name, designation, qualification, expertise, email } = req.body;

    const faculty = await Faculty.create({
      name,
      designation,
      qualification,
      expertise,
      email,
      photo: req.file ? `/uploads/${req.file.filename}` : "",
      isSample: false,
    });

    res.status(201).json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/faculty/:id -> remove a faculty member (ADMIN only)
async function deleteFaculty(req, res, next) {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    res.status(200).json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getFaculty, getFacultyById, createFaculty, deleteFaculty };
