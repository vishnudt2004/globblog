// Configuration Imports
const config = require("../config/config");

// Database Models
const User = require("../db/models/User");
const Token = require("../db/models/Token");

// Database Functions
const { validatePassword } = require("../db/functions/validators");

// Utility Functions
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const {
  successResponse,
  redirectResponse,
} = require("../utils/formatResponse");
const { hashPW, comparePW } = require("../utils/bcryptUtils");
const { generateToken } = require("../utils/tokenUtils");
const { generateLink } = require("../utils/linkUtils");
const { generateExpireTime } = require("../utils/dateTimeUtils");

// Service Functions
const {
  setAuthTokenCookie,
  clearAuthTokenCookie,
  sendEmailVerificationLink,
  setUserAsVerified,
  sendPWResetLink,
  resetUserPassword,
  formatGoogleProfile,
  generateUsernameForGoogleUser,
  extendTokenTime,
  extendUserAccTime,
} = require("../services/authServices");

// internal module declarations
const { constants } = config;

const register = asyncHandler(async (req, res, next) => {
  const EMAIL_VERIFICATION_EXPIRE_TIME = await generateExpireTime(
    config.EMAIL_VERIFICATION_EXPIRE_TIME
  );

  const { username, email, password, name } = req.body;

  await clearAuthTokenCookie(res);

  const emailExists = await User.findOne({ email }).select("+googleId");

  if (emailExists) {
    if (emailExists.googleId) {
      const error = new CustomError(
        "Email already exists. Please log in with your Google account.",
        409
      );
      return next(error);
    } else {
      const error = new CustomError(
        "Email already exists. Please log in with your credentials.",
        409
      );
      return next(error);
    }
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    const error = new CustomError(
      "Username is already taken. Please choose another one.",
      409
    );
    return next(error);
  }

  if (!password) {
    const error = new CustomError(
      "Password is required. Please provide a password.",
      422
    );
    return next(error);
  }

  const validPassword = await validatePassword(password);

  if (!validPassword) {
    const error = new CustomError(
      "Password should contain a combination of at least 8 & maximum 15 characters, including lowercase letters, uppercase letters, numbers and special symbols",
      422
    );
    return next(error);
  }

  const hashedPassword = await hashPW(password);

  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
    profile: { name },
    verification: { expireAt: EMAIL_VERIFICATION_EXPIRE_TIME },
  });

  const createdToken = await Token.create({
    userId: createdUser._id,
    token: generateToken(),
    tokenType: "email-verification",
    expireAt: EMAIL_VERIFICATION_EXPIRE_TIME,
  });

  const generatedLink = generateLink(constants.clientUrl, [
    "email-verification",
    createdToken.userId,
    createdToken.token,
  ]);

  await sendEmailVerificationLink(email, name, generatedLink);

  await setAuthTokenCookie(res, createdUser._id);

  const response = {
    statusCode: 201,
    message: `Verification link is sent to ${createdUser.email}.`,
  };
  return successResponse(res, response.statusCode, response.message);
});

const login = asyncHandler(async (req, res, next) => {
  const EMAIL_VERIFICATION_EXPIRE_TIME = await generateExpireTime(
    config.EMAIL_VERIFICATION_EXPIRE_TIME
  );

  const { username_email, password } = req.body;

  await clearAuthTokenCookie(res);

  if (!username_email) {
    const error = new CustomError("Please enter your username / email.", 400);
    return next(error);
  }

  const foundUser = await User.findOne({
    $or: [{ username: username_email }, { email: username_email }],
  }).select("+password +verification +googleId");

  if (!foundUser) {
    const error = new CustomError("Username / Email is not found.", 404);
    return next(error);
  }

  if (foundUser.googleId) {
    const error = new CustomError(
      "Email ID is associated with a Google account. Please log in with your Google account.",
      403
    );
    return next(error);
  }

  if (!password) {
    const error = new CustomError("Please enter your password.", 400);
    return next(error);
  }

  const passwordMatched = await comparePW(password, foundUser.password);

  if (!passwordMatched) {
    const error = new CustomError("Incorrect password.", 401);
    return next(error);
  }

  if (!foundUser.verification.verified) {
    await extendUserAccTime(foundUser, EMAIL_VERIFICATION_EXPIRE_TIME);

    let token = await Token.findOne({
      userId: foundUser._id,
      tokenType: "email-verification",
    });

    if (token) {
      await extendTokenTime(token, EMAIL_VERIFICATION_EXPIRE_TIME);
    } else {
      token = await Token.create({
        userId: foundUser._id,
        token: generateToken(),
        tokenType: "email-verification",
        expireAt: EMAIL_VERIFICATION_EXPIRE_TIME,
      });
    }

    const generatedLink = generateLink(constants.clientUrl, [
      "email-verification",
      token.userId,
      token.token,
    ]);

    sendEmailVerificationLink(
      foundUser.email,
      foundUser.profile.name,
      generatedLink
    );

    const response = {
      statusCode: 201,
      message: `Your account is found but not verified. Verification link is sent to ${foundUser.email}.`,
    };
    return successResponse(res, response.statusCode, response.message);
  }

  await setAuthTokenCookie(res, foundUser._id);

  const response = { statusCode: 200, message: "Log in successful." };
  return successResponse(res, response.statusCode, response.message);
});

