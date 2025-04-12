// Node module Imports
const express = require("express");

// Middleware Functions
const multerMW = require("../middlewares/multerMW");
const { deleteFileOnError } = multerMW;

// Controller Functions
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  updateReadCount,
} = require("../controllers/blogController");

// internal module declarations
const router = express.Router();

router
  .route("/")
  .get(getBlogs)
  .post(multerMW("blog/cover"), createBlog, deleteFileOnError);
router
  .route("/:id")
  .get(getBlog)
  .patch(multerMW("blog/cover"), updateBlog, deleteFileOnError)
  .delete(deleteBlog);
router.patch("/read-count/:id", updateReadCount);

module.exports = router;
