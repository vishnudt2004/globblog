// Node module Imports
const { model } = require("mongoose");

// Schema Import
const blogSchema = require("../schema/blogSchema");

const Blog = model("Blog", blogSchema);

module.exports = Blog;
