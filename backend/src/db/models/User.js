// Node module Imports
const { model } = require("mongoose");

// Schema Import
const userSchema = require("../schema/userSchema");

const User = model("User", userSchema);

module.exports = User;
