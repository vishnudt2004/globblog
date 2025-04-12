// Node module Imports
const readline = require("readline");

// Utility Functions
const { formatConsole } = require("./consoleUtils");

// internal module declarations
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cliActionHandler = (
  question = "CHOOSE AN OPTION.",
  options // e.g. [{name: "Print Hello wold!", function: () => console.log("Hello world!")}]
) => {
  options.forEach(({ name }, index) => {
    formatConsole(`${index + 1}.`, name, { separator: "", padCount: 1 });
  });

  rl.question(`\n${question}\n`, async (answer) => {
    const choice = parseInt(answer);

    if (choice > 0 && choice <= options.length) {
      options[choice - 1].function();
    } else {
      formatConsole(
        "MESSAGE",
        "INVALID INPUT, PLEASE ENTER VALID INPUT",
        {
          padCount: 5,
        },
        { value: { textColor: "red" } }
      );
    }
  });
};

module.exports = cliActionHandler;
