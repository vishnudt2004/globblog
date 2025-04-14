// Node module Imports
const path = require("path");
const fse = require("fs-extra");

// Configuration Imports
const config = require("../../config/config");

// Database Models
const User = require("../models/User");
const Blog = require("../models/Blog");

// Utility Functions
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

// Seed Everything (Wipe + Seed Users + Blogs)
const wipeAndSeedAll = async (exit = true) => {
  await wipeUserCollection(false);
  await wipeBlogCollection(false);
  await seedExampleUsers(false);
  await seedExampleBlogs(exit);
};

const runSeedAction = async (action, exit = true) => {
  switch (action) {
    case "WipeUsers":
      await wipeUserCollection(exit);
      break;
    case "WipeBlogs":
      await wipeBlogCollection(exit);
      break;
    case "SeedUsers":
      await seedExampleUsers(exit);
      break;
    case "SeedBlogs":
      await seedExampleBlogs(exit);
      break;
    case "WipeAndSeedAll":
      await wipeAndSeedAll(exit);
      break;
    default:
      console.warn("⚠️ Invalid Seed action. No action performed.");
  }
};

module.exports = {
  runSeedAction,
};
