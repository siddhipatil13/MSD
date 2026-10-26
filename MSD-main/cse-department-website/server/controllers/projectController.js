// Project controller - student projects.
const Project = require("../models/Project");
const { validators } = require("../middleware/validate");

// GET /api/projects?year=TE  -> public, optional year filter
async function getProjects(req, res, next) {
  try {
    const filter = {};
    if (req.query.year && ["FE", "SE", "TE", "BE"].includes(req.query.year)) {
      filter.year = req.query.year;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

// POST /api/projects -> ADMIN only
async function createProject(req, res, next) {
  try {
    const { title, description, technologies, year, studentName } = req.body;

    // technologies may arrive as an array or as a comma separated string
    const techArray = Array.isArray(technologies)
      ? technologies
      : String(technologies || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const errors = [
      validators.isRequired(title, "Title"),
      validators.isRequired(description, "Description"),
      validators.isRequired(year, "Academic year"),
      techArray.length === 0 ? "At least one technology is required" : null,
      year ? validators.isIn(year, ["FE", "SE", "TE", "BE"], "Academic year") : null,
    ].filter(Boolean);

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const project = await Project.create({
      title,
      description,
      technologies: techArray,
      year,
      studentName: studentName || "Sample Student",
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// PUT /api/projects/:id -> ADMIN only
async function updateProject(req, res, next) {
  try {
    const body = { ...req.body };
    if (typeof body.technologies === "string") {
      body.technologies = body.technologies.split(",").map((t) => t.trim()).filter(Boolean);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/projects/:id -> ADMIN only
async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProjects, createProject, updateProject, deleteProject };
