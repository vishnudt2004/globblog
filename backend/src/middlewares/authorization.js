// Configuration Imports
const config = require("../config/config");

// Database Models
const User = require("../db/models/User");

// Utility Functions
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const { verifyToken } = require("../utils/jwtUtils");
const { getCookie, clearCookie } = require("../utils/cookieUtils");

const getAnonymousAccess = (req) => {
  const { PUBLIC_ROUTES: publicRoutes } = config;
  const urlPath = req.originalUrl;
  const method = req.method;

  return publicRoutes.some(({ route, methods }) => {
    const regex = new RegExp(
      `^${route
        .replace(/:[^/]+/g, "([^/]+)")
        .replace(/\//g, "\\/")}\\/?(?:\\?.*)?$`
    );

    return regex.test(urlPath) && methods.includes(method);
  });
};

const authorization = asyncHandler(async (req, res, next) => {
  const cookieToken = await getCookie(req, "authToken");

  const anonymousAccess = getAnonymousAccess(req);

  if (anonymousAccess) return next();

  if (!cookieToken) {
    const error = new CustomError(
      "Authorization failed. Please register or log in.",
      401
    );
    return next(error);
  }

  const verifiedToken = await verifyToken(cookieToken);

  if (!verifiedToken) {
    await clearCookie(res, "authToken");

    const error = new CustomError(
      "Authorization failed. Please register or log in.",
      401
    );
    return next(error);
  }

  const foundUser = await User.findById(verifiedToken.userId).select(
    "+verification"
  );

  if (!foundUser) {
    await clearCookie(res, "authToken");

    const error = new CustomError(
      "Authorization failed. User account does not exist.",
      403
    );
    return next(error);
  }

  const userVerificationStatus = foundUser?.verification?.verified;

  if (!userVerificationStatus) {
    const error = new CustomError(
      "Authorization failed. Email not verified. Please log in again.",
      403
    );
    return next(error);
  }

  req.userId = verifiedToken.userId;

  return next();
});

module.exports = authorization;
