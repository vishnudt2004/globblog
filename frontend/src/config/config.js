// * Note: Additional UI configurations are defined in /src/styles/config.css

const config = {
  AUTH_REQ_EXCLUDED_PATHS: [
    "/email-verification/:userId/:token",
    "/password-reset/request",
    "password-reset/:userId/:token",
  ], // prevent from automatic-auth-req
  PROTECTED_ROUTES: [
    "blog/update/:blogId",
    "user/:userId",
    "user/update/:userId",
  ],
  BLOG: {
    READ_COUNT_EXPIRE_TIME: "1day", // read-count cookie (similar to backend)
    AUTOSAVE_INTERVAL: 120000, // 2 minutes
    COVERIMAGE_MAXSIZE: 2 * 1024 * 1024, // 2MB (in byte)
    COVERIMAGE_TYPES: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    COVERIMAGE_LOCATION: "uploads/images/blog/cover",
  },
  USER: {
    PROFILEIMAGE_MAXSIZE: 2 * 1024 * 1024, // 2MB
    PROFILEIMAGE_TYPES: [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ],
    PROFILEIMAGE_LOCATION: "uploads/images/user/profile",
  },
  UI_ELEMENTS: {
    NAVBAR: {
      SEARCH_BAR_VISIBILITY_PATHS: ["/", "/user/:id"],
    },
    USER_VERIFICATION: {
      OTP_EXPIRETIME: "1minute", // otp-resend-button unlock, countdown
      OTP_LENGTH: 6, // otp length
    },
    MESSAGE: {
      DURATION: 6000, // 6 seconds
      POSITION: "top-center",
    },
    MESSAGEMINI: {
      DURATION: 3000, // 3 seconds
      POSITION: "bottom-center",
    },
    BLOG: {
      // EditorForm, BlogCard
      EDITOR_FORM: {
        TITLE_MINLENGTH: 20,
        TITLE_MAXLENGTH: 50,
        SUMMARY_MINLENGTH: 50,
        SUMMARY_MAXLENGTH: 500,
      },
      BLOG_CARD: {
        TITLE_MAXLENGTH: 50,
        SUMMARY_MAXLENGTH: 250, // for Clipped Version
      },
      POSTS_CREATEDAT$UPDATEDAT_FORMATOPTIONS: {
        // Using toLocaleString method
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      },
      CATEGORIES: [
        { category: "Books", icon: "book" },
        { category: "Programming", icon: "code" },
        { category: "Photography", icon: "camera" },
        { category: "Art", icon: "paint-brush" },
        { category: "Music", icon: "music" },
        { category: "Movies", icon: "film" },
        { category: "Gaming", icon: "gamepad" },
        { category: "Travel", icon: "plane" },
        { category: "Nature", icon: "leaf" },
        { category: "Automotive", icon: "car" },
        { category: "Food", icon: "utensils" },
        { category: "Health", icon: "apple-alt" },
        { category: "Fitness", icon: "running" },
        { category: "Shopping", icon: "shopping-cart" },
        { category: "Home", icon: "home" },
        { category: "DIY", icon: "toolbox" },
        { category: "Crafts", icon: "brush" },
        { category: "News", icon: "newspaper" },
        { category: "Education", icon: "university" },
        { category: "Business", icon: "business-time" },
        { category: "Career", icon: "briefcase" },
        { category: "Relationships", icon: "hand-holding-heart" },
        { category: "Wellness", icon: "medkit" },
        { category: "Pets", icon: "dog" },
        { category: "Parenting", icon: "child" },
        { category: "Finance", icon: "money-bill-wave" },
        { category: "Technology", icon: "mobile-alt" },
        { category: "Outdoors", icon: "hiking" },
        { category: "Beauty", icon: "spa" },
        { category: "Podcasts", icon: "podcast" },
        { category: "Writing", icon: "pen-fancy" },
        { category: "Theater", icon: "theater-masks" },
        { category: "Blogging", icon: "comments" },
        { category: "Weather", icon: "cloud" },
        { category: "Law", icon: "gavel" },
        { category: "Science", icon: "flask" },
        { category: "Geography", icon: "globe" },
        { category: "Investing", icon: "chart-line" },
        { category: "Lifestyle", icon: "smile" },
        { category: "Social", icon: "users" },
        { category: "History", icon: "flag" },
        { category: "Gardening", icon: "tree" },
        { category: "Design", icon: "palette" },
        { category: "Real Estate", icon: "warehouse" },
        { category: "Fashion", icon: "glasses" },
        { category: "Medical", icon: "user-md" },
        { category: "Self-Care", icon: "heartbeat" },
        { category: "Space", icon: "rocket" },
        { category: "Learning", icon: "user-graduate" },
        { category: "Maritime", icon: "anchor" },
        { category: "Physics", icon: "atom" },
        { category: "Politics", icon: "balance-scale" },
        { category: "Environment", icon: "recycle" },
        { category: "Psychology", icon: "brain" },
        { category: "Spirituality", icon: "pray" },
        { category: "Language", icon: "language" },
        { category: "Comedy", icon: "laugh" },
        { category: "Adventure", icon: "compass" },
        { category: "Culture", icon: "landmark" },
        { category: "Mental Health", icon: "head-side-virus" },
        { category: "Entrepreneurship", icon: "lightbulb" },
        { category: "Hobbies", icon: "puzzle-piece" },
        { category: "Cryptocurrency", icon: "dollar-sign" },
        { category: "Artificial Intelligence", icon: "robot" },
        { category: "Cooking", icon: "concierge-bell" },
        { category: "Economics", icon: "chart-pie" },
        { category: "Astronomy", icon: "star" },
        { category: "Solar System", icon: "sun" },
        { category: "Productivity", icon: "check-circle" },
        { category: "Time Management", icon: "clock" },
        { category: "Organization", icon: "tasks" },
        { category: "Web Development", icon: "globe" },
        { category: "Computer Science", icon: "computer" },
      ],
    },
    USER: {
      USERNAME_MINLENGTH: 3,
      PROFILENAME_MINLENGTH: 3,
      USERNAME_MAXLENGTH: 15,
      PROFILENAME_MAXLENGTH: 15,
      ABOUT_MAXLENGTH: 150,
      SOCIALMEDIAPROFILES_MAXCOUNT: 5,
      USERCARD: { NAME_MAXLENGTH: 15 },
      USERCARDMINI: { NAME_MAXLENGTH: 15 },
      ACCS_CREATEDAT$UPDATEDAT_FORMATOPTIONS: {
        // Using toLocaleString method
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        hour12: true,
      },
    },
    PREDEFINED_PLATFORMS: [
      // SocialMediaButton, SocialMediaProfilesInput
      { platform: "Facebook", color: "#1877f2" },
      { platform: "X", color: "#1da1f2", icon: "twitter" },
      { platform: "Twitter", color: "#1da1f2" },
      { platform: "LinkedIn", color: "#0077b5" },
      { platform: "Instagram", color: "#e4405f" },
      { platform: "YouTube", color: "#ff0000" },
      { platform: "WhatsApp", color: "#25d366" },
      { platform: "Telegram", color: "#0088cc" },
      { platform: "GitHub", color: "#595959" },
    ],
  },
};

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || "http://127.0.0.1:5173";
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://127.0.0.1:8000";
const {
  BLOG: { COVERIMAGE_LOCATION },
  USER: { PROFILEIMAGE_LOCATION },
} = config;

const constants = {
  clientUrl: CLIENT_URL,
  serverUrl: SERVER_URL,
  blogCoverImageBaseUrl: `${SERVER_URL}/${COVERIMAGE_LOCATION}`,
  userProfileImageBaseUrl: `${SERVER_URL}/${PROFILEIMAGE_LOCATION}`,
};

export default config;
export { constants };
