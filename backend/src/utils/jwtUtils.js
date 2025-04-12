// Node module Imports
const { sign, verify } = require("jsonwebtoken");

// Configuration Imports
const config = require("../config/config");

const signToken = async (
  id,
  secret = process.env.JWT_SECRET,
  expiresIn = config.AUTH_TOKEN_EXPIRE_TIME
) => {
  const token = await sign(id, secret, { expiresIn });
  return token;
};

const verifyToken = async (cookieToken, secret = process.env.JWT_SECRET) => {
  const verification = await verify(cookieToken, secret);
  if (!verification) return false;
  return verification;
};

module.exports = { signToken, verifyToken };
