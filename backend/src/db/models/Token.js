// Node module Imports
const { model } = require("mongoose");

// Schema Import
const tokenSchema = require("../schema/tokenSchema");

const Token = model("Token", tokenSchema);

module.exports = Token;
