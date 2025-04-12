// Node module Imports
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Configuration Imports
const { constants } = require("./config/config");

// Middleware Functions
const authorization = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");
const passportMW = require("./middlewares/passportMW");

// Router Functions
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const securityRoutes = require("./routes/securityRoutes");
const userRoutes = require("./routes/userRoutes");

// Utility Functions
const CustomError = require("./utils/CustomError");

// internal module declarations
const app = express();

app.use(express.static(path.join(__dirname, "..")));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: constants.clientUrl,
    credentials: true,
  })
);
app.use(passportMW.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/blog", authorization, blogRoutes);
app.use("/api/security", authorization, securityRoutes);
app.use("/api/user", authorization, userRoutes);

app.all("*", (req, res, next) => {
  const error = new CustomError("Page not found / Unavailable.", 404);
  return next(error);
});

app.use(errorHandler);

module.exports = app;
