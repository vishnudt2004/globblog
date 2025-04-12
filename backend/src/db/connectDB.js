// Node module Imports
const { connect } = require("mongoose");

// Utility Functions
const { formatConsole, breakLine } = require("../utils/consoleUtils");

// internal module declarations
const formatConsoleConf = {
  key: "DATABASE CONNECTION",
  success: {
    message: "success",
    stringFormat: { value: { textColor: "green" } },
  },
  error: { message: "error", stringFormat: { value: { textColor: "red" } } },
};

const {
  key,
  success: { message: successMessage, stringFormat: successFormat },
  error: { message: errorMessage, stringFormat: errorFormat },
} = formatConsoleConf;

const connectDB = async (uri = process.env.DB_CONNECTION, options = {}) => {
  try {
    await connect(uri, options);

    formatConsole(key, successMessage, {}, successFormat);
  } catch (err) {
    formatConsole(key, errorMessage, {}, errorFormat);
    console.log(err);
  } finally {
    breakLine();
  }
};

module.exports = connectDB;
