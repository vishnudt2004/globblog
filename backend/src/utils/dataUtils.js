// Utility Functions
const { formatConsole } = require("./consoleUtils");

const collectionWiper = async (model, exit = false) => {
  try {
    await model.deleteMany();

    const data = await model.find();

    if (data.length !== 0)
      formatConsole(
        `COLLECTION REMOVED (${model.collection.collectionName})`,
        "error",
        {},
        { value: { textColor: "red" } }
      );
    else {
      formatConsole(
        `COLLECTION REMOVED (${model.collection.collectionName})`,
        "success",
        {},
        { value: { textColor: "green" } }
      );
    }

    exit && process.exit();
  } catch (err) {
    formatConsole(
      `COLLECTION REMOVED (${model.collection.collectionName})`,
      "error",
      {},
      { value: { textColor: "red" } }
    );
    formatConsole(err.name, err.message);
    process.exit();
  }
};

const dataSeeder = async (model, data, exit = true) => {
  try {
    await model.insertMany(data);
    const dataSeeded = await model.find();

    if (dataSeeded) {
      formatConsole(
        `COLLECTION ADDED (${model.collection.collectionName})`,
        "success",
        {},
        { value: { textColor: "green" } }
      );
    } else {
      formatConsole(
        `COLLECTION ADDED (${model.collection.collectionName})`,
        "error",
        {},
        { value: { textColor: "red" } }
      );
    }
    exit && process.exit();
  } catch (err) {
    formatConsole(
      `COLLECTION ADDED (${model.collection.collectionName})`,
      "error",
      {},
      { value: { textColor: "red" } }
    );
    formatConsole(err.name, err.message);
    process.exit();
  }
};

module.exports = { collectionWiper, dataSeeder };
