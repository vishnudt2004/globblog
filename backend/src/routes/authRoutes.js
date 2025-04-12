// Node module Imports
const express = require("express");

// Configuration Imports
const { constants } = require("../config/config");

// Middleware Functions
const passportMW = require("../middlewares/passportMW");

// Controller Functions
const {
  register,
  login,
  logout,
  emailVerification,
  passwordResetRequest,
  passwordReset,
  googleOAuth20,
} = require("../controllers/authController");

// internal module declarations
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/email-verification/:userId/:token").get(emailVerification);
router.route("/password-reset/request").post(passwordResetRequest);
router.route("/password-reset/:userId/:token").post(passwordReset);

router
  .route("/google")
  .get(passportMW.authenticate("google", { scope: ["profile", "email"] }));
router.route("/google/callback").get(
  passportMW.authenticate("google", {
    failureRedirect: `${constants.clientUrl}/login`,
    session: false,
  }),
  googleOAuth20
);

module.exports = router;
