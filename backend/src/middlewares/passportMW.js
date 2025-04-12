// Node module Imports
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configuration Imports
const { constants } = require("../config/config");

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${constants.serverUrl}/api/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
);

passport.use(googleStrategy);

module.exports = passport;
