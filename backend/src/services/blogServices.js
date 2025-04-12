// Node module Imports
const path = require("path");

// Configuration Imports
const config = require("../config/config");

// Database Models
const User = require("../db/models/User");
const Blog = require("../db/models/Blog");

// Database Functions
const userImmutableFields = require("../db/functions/userImmutableFields");

// Utility Functions
const { setCookie } = require("../utils/cookieUtils");
const { durationToMs, getCurrentWeek } = require("../utils/dateTimeUtils");
const { deleteFile } = require("../utils/fileUtils");

const addBlogToAuthor = async (blog) =>
  await User.findByIdAndUpdate(blog.author, { $push: { blogs: blog._id } });

const removeBlogFromAuthor = async (blog) => {
  await User.findByIdAndUpdate(blog.author, { $pull: { blogs: blog._id } });
};

const increasePostsCountInAuthor = async (userId, inc = 1) =>
  await User.findByIdAndUpdate(userId, { $inc: { "profile.postsCount": inc } });

const decreasePostsCountInAuthor = async (userId, dec = 1) =>
  await User.findByIdAndUpdate(userId, {
    $inc: { "profile.postsCount": -dec },
  });

const increaseReadsCount = async (blog, inc = 1) => {
  // checks for true or "true".

  await Blog.findByIdAndUpdate(blog._id, {
    $inc: { readsCount: inc },
  });

  if (!blog.orphan) {
    await User.findByIdAndUpdate(blog.author, {
      $inc: { "profile.readsCount": inc },
    });
  }
};

const addBlogsToAuthors = async (blogs) => {
  for (const blog of blogs) {
    await addBlogToAuthor(blog);
  }
};

const removeBlogsFromAuthors = async (blogs) => {
  for (const blog of blogs) {
    await removeBlogFromAuthor(blog);
  }
};

const increasePostsCountInAuthors = async (blogs) => {
  for (const blog of blogs) {
    await increasePostsCountInAuthor(blog.author);
  }
};

const decreasePostsCountInAuthors = async (blogs) => {
  for (const blog of blogs) {
    await decreasePostsCountInAuthor(blog.author);
  }
};

const unnecessaryFieldsPrevention = (fields) => {
  const { _id, author, orphan } = fields;

  return userImmutableFields([
    { field: _id, name: "_id" },
    { field: author, name: "author" },
    { field: orphan, name: "orphan" },
  ]);
};

const updateImageField = async (req, foundBlog) => {
  const { COVERIMAGE_LOCATION } = config.BLOG;

  const bodyField = req.body?.image;
  const fileField = req?.file?.filename;
  const existDocField = foundBlog?.image;

  const existFile =
    existDocField && path.join(COVERIMAGE_LOCATION, existDocField);

  if (bodyField && path.basename(bodyField) === existDocField) {
    return {};
  } else if (!!fileField) {
    // delete old image & update image field with new one.
    existFile && deleteFile(existFile);
    return { image: fileField };
  } else if (!bodyField && !fileField && existFile) {
    // delete image & remove image field.
    deleteFile(existFile);
    return { $unset: { image: "" } };
  }
};

const deleteImageFromStorage = async (foundBlog) => {
  const { COVERIMAGE_LOCATION } = config.BLOG;

  const existDocField = foundBlog?.image;

  const existFile =
    existDocField && path.join(COVERIMAGE_LOCATION, existDocField);

  if (existDocField) return deleteFile(existFile);
  else return;
};

const processLatestBlogs = async (blog, queries) => {
  const { page = 1, limit = 5 } = queries;

  const totalResults = await blog.countDocuments(); // Calculate total number of results

  const blogs = await blog
    .find()
    .select("-content +orphan") // deselect content field
    .populate("author", "-blogs")
    .sort({ createdAt: -1, _id: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return {
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    blogs,
  };
};

const processTrendingBlogs = async (blog, queries) => {
  const { page = 1, limit = 5, dateRange = getCurrentWeek() } = queries;

  const [startDate, endDate] = dateRange.split("_");

  const dateFilter = {
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  };

  // Calculate total number of results
  const totalResults = await blog.countDocuments(dateFilter);

  // LOGIC 1 - date range + reads count
  const blogs = await blog
    .find(dateFilter)
    .select("-content +orphan") // deselect content field
    .populate("author", "-blogs")
    .sort({ readsCount: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // LOGIC 2 - Trending Score [Optional]
  // const trendingBlogs = blogs
  //   .map((blog) => ({
  //     ...blog._doc, // Keep original data
  //     score:
  //       blog.readsCount * 0.7 + (Date.now() - new Date(blog.createdAt)) * -0.3,
  //   }))
  //   .sort((a, b) => b.score - a.score) // Sort by trending score
  //   .slice((page - 1) * limit, page * limit); // Paginate after sorting

  return {
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    blogs,
  };
};

const processSearchedBlogs = async (
  blog,
  searchFields = '["title", "summary", "tags"]',
  queries
) => {
  const {
    sortBy, // Comparable Fields - readsCount | createdAt
    order = "asc", // asc | desc
    search = "",
    page = 1,
    limit = 5,
  } = queries;

  const createSearchCondition = (query, fields) => {
    if (!query.trim()) return {};
    return {
      $or: JSON.parse(fields).map((field) => ({
        [field]: { $regex: query, $options: "i" }, // Case-insensitive search
      })),
    };
  };

  const searchCondition = createSearchCondition(search, searchFields);
  const sortCondition = sortBy
    ? { [sortBy]: order === "asc" ? 1 : order === "desc" && -1 }
    : {};

  if (!search.trim().length) return;

  // Calculate total number of results
  const totalResults = await blog.countDocuments(searchCondition);

  const blogs = await blog
    .find(searchCondition)
    .select("-content +orphan") // deselect content field
    .populate("author", "-blogs")
    .sort(sortCondition)
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    totalResults,
    totalPages: Math.ceil(totalResults / limit),
    blogs,
  };
};

const setReadCountCookie = async (res, key) => {
  const { READ_COUNT_EXPIRE_TIME } = config.BLOG;

  setCookie(res, key, true, {
    maxAge: durationToMs(READ_COUNT_EXPIRE_TIME),
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};

module.exports = {
  addBlogToAuthor,
  removeBlogFromAuthor,
  increasePostsCountInAuthor,
  decreasePostsCountInAuthor,
  increaseReadsCount,
  addBlogsToAuthors,
  removeBlogsFromAuthors,
  increasePostsCountInAuthors,
  decreasePostsCountInAuthors,
  unnecessaryFieldsPrevention,
  updateImageField,
  deleteImageFromStorage,
  processLatestBlogs,
  processTrendingBlogs,
  processSearchedBlogs,
  setReadCountCookie,
};