const logout = asyncHandler(async (req, res) => {
  await clearAuthTokenCookie(res);

  const response = { statusCode: 200, message: "Logout successful." };
  return successResponse(res, response.statusCode, response.message);
});

const emailVerification = asyncHandler(async (req, res, next) => {
  const { userId, token } = req.params;

  const foundUser = await User.findById(userId).select("+verification");

  const foundToken = await Token.findOne({
    userId,
    token,
  });

  if (!foundUser) {
    const error = new CustomError(
      "Verification link is invalid or expired. Please register or log in again to verify your email.",
      400
    );
    return next(error);
  }

  if (foundUser.verification.verified) {
    const error = new CustomError(
      "User account already verified. No need to verify more than once.",
      409
    );
    return next(error);
  }

  if (!foundToken) {
    const error = new CustomError(
      "Verification link is invalid or expired. Please register or log in again to verify your email.",
      400
    );
    return next(error);
  }

  await setUserAsVerified(foundUser, foundToken);

  await setAuthTokenCookie(res, foundUser._id);

  const response = {
    statusCode: 200,
    message: "Email verification successful. You are now authorized.",
  };
  return successResponse(res, response.statusCode, response.message);
});

const passwordResetRequest = asyncHandler(async (req, res, next) => {
  const PASSWORD_RESET_EXPIRE_TIME = await generateExpireTime(
    config.PASSWORD_RESET_EXPIRE_TIME
  );

  const { email } = req.body;

  if (!email) {
    const error = new CustomError("Please enter your email address.", 400);
    return next(error);
  }

  const foundUser = await User.findOne({ email }).select("+googleId");

  if (!foundUser) {
    const error = new CustomError(
      "User account with this email does not exist.",
      404
    );
    return next(error);
  }

  if (foundUser.googleId) {
    const error = new CustomError(
      "Google account users do not have a password. Please use Continue with Google to access your account.",
      400
    );
    return next(error);
  }

  let token = await Token.findOne({
    userId: foundUser._id,
    tokenType: "password-reset",
  });

  if (token) {
    await extendTokenTime(token, PASSWORD_RESET_EXPIRE_TIME);
  } else {
    token = await Token.create({
      userId: foundUser._id,
      token: generateToken(),
      tokenType: "password-reset",
      expireAt: PASSWORD_RESET_EXPIRE_TIME,
    });
  }

  const generatedLink = generateLink(constants.clientUrl, [
    "password-reset",
    token.userId,
    token.token,
  ]);

  await sendPWResetLink(foundUser.email, foundUser.profile.name, generatedLink);

  const response = {
    statusCode: 200,
    message: `The password reset link has been sent to the email address: ${foundUser.email}.`,
  };
  return successResponse(res, response.statusCode, response.message);
});

const passwordReset = asyncHandler(async (req, res, next) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  const foundUser = await User.findById(userId).select("+password");
  const foundToken = await Token.findOne({ userId, token });

  if (!foundUser || !foundToken) {
    const error = new CustomError(
      "Link is invalid or expired. Please request a new password reset.",
      400
    );
    return next(error);
  }

  if (!password) {
    const error = new CustomError(
      "Password cannot be empty. Please provide a new password.",
      400
    );
    return next(error);
  }

  const validPassword = await validatePassword(password);

  if (!validPassword) {
    const error = new CustomError(
      "Password should contain a combination of at least 8 & maximum 15 characters, including lowercase letters, uppercase letters, numbers and special symbols",
      422
    );
    return next(error);
  }

  const oldPassword = await comparePW(password, foundUser.password);

  if (oldPassword) {
    const error = new CustomError(
      "The new password should not be the same as the old password.",
      422
    );
    return next(error);
  }

  const hashedPassword = await hashPW(password);

  await resetUserPassword(foundUser, hashedPassword, foundToken);

  const response = { statusCode: 200, message: "Password reset successful." };
  return successResponse(res, response.statusCode, response.message);
});

const googleOAuth20 = asyncHandler(async (req, res, next) => {
  const googleUser = req.user;

  const { email, name, image, googleId } = await formatGoogleProfile(
    googleUser
  );

  const REDIRECT_URL = generateLink(constants.clientUrl, ["google"]);

  await clearAuthTokenCookie(res);

  let foundUser = await User.findOne({ email }).select("+googleId");

  if (foundUser) {
    if (!foundUser.googleId) {
      const response = {
        status: "error",
        message:
          "Account with this email already exists. Please use your credentials to log in.",
      };
      return redirectResponse(res, undefined, REDIRECT_URL, response);
    } else {
      await setAuthTokenCookie(res, foundUser._id);

      const response = {
        status: "success",
        message: "Log in with Google successful.",
      };
      return redirectResponse(res, undefined, REDIRECT_URL, response);
    }
  }

  const generatedUsername = await generateUsernameForGoogleUser(email);

  const createdUser = await User.create({
    username: generatedUsername,
    email,
    googleId,
    profile: { name, image },
    verification: { verified: true },
  });

  await setAuthTokenCookie(res, createdUser._id);

  const response = {
    status: "success",
    message: "Register with Google successful.",
  };
  return redirectResponse(res, undefined, REDIRECT_URL, response);
});

module.exports = {
  register,
  login,
  logout,
  emailVerification,
  passwordResetRequest,
  passwordReset,
  googleOAuth20,
};
