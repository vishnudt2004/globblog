// Core configurations.
const config = {
  ENABLE_DB_MODIFICATION: false, // Set to true to allow seedData.js script (backend/src/db/) to perform risky operations like wiping collections and seeding data.
  THEME_COLOR: "dodgerblue", // Applied to email_template.html (Match with --theme-color variable in frontend config.css: frontend/src/assets/styles/)
  AUTH_TOKEN_EXPIRE_TIME: "1d", // JWT_EXPIRESIN
  EMAIL_VERIFICATION_EXPIRE_TIME: "24hours", // email verification link expire time
  PASSWORD_RESET_EXPIRE_TIME: "30minutes", // password reset link expire time
  OTP_EXPIRE_TIME: "5minutes", // otp verification expire time
  OTP_LENGTH: 6, // otp length
  PUBLIC_ROUTES: [
    // { route: "/api/auth/login", methods: ["POST"] }, { route: "/api/auth/register", methods: ["POST"] },
    { route: "/api/blog", methods: ["GET"] },
    { route: "/api/blog/:id", methods: ["GET"] },
    { route: "/api/blog/read-count/:id", methods: ["PATCH"] }, // to allow read-count publicly
  ],
  BLOG: {
    READ_COUNT_EXPIRE_TIME: "1day", // read-count cookie
    TITLE_MINLENGTH: 20,
    TITLE_MAXLENGTH: 50,
    SUMMARY_MINLENGTH: 50,
    SUMMARY_MAXLENGTH: 500,
    COVERIMAGE_MAXSIZE: 2 * 1024 * 1024, // 2MB
    COVERIMAGE_TYPES: ["jpg", "jpeg", "png", "webp", "svg"],
    COVERIMAGE_LOCATION: "uploads/images/blog/cover",
    TAGS_MINCOUNT: 1,
    TAGS_MAXCOUNT: 3,
  },
  USER: {
    USERNAME_MINLENGTH: 3,
    PROFILENAME_MINLENGTH: 3,
    USERNAME_MAXLENGTH: 15,
    PROFILENAME_MAXLENGTH: 15,
    ABOUT_MAXLENGTH: 150,
    SOCIALMEDIAPROFILES_MAXCOUNT: 5,
    PROFILEIMAGE_MAXSIZE: 2 * 1024 * 1024, // 2MB
    PROFILEIMAGE_TYPES: ["jpg", "jpeg", "png", "webp", "svg"],
    PROFILEIMAGE_LOCATION: "uploads/images/user/profile",
  },
};

const constants = {
  clientUrl: process.env.CLIENT_URL || "http://127.0.0.1:5173",
  serverUrl: process.env.SERVER_URL || "http://127.0.0.1:8000",
};

module.exports = config;
module.exports.constants = constants;
