// Node module Imports
const path = require("path");

// Configuration Imports
const config = require("../config/config");

// Utility Functions
const sendEmail = require("../utils/sendEmail");
const { loadTextFile } = require("../utils/fileUtils");
const { replacePlaceholders } = require("../utils/textUtils");

// internal module declarations
const htmlFilesPath = path.join(__dirname, "../../public/html");
const assetsPath = `${htmlFilesPath}/assets`;
const emailTemplatePath = `${htmlFilesPath}/email_template`;
const emailTemplateFile = `${emailTemplatePath}/index.html`;

const APPLICATION_NAME = "GLOB BLOG";
const { THEME_COLOR, OTP_EXPIRE_TIME } = config;

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

const sendOTP = async (email, profileName, otp) => {
  const template = await loadTextFile(emailTemplateFile);
  const message = await loadTextFile(
    `${emailTemplatePath}/messages/otp-verification.html`
  );

  const replacements = {
    "[USER_NAME]": profileName,
    "[OTP]": otp,
    "[OTP_EXPIRE_TIME]": OTP_EXPIRE_TIME,
    ...messageReplacements,
  };

  const messageReplaced = await replacePlaceholders(message, replacements);

  const html = await replacePlaceholders(template, {
    "[MAIN]": messageReplaced,
    ...htmlReplacements,
  });

  const subject = "OTP Verification";

  await sendEmail(undefined, {
    to: email,
    subject,
    html,
    attachments,
  });
};

module.exports = {
  sendOTP,
};
