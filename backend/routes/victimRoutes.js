const express = require("express");
const { signUp, signIn } = require("../controllers/victimController");

const router = express.Router();

// Sign-up route
//router.post("/signup", signUp);
router.post("/signup",signUp);

// Sign-in route
router.post("/signin", signIn);

module.exports = router;
