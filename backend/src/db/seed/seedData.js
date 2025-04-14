// Node module Imports
const path = require("path");
const dotenv = require("dotenv");

// Configuration Imports
const config = require("../../config/config");

// Database Connection
const connectDB = require("../connectDB");

// Utility Functions
const { formatConsole, breakLine } = require("../../utils/consoleUtils");
const cliActionHandler = require("../../utils/cliActionHandler");

// Main imports
const { runSeedAction } = require("./seedActions");

if (!config.ENABLE_DB_MODIFICATION) {
  breakLine();
  formatConsole(
    "Message",
    "Operation has been stopped to prevent data loss.",
    { prefix: "❌ ", padCount: 15 },
    { key: { textColor: "white" }, value: { textColor: "red" } }
  );
  formatConsole(
    "To proceed",
    "set ENABLE_DB_MODIFICATION to true in config.js (backend/src/config/).",
    { prefix: "👉 ", padCount: 15 },
    { key: { textColor: "white" }, value: { textColor: "blue" } }
  );

  return process.exit(1);
}

// CLI Options
const options = [
  {
    name: "WIPE (USER) COLLECTION",
    function: () => runSeedAction("WipeUsers"),
  },
  {
    name: "WIPE (BLOG) COLLECTION",
    function: () => runSeedAction("WipeBlogs"),
  },
  {
    name: "SEED EXAMPLE (USERS) DATA",
    function: () => runSeedAction("SeedUsers"),
  },
  {
    name: "SEED EXAMPLE (BLOGS) DATA",
    function: () => runSeedAction("WipeBlogs"),
  },
  {
    name: "WIPE & SEED (USER & BLOG) COLLECTIONS",
    function: () => runSeedAction("WipeAndSeedAll"),
  },
];

// Load Environment Variables (DB connection)
dotenv.config({ path: path.join(__dirname, "../../config/.env") });

(async () => {
  await connectDB();
  cliActionHandler(undefined, options);
})();
