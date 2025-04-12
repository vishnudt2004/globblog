// Node module Imports
const express = require("express");

// Controller Functions
const {
  getCurrentUser,
  validatePassword,
  getOTP,
  verifyOTP,
} = require("../controllers/securityController");

// internal module declarations
const router = express.Router();

router.route("/current-user").get(getCurrentUser);
router.route("/validate-password").post(validatePassword);
router.route("/get-otp").get(getOTP);
router.route("/verify-otp").post(verifyOTP);

module.exports = router;
