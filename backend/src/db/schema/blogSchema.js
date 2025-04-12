// Node module Imports
const { Schema } = require("mongoose");

// Configuration Imports
const config = require("../../config/config");

// Database Functions
const { validateBlogField, validateTags } = require("../functions/validators");

// internal module declarations
const {
  TITLE_MINLENGTH,
  TITLE_MAXLENGTH,
  SUMMARY_MINLENGTH,
  SUMMARY_MAXLENGTH,
  TAGS_MINCOUNT,
  TAGS_MAXCOUNT,
} = config.BLOG;

const validationMessages = {
  title: {
    length: `The title of the blog should be between ${TITLE_MINLENGTH} and ${TITLE_MAXLENGTH} characters in length.`,
    required: "Title is required.",
    validate: "Title cannot be empty or just whitespace.",
  },
  summary: {
    length: `The summary of the blog should be between ${SUMMARY_MINLENGTH} and ${SUMMARY_MAXLENGTH} characters in length.`,
    required: "Summary is required.",
    validate: "Summary cannot be empty or just whitespace.",
  },
  content: {
    required: "Content is required.",
  },
  tags: {
    validate: `You should provide at least ${TAGS_MINCOUNT} and at most ${TAGS_MAXCOUNT} tags.`,
  },
};

const schema = {
  title: {
    type: String,
    minlength: [TITLE_MINLENGTH, validationMessages.title.length],
    required: [true, validationMessages.title.required],
    validate: [validateBlogField, validationMessages.title.validate],
  },
  image: String,
  summary: {
    type: String,
    minlength: [SUMMARY_MINLENGTH, validationMessages.summary.length],
    required: [true, validationMessages.summary.required],
    validate: [validateBlogField, validationMessages.summary.validate],
  },
  content: {
    type: String,
    required: [true, validationMessages.content.required],
  },
  tags: {
    type: [String],
    default: [],
    validate: [validateTags, validationMessages.tags.validate],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orphan: {
    type: Boolean,
    default: false,
    select: false,
  },
  readsCount: {
    type: Number,
    default: 0,
  },
};

const blogSchema = new Schema(schema, { timestamps: true, versionKey: false });

module.exports = blogSchema;
