const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { login, verify } = require("../controllers/authController");

router.post("/login", login);
router.get("/verify", protect, verify);

module.exports = router;
