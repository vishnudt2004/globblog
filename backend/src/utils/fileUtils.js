// Node module Imports
const util = require("util");
const fs = require("fs");

// internal module declarations
const rfAsync = util.promisify(fs.readFile);
const loadTextFile = async (file) => await rfAsync(file, "utf8");

const deleteFile = (file) =>
  fs.unlink(file, (err) => err && console.log("File deletion error: ", err));

module.exports = { loadTextFile, deleteFile };
