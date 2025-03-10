const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/adminController");

// Admin signup route
router.post("/signup", signup);

// Admin login route
router.post("/login", login);

module.exports = router;
