// Node module Imports
const dotenv = require("dotenv");
const path = require("path");

// environment variable configuration
dotenv.config({ path: path.join(__dirname, "config/.env") });

// Core Imports
const app = require("./app");

// Database Connection
const connectDB = require("./db/connectDB");

// Utility Functions
const {
  formatConsole,
  breakLine,
  clearConsole,
} = require("./utils/consoleUtils");
const devHttpsServer = require("./utils/dev-https-server");
const {
  uncaughtException,
  unhandledRejection,
} = require("./utils/programError");

uncaughtException();

connectDB();

const server = app.listen(process.env.PORT, () => {
  clearConsole();
  breakLine();
  formatConsole("SERVER RUNNING ON PORT", process.env.PORT);
  formatConsole("CURRENT NODE ENVIRONMENT", process.env.NODE_ENV);
});

// const server = devHttpsServer(app); // Uncomment this line to use HTTPS in development mode

unhandledRejection(server);

module.exports = server;
