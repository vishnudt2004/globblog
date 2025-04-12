// Node module Imports
const { Schema } = require("mongoose");

// internal module declarations
const schema = {
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    enum: ["password-reset", "email-verification", "otp-verification"],
    required: true,
  },
  expireAt: {
    type: Date,
    expires: 0,
  },
};

const tokenSchema = new Schema(schema, { versionKey: false });

module.exports = tokenSchema;
