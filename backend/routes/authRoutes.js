// routes/api/userRoutes.js
const express = require("express");
const userController = require("../controllers/auth.controller");

const router = express.Router();

// Route to register a new user
// router.post("/register", userController.registerUser);

// Route to send OTP
router.post("/send-otp", userController.sendOtp);

// Route to verify OTP
router.post("/verify-otp", userController.verifyOtp);
module.exports = router;
