// Database Models
const Blog = require("../db/models/Blog");
const User = require("../db/models/User");

// Database Functions
const { removeFields } = require("../db/functions/filterDocument");

// Utility Functions
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const { getCookie } = require("../utils/cookieUtils");
const { successResponse } = require("../utils/formatResponse");

// Service Functions
const {
  addBlogToAuthor,
  removeBlogFromAuthor,
  increasePostsCountInAuthor,
  decreasePostsCountInAuthor,
  increaseReadsCount,
  unnecessaryFieldsPrevention,
  updateImageField,
  deleteImageFromStorage,
  processLatestBlogs,
  processTrendingBlogs,
  processSearchedBlogs,
  setReadCountCookie,
} = require("../services/blogServices");

const getBlogs = asyncHandler(async (req, res) => {
  const {
    filterType, // latest | trending | search
    page,
    limit,

    // trending - only for supported filterType: trending
    dateRange, // e.g. "startDate_endDate"

    // search - only for supported filterType: search
    sortBy,
    order,
    fields,
    search,
  } = req.query;

  let blogsResult = {};

  switch (filterType) {
    case "latest":
      blogsResult = await processLatestBlogs(Blog, {
        page,
        limit,
      });
      break;
    case "trending":
      blogsResult = await processTrendingBlogs(Blog, {
        page,
        limit,
        dateRange,
      });
      break;
    case "search":
      blogsResult = await processSearchedBlogs(Blog, fields, {
        sortBy,
        order,
        search,
        page,
        limit,
      });
      break;
    default:
      const totalResults = await Blog.countDocuments(); // Count all blogs for default case
      const fallbackLimit = 5;
      const blogs = await Blog.find()
        .select("-content +orphan")
        .skip((page - 1) * (limit || fallbackLimit))
        .limit(Number(limit || fallbackLimit))
        .populate("author", "-blogs");
      blogsResult = {
        totalResults,
        totalPages: Math.ceil(totalResults / (limit || fallbackLimit)),
        blogs,
      };
      break;
  }

  // const blogsFormatted = await Promise.all(
  //   blogsResult?.blogs.map((blog) => {
  //     if (!blog.orphan) {
  //       return removeFields(blog, ["orphan"]);
  //     }
  //     return blog;
  //   })
  // );

  const response = {
    statusCode: 200,
    message: "Blogs retrieval successful.",
    result: {
      totalResults: blogsResult.totalResults,
      totalPages: blogsResult.totalPages,
      blogsCount: blogsResult.blogs.length,
      blogs: blogsResult.blogs,
    },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const getBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId)
    .select("+orphan")
    .populate("author", "-blogs");

  if (!blog) {
    const error = new CustomError("Blog not found.", 404);
    return next(error);
  }

  let blogFiltered = removeFields(blog, ["_id"]);

  if (!blog.orphan) {
    blogFiltered = removeFields(blog, ["orphan", "_id"]);
  }

  const response = {
    statusCode: 200,
    message: "Blog retrieval successful.",
    result: { blog: blogFiltered },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const createBlog = asyncHandler(async (req, res, next) => {
  const { title, summary, content, tags, ...fields } = req.body;
  const image = req?.file?.filename;
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(authorizedUserId);

  if (!foundUser) {
    const error = new CustomError(
      "Authorization failed. User account does not exist.",
      401
    );
    return next(error);
  }

  const unnecessaryFields = unnecessaryFieldsPrevention(fields);

  if (unnecessaryFields) {
    const error = new CustomError(unnecessaryFields, 422);
    return next(error);
  }

  const foundBlog = await Blog.findOne({ title, content });

  if (foundBlog) {
    const error = new CustomError(
      "A blog post identical to this already exists.",
      409
    );
    return next(error);
  }

  const createdBlog = await Blog.create({
    title,
    image,
    summary,
    content,
    tags: JSON.parse(tags),
    author: authorizedUserId,
  });

  await addBlogToAuthor(createdBlog);

  await increasePostsCountInAuthor(authorizedUserId);

  const blogFiltered = removeFields(createdBlog, ["author", "orphan"]);

  const response = {
    statusCode: 201,
    message: "Blog creation successful.",
    result: { createdBlog: blogFiltered },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { image, tags, ...fields } = req.body; // title, image, summary, content
  const blogId = req.params.id;
  const authorizedUserId = req.userId;

  const foundBlog = await Blog.findById(blogId).select("+orphan");

  if (!foundBlog) {
    const error = new CustomError("Blog not found to update.", 404);
    return next(error);
  }

  if (authorizedUserId !== foundBlog?.author?.toString()) {
    const error = new CustomError(
      "Access denied. You are not authorized to perform this action.",
      403
    );
    return next(error);
  }

  const unnecessaryFields = unnecessaryFieldsPrevention(fields);

  if (!!unnecessaryFields) {
    const error = new CustomError(unnecessaryFields, 422);
    return next(error);
  }

  const imageField = await updateImageField(req, foundBlog);

  let update = { tags: JSON.parse(tags), ...fields, ...imageField };

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, update, {
    new: true,
    runValidators: true,
  }).select("-author");

  const response = {
    statusCode: 200,
    message: "Blog update successful.",
    result: { updatedBlog },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const authorizedUserId = req.userId;

  const foundBlog = await Blog.findById(blogId);

  if (!foundBlog) {
    const error = new CustomError("Blog not found to delete.", 404);
    return next(error);
  }

  if (authorizedUserId !== foundBlog?.author?.toString()) {
    const error = new CustomError(
      "Access denied. You are not authorized to perform this action.",
      403
    );
    return next(error);
  }

  await deleteImageFromStorage(foundBlog);

  await removeBlogFromAuthor(foundBlog);

  await decreasePostsCountInAuthor(authorizedUserId);

  await foundBlog.deleteOne();

  const response = { statusCode: 200, message: "Blog deletion successful." };
  return successResponse(res, response.statusCode, response.message);
});

const updateReadCount = asyncHandler(async (req, res, next) => {
  const countRead = req.body.countRead;
  const blogId = req.params.id;

  const foundBlog = await Blog.findById(blogId).select("+orphan");

  if (!foundBlog) {
    const error = new CustomError("Blog not found to update read count.", 404);
    return next(error);
  }

  if (countRead !== true) {
    const error = new CustomError("Invalid read count request.", 400);
    return next(error);
  }

  const key = `read_${blogId}`;
  const alreadyCounted = await getCookie(req, key);

  if (alreadyCounted) {
    const error = new CustomError("Read count has already been recorded.", 409);
    return next(error);
  }

  await setReadCountCookie(res, key);
  await increaseReadsCount(foundBlog);

  const response = {
    statusCode: 200,
    message: "Blog read count successful.",
  };
  return successResponse(res, response.statusCode, response.message);
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  updateReadCount,
};
