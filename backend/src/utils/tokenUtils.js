// Node module Imports
const cryptoRandomString = require("crypto-random-string"); // ESM

const generateToken = (options = { length: 16 }) => cryptoRandomString(options);

const generateDigits = (length) => {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports = { generateToken, generateDigits };
