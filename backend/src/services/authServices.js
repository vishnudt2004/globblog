// Node module Imports
const path = require("path");

// Configuration Imports
const config = require("../config/config");

// Database Models
const User = require("../db/models/User");

// Utility Functions
const sendEmail = require("../utils/sendEmail");
const { setCookie, clearCookie } = require("../utils/cookieUtils");
const { loadTextFile } = require("../utils/fileUtils");
const { signToken } = require("../utils/jwtUtils");
const { durationToMs } = require("../utils/dateTimeUtils");
const { replacePlaceholders } = require("../utils/textUtils");

// internal module declarations
const htmlFilesPath = path.join(__dirname, "../../public/html");
const assetsPath = `${htmlFilesPath}/assets`;
const emailTemplatePath = `${htmlFilesPath}/email_template`;
const emailTemplateFile = `${emailTemplatePath}/index.html`;

const APPLICATION_NAME = "GLOB BLOG";
const {
  THEME_COLOR,
  EMAIL_VERIFICATION_EXPIRE_TIME,
  PASSWORD_RESET_EXPIRE_TIME,
} = config;

const messageReplacements = {
  "[APPLICATION_NAME]": APPLICATION_NAME,
  "[THEME_COLOR]": THEME_COLOR,
};
const htmlReplacements = {
  "[THEME_COLOR]": THEME_COLOR,
  "[YEAR]": new Date().getFullYear(),
  "[APPLICATION_NAME]": APPLICATION_NAME,
};

const attachments = [
  {
    filename: "newspaper.png",
    path: `${assetsPath}/icons/newspaper.png`,
    cid: "LOGO_IMAGE", // Same CID as in the email template
  },
];

const setAuthTokenCookie = async (res, userId) => {
  const token = await signToken({ userId });

  await setCookie(res, "authToken", token, {
    maxAge: durationToMs(config.AUTH_TOKEN_EXPIRE_TIME),
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};

const clearAuthTokenCookie = async (res) =>
  clearCookie(res, "authToken", {
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });

const setUserAsVerified = async (user, token) => {
  user.verification.verified = true;
  user.verification.expireAt = undefined;
  await user.save();
  await token.deleteOne();
};

const extendTokenTime = async (token, expireTime) => {
  token.expireAt = expireTime; // to extend token expire time.
  await token.save();
};

const extendUserAccTime = async (user, expireTime) => {
  user.verification = { expireAt: expireTime }; // to extend user account time.
  await user.save();
};

const resetUserPassword = async (user, hashedPassword, token) => {
  user.password = hashedPassword;
  await user.save();
  await token.deleteOne();
};

const formatGoogleProfile = async (googleUser) => {
  const email = googleUser.emails[0].value;
  const name = googleUser.displayName;
  const image = googleUser.photos[0].value;
  const googleId = googleUser.id;

  return {
    email,
    name,
    image,
    googleId,
  };
};

const generateUsernameForGoogleUser = async (email) => {
  let username = email.split("@")[0];
  let counter = 1;

  while (await User.findOne({ username })) {
    username = `${email.split("@")[0]}_${counter}`;
    counter++;
  }

  return username;
};

const sendEmailVerificationLink = async (email, profileName, link) => {
  const template = await loadTextFile(emailTemplateFile);
  const message = await loadTextFile(
    `${emailTemplatePath}/messages/email-verification.html`
  );

  const replacements = {
    "[USER_NAME]": profileName,
    "[VERIFICATION_LINK]": link,
    "[LINK_EXPIRE_TIME]": EMAIL_VERIFICATION_EXPIRE_TIME,
    ...messageReplacements,
  };

  const messageReplaced = await replacePlaceholders(message, replacements);

  const html = await replacePlaceholders(template, {
    "[MAIN]": messageReplaced,
    ...htmlReplacements,
  });

  const subject = "Email Verification";

  await sendEmail(undefined, {
    to: email,
    subject,
    html,
    attachments,
  });
};

const sendPWResetLink = async (email, profileName, link) => {
  const template = await loadTextFile(emailTemplateFile);
  const message = await loadTextFile(
    `${emailTemplatePath}/messages/password-reset.html`
  );

  const replacements = {
    "[USER_NAME]": profileName,
    "[PASSWORD_RESET_LINK]": link,
    "[LINK_EXPIRE_TIME]": PASSWORD_RESET_EXPIRE_TIME,
    ...messageReplacements,
  };

  const messageReplaced = await replacePlaceholders(message, replacements);

  const html = await replacePlaceholders(template, {
    "[MAIN]": messageReplaced,
    ...htmlReplacements,
  });

  const subject = "Password Reset";

  await sendEmail(undefined, {
    to: email,
    subject,
    html,
    attachments,
  });
};

module.exports = {
  setAuthTokenCookie,
  clearAuthTokenCookie,
  setUserAsVerified,
  extendTokenTime,
  extendUserAccTime,
  resetUserPassword,
  formatGoogleProfile,
  generateUsernameForGoogleUser,
  sendEmailVerificationLink,
  sendPWResetLink,
};
