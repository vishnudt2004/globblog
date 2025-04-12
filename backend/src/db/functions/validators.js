// Configuration Imports
const config = require("../../config/config");

// internal module declarations
const {
  USERNAME_MINLENGTH,
  PROFILENAME_MINLENGTH,
  USERNAME_MAXLENGTH,
  PROFILENAME_MAXLENGTH,
  ABOUT_MAXLENGTH,
} = config.USER;

const { SUMMARY_MAXLENGTH, TAGS_MINCOUNT, TAGS_MAXCOUNT } = config.BLOG;

// User

const validateEmail = (email) =>
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(email);

const validatePassword = async (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
    password
  );

const validateUsername = (username) => {
  const lengthValid =
    username.length >= USERNAME_MINLENGTH &&
    username.length <= USERNAME_MAXLENGTH;
  const noWhitespace = !/\s/.test(username);
  const validChars = /^[a-zA-Z0-9-_]+$/.test(username);
  const startsAndEndsWithAlphanumeric = /^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(
    username
  );

  return (
    lengthValid && noWhitespace && validChars && startsAndEndsWithAlphanumeric
  );
};

const validateProfileName = (name) => {
  const trimmedName = name.trim();

  const lengthValid =
    trimmedName.length >= PROFILENAME_MINLENGTH &&
    trimmedName.length <= PROFILENAME_MAXLENGTH;
  const validChars = /^[a-zA-Z\s'-]+$/.test(trimmedName);
  const noConsecutiveSpaces = !/\s{2,}/.test(trimmedName);
  const startsWithLetter = /^[a-zA-Z]/.test(trimmedName);

  return lengthValid && validChars && noConsecutiveSpaces && startsWithLetter;
};

const validateSocialMediaProfiles = (url) =>
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
    url
  );

const validateAbout = (value) => {
  const normalizedValue = value.replace(/(\r\n|\n\r)/g, "\n");
  // Textarea field may contain \n and \r characters. When they appear together, treat as a single character.

  return normalizedValue.length <= ABOUT_MAXLENGTH;
};

// Blog

const validateBlogField = (value) => {
  const normalizedValue = value.replace(/(\r\n|\n\r)/g, "\n");
  // Textarea field may contain \n and \r characters. When they appear together, treat as a single character.

  return /\S/.test(value) && normalizedValue.length <= SUMMARY_MAXLENGTH;
};

const validateTags = (value) => {
  return (
    value && value.length >= TAGS_MINCOUNT && value.length <= TAGS_MAXCOUNT
  );
};

module.exports = {
  validatePassword,
  validateEmail,
  validateUsername,
  validateProfileName,
  validateSocialMediaProfiles,
  validateBlogField,
  validateAbout,
  validateTags,
};
