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

// Other Imports
const { runSeedAction } = require("./db/seed/seedActions");

uncaughtException();

connectDB();

const initialSeed = async () => {
  try {
    await runSeedAction(process.env.INITIAL_SEED_ACTION, false);
    formatConsole(
      "SEED ACTION",
      "Completed",
      {},
      { value: { textColor: "green" } }
    );
  } catch (err) {
    formatConsole("SEED ACTION", "Failed", {}, { value: { textColor: "red" } });
  }
};

const server = app.listen(process.env.PORT, () => {
  clearConsole();
  breakLine();
  formatConsole("SERVER RUNNING ON PORT", process.env.PORT);
  formatConsole("CURRENT NODE ENVIRONMENT", process.env.NODE_ENV);
  formatConsole("INITIAL SEED STATE", process.env.INITIAL_SEED);
  if (process.env.INITIAL_SEED === "true") {
    initialSeed().catch((err) => {
      console.error("Unhandled Seed Error:", err);
    });
  }
});

// const server = devHttpsServer(app); // Uncomment this line to use HTTPS in development mode

unhandledRejection(server);

module.exports = server;
