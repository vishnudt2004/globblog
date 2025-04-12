// Node module Imports
const fs = require("fs");
const path = require("path");
const https = require("https");

// Utility Functions
const { formatConsole, breakLine, clearConsole } = require("./consoleUtils");

// * Note: This file is used to create a local HTTPS server for development testing purposes. (e.g. Google OAuth)

const devHttpsServer = (app) =>
  https
    .createServer(
      {
        key: fs.readFileSync(path.join(__dirname, "../../certs/server.key")),
        cert: fs.readFileSync(path.join(__dirname, "../../certs/server.cert")),
      },
      app
    )
    .listen(process.env.PORT, () => {
      clearConsole();
      breakLine();
      formatConsole("SERVER RUNNING ON PORT", process.env.PORT);
      formatConsole("CURRENT NODE ENVIRONMENT", process.env.NODE_ENV);
    });

module.exports = devHttpsServer;
