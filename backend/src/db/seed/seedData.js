// Node module Imports
const dotenv = require("dotenv");
const path = require("path");
const fse = require("fs-extra");

// Configuration Imports
const config = require("../../config/config");

// Database Connection
const connectDB = require("../connectDB");

// Database Models
const User = require("../models/User");
const Blog = require("../models/Blog");

// Utility Functions
const { formatConsole, breakLine } = require("../../utils/consoleUtils");
const cliActionHandler = require("../../utils/cliActionHandler");
const { dataSeeder, collectionWiper } = require("../../utils/dataUtils");

// Service Functions
const {
  hashPasswords,
  setBlogsAsOrphans,
} = require("../../services/userServices.js");
const {
  removeBlogsFromAuthors,
  addBlogsToAuthors,
  increasePostsCountInAuthors,
  decreasePostsCountInAuthors,
} = require("../../services/blogServices.js");

// Example JSON Data
const exampleUsers = require("./example-data/exampleUsers.json");
const exampleBlogs = require("./example-data/exampleBlogs.json");

// Example Images
const EXAMPLE_IMAGE_PATHS = {
  source: {
    users: path.join(__dirname, "./example-data/example_user-profile_images"),
    blogs: path.join(__dirname, "./example-data/example_blog-cover_images"),
  },
  destination: {
    users: path.join(
      __dirname,
      `../../../${config.USER.PROFILEIMAGE_LOCATION}`
    ),
    blogs: path.join(__dirname, `../../../${config.BLOG.COVERIMAGE_LOCATION}`),
  },
};

if (!config.ENABLE_DB_MODIFICATION) {
  breakLine();
  formatConsole(
    "Message",
    "Operation has been stopped to prevent data loss.",
    { prefix: "❌ ", padCount: 15 },
    { key: { textColor: "white" }, value: { textColor: "red" } }
  );
  formatConsole(
    "To proceed",
    "set ENABLE_DB_MODIFICATION to true in config.js (backend/src/config/).",
    { prefix: "👉 ", padCount: 15 },
    { key: { textColor: "white" }, value: { textColor: "blue" } }
  );

  return process.exit(1);
}

// Copy Images to Uploads Folder
const copyImages = async (src, dest) => {
  try {
    await fse.ensureDir(dest);
    await fse.copy(src, dest, { overwrite: true });
  } catch (error) {
    console.error(`Error copying images from ${src} to ${dest}:`, error);
  }
};

// Delete Images from Uploads Folder
const deleteImages = async (dest) => {
  try {
    await fse.emptyDir(dest);
  } catch (error) {
    console.error(`Error deleting images from ${dest}:`, error);
  }
};

// Wipe User Collection + Images
const wipeUserCollection = async (exit = true) => {
  const users = await User.find();
  await setBlogsAsOrphans(users);
  await collectionWiper(User, false);
  await deleteImages(EXAMPLE_IMAGE_PATHS.destination.users);
  if (exit) process.exit();
};

// Wipe Blog Collection + Images
const wipeBlogCollection = async (exit = true) => {
  const blogs = await Blog.find();
  await removeBlogsFromAuthors(blogs);
  await decreasePostsCountInAuthors(blogs);
  await collectionWiper(Blog, false);
  await deleteImages(EXAMPLE_IMAGE_PATHS.destination.blogs);
  if (exit) process.exit();
};

// Seed Example Users + Copy Profile Images
const seedExampleUsers = async (exit = true) => {
  const exampleUsers_ = [...exampleUsers];
  const users = await hashPasswords(exampleUsers_);
  await dataSeeder(User, users, false);
  await copyImages(
    EXAMPLE_IMAGE_PATHS.source.users,
    EXAMPLE_IMAGE_PATHS.destination.users
  );
  if (exit) process.exit();
};

// Seed Example Blogs + Copy Cover Images
const seedExampleBlogs = async (exit = true) => {
  const exampleBlogs_ = [...exampleBlogs];
  await addBlogsToAuthors(exampleBlogs_);
  await increasePostsCountInAuthors(exampleBlogs_);
  await dataSeeder(Blog, exampleBlogs_, false);
  await copyImages(
    EXAMPLE_IMAGE_PATHS.source.blogs,
    EXAMPLE_IMAGE_PATHS.destination.blogs
  );
  if (exit) process.exit();
};

// CLI Options
const options = [
  {
    name: "WIPE (USER) COLLECTION",
    function: wipeUserCollection,
  },
  {
    name: "WIPE (BLOG) COLLECTION",
    function: wipeBlogCollection,
  },
  {
    name: "SEED EXAMPLE (USERS) DATA",
    function: seedExampleUsers,
  },
  {
    name: "SEED EXAMPLE (BLOGS) DATA",
    function: seedExampleBlogs,
  },
  {
    name: "WIPE & SEED (USER & BLOG) COLLECTIONS",
    function: async () => {
      await wipeUserCollection(false);
      await wipeBlogCollection(false);
      await seedExampleUsers(false);
      seedExampleBlogs();
    },
  },
];

// Load Environment Variables (DB connection)
dotenv.config({ path: path.join(__dirname, "../../config/.env") });

(async () => {
  await connectDB();
  cliActionHandler(undefined, options);
})();
