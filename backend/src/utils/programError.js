// Utility Functions
const { formatConsole } = require("./consoleUtils");

uncaughtException = () =>
  process.on("uncaughtException", (err) => {
    formatConsole(
      "UNCAUGHT EXCEPTION OCCURED",
      "SHUTTING DOWN...",
      {},
      { value: { textColor: "red" } }
    );
    formatConsole(err.name, err.message);
    console.log("ERROR: ", err);

    process.exit(1);
  });

unhandledRejection = (server) =>
  process.on("unhandledRejection", (err) => {
    formatConsole(
      "UNHANDLED REJECTION OCCURED",
      "SHUTTING DOWN...",
      {},
      { value: { textColor: "red" } }
    );
    formatConsole(err.name, err.message);
    console.log("ERROR: ", err);

    server
      ? server.close(() => {
          process.exit(1);
        })
      : process.exit(1);
  });

module.exports = { uncaughtException, unhandledRejection };
