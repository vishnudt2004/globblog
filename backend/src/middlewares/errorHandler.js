// Node module Imports
const {
  Error: { ValidationError, CastError },
} = require("mongoose");

// Utility Functions
const { errorResponse, customResponse } = require("../utils/formatResponse");

const developmentError = (err, res) => {
  const response = {
    statusCode: err.statusCode,
    responseObject: {
      status: "error",
      message: err.message,
      stackTrace: err.stack,
      error: err,
    },
  };
  return customResponse(res, response.statusCode, response.responseObject);
};

const productionError = (err, res) => {
  // 1. duplicate key errors
  // 2. validation errors
  // 3. cast errors

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];

    const response = {
      statusCode: 409,
      message: `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists.`,
    };
    return errorResponse(res, response.statusCode, response.message);
  } else if (err instanceof ValidationError || err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((value) => value.message);

    const response = {
      statusCode: 422,
      message: messages.join(", "),
    };
    return errorResponse(res, response.statusCode, response.message);
  } else if (err instanceof CastError || err.name === "CastError") {
    const response = {
      statusCode: 400,
      message: `Invalid format: ${err.path}`,
    };
    return errorResponse(res, response.statusCode, response.message);
  }

  if (err.operationalError) {
    const response = {
      statusCode: err.statusCode,
      message: err.message,
    };
    return errorResponse(res, response.statusCode, response.message);
  } else {
    const response = {
      statusCode: 500,
      message:
        "Internal Server Error: An unexpected error occurred. Please try again later or contact support.",
    };
    return errorResponse(res, response.statusCode, response.message);
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    return developmentError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    return productionError(err, res);
  } else {
    const response = {
      statusCode: 500,
      responseObject: {
        status: "error",
        message:
          "NODE_ENV environment variable either should be 'development' or 'production'. error occured in environment variable.",
        actualError: err,
      },
    };
    return customResponse(res, response.statusCode, response.responseObject);
  }
};

module.exports = errorHandler;
