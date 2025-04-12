// Configuration Imports
const config = require("../config/config");

// Database Models
const User = require("../db/models/User");
const Token = require("../db/models/Token");

// Utility Functions
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const { successResponse, errorResponse } = require("../utils/formatResponse");
const { comparePW } = require("../utils/bcryptUtils");
const { generateExpireTime } = require("../utils/dateTimeUtils");
const { generateDigits } = require("../utils/tokenUtils");

// Service Functions
const { sendOTP } = require("../services/securityServices");

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(authorizedUserId).select("+googleId");

  if (!foundUser) {
    const error = new CustomError("User account not found.", 404);
    return next(error);
  }

  const response = {
    statusCode: 200,
    message: "Current user retrieval successful.",
    result: { currentUser: foundUser },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const validatePassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(authorizedUserId).select(
    "+googleId +password"
  );

  if (!password) {
    const error = new CustomError("Please enter your password.", 404);
    return next(error);
  }

  if (!foundUser) {
    const error = new CustomError("User account not found.", 404);
    return next(error);
  }

  if (foundUser.googleId) {
    const error = new CustomError(
      "Password validation is not applicable for Google OAuth users. Please choose OTP verification.",
      400
    );
    return next(error);
  }

  const passwordMatched = await comparePW(password, foundUser?.password);

  if (!passwordMatched) {
    const response = {
      statusCode: 401,
      message: "Incorrect password. Please try again.",
      details: { verified: false },
    };
    return errorResponse(
      res,
      response.statusCode,
      response.message,
      response.details
    );
  }

  const response = {
    statusCode: 200,
    message: "Password validated successfully.",
    result: { verified: true },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const getOTP = asyncHandler(async (req, res, next) => {
  const OTP_EXPIRE_TIME = await generateExpireTime(config.OTP_EXPIRE_TIME);
  const OTP_LENGTH = config.OTP_LENGTH;

  const authorizedUserId = req.userId;

  const foundUser = await User.findById(authorizedUserId);

  if (!foundUser) {
    const error = new CustomError("User account not found.", 404);
    return next(error);
  }

  const foundOTP = await Token.findOne({
    userId: authorizedUserId,
    tokenType: "otp-verification",
  });

  if (foundOTP) await foundOTP.deleteOne();

  const createdOTP = await Token.create({
    userId: foundUser._id,
    token: generateDigits(OTP_LENGTH),
    tokenType: "otp-verification",
    expireAt: OTP_EXPIRE_TIME,
  });

  const generatedOTP = createdOTP.token;

  await sendOTP(foundUser.email, foundUser.profile.name, generatedOTP);

  const response = {
    statusCode: 201,
    message: `OTP has been sent to ${foundUser.email}.`,
  };
  return successResponse(res, response.statusCode, response.message);
});

const verifyOTP = asyncHandler(async (req, res, next) => {
  const OTP = req.body.otp;
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(authorizedUserId);

  const foundToken = await Token.findOne({
    userId: authorizedUserId,
    token: OTP,
  });

  if (!OTP) {
    const error = new CustomError("Please enter your OTP.", 404);
    return next(error);
  }

  if (!foundUser) {
    const error = new CustomError("User account not found.", 404);
    return next(error);
  }

  if (!foundToken) {
    const response = {
      statusCode: 401,
      message: "OTP verification failed. Please try again.",
      details: { verified: false },
    };
    return errorResponse(
      res,
      response.statusCode,
      response.message,
      response.details
    );
  }

  const response = {
    statusCode: 200,
    message: "OTP verified successfully.",
    result: { verified: true },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

module.exports = {
  getCurrentUser,
  validatePassword,
  getOTP,
  verifyOTP,
};
