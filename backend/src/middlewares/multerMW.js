// Node module Imports
const fs = require("fs");

// Configuration Imports
const config = require("../config/config");

// Utility Functions
const fileUpload = require("../utils/fileUpload");

const imageUpload = (type) => {
  const {
    BLOG: { COVERIMAGE_MAXSIZE, COVERIMAGE_TYPES },
    USER: { PROFILEIMAGE_MAXSIZE, PROFILEIMAGE_TYPES },
  } = config;

  const destination = `uploads/images/${type}`;
  const maxSize =
    type === "user/profile"
      ? PROFILEIMAGE_MAXSIZE
      : type === "blog/cover" && COVERIMAGE_MAXSIZE;
  const fileTypes =
    type === "user/profile"
      ? PROFILEIMAGE_TYPES
      : type === "blog/cover" && COVERIMAGE_TYPES;

  return fileUpload(
    { destination, fileNameLength: 15 },
    { maxSize, fileTypes }
  ).single("image");
};

const deleteFileOnError = (err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) console.error("Error deleting file:", unlinkErr);
    });
  }
  next(err);
};

module.exports = imageUpload;
module.exports.deleteFileOnError = deleteFileOnError;
