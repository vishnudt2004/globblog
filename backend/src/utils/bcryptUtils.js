// Node module Imports
const { hash, compare } = require("bcrypt");

const hashPW = async (password, saltRounds = 10) => {
  if (!password) return null;

  const hashedPW = await hash(password, saltRounds);
  return hashedPW;
};

const comparePW = async (password, dbPassword) => {
  const comparedPW = await compare(password, dbPassword);
  return comparedPW;
};

module.exports = { hashPW, comparePW };
