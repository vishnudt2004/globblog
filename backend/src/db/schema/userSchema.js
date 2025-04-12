// Node module Imports
const { Schema } = require("mongoose");

// Configuration Imports
const config = require("../../config/config");

// Database Functions
const {
  validateUsername,
  validateProfileName,
  validateEmail,
  validateAbout,
} = require("../functions/validators");

// internal module declarations
const {
  USERNAME_MINLENGTH,
  PROFILENAME_MINLENGTH,
  USERNAME_MAXLENGTH,
  PROFILENAME_MAXLENGTH,
  ABOUT_MAXLENGTH,
} = config.USER;

// internal module declarations
const validationMessages = {
  username: {
    required: "Username is required.",
    immutable: "Username is immutable. Please remove username field.",
    validate: `Username must be ${USERNAME_MINLENGTH}-${USERNAME_MAXLENGTH} characters, contain only letters, numbers, underscores, or hyphens, and cannot start or end with an underscore or hyphen.`,
  },
  email: {
    required: "Email is required.",
    immutable: "Email is immutable. Please remove email field.",
    validate: "Please enter a valid email address.",
  },
  googleId: {
    immutable: "googleId is immutable. Please remove googleId field.",
  },
  profile: {
    name: {
      required: "Profile name is required.",
      validate: `Profile name must be ${PROFILENAME_MINLENGTH}-${PROFILENAME_MAXLENGTH} characters long, start with a letter, and can only contain letters, spaces, hyphens, and apostrophes without consecutive spaces.`,
    },
    about: {
      validate: `About section must be ${ABOUT_MAXLENGTH} characters or less.`,
    },
  },
};

const schema = {
  username: {
    type: String,
    unique: true,
    required: [true, validationMessages.username.minlength],
    immutable: [true, validationMessages.username.minlength],
    validate: [validateUsername, validationMessages.username.validate],
  },
  email: {
    type: String,
    unique: true,
    required: [true, validationMessages.email.required],
    immutable: [true, validationMessages.email.immutable],
    validate: [validateEmail, validationMessages.email.validate],
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
    select: false,
    immutable: [true, validationMessages.googleId.immutable],
  },
  profile: {
    name: {
      type: String,
      required: [true, validationMessages.profile.name.required],
      validate: [validateProfileName, validationMessages.profile.name.validate],
    },
    image: String,
    about: {
      type: String,
      validate: [validateAbout, validationMessages.profile.about.validate],
    },
    postsCount: {
      type: Number,
      default: 0,
    },
    readsCount: {
      type: Number,
      default: 0,
    },
    socialMediaProfiles: {
      type: Map,
      of: String,
    },
  },
  blogs: {
    type: [Schema.Types.ObjectId],
    ref: "Blog",
    default: [],
  },
  verification: {
    type: new Schema(
      {
        verified: {
          type: Boolean,
          default: false,
        },
        expireAt: {
          type: Date,
          index: { expires: 0 },
        },
      },
      { _id: false }
    ),
    select: false,
  },
};

const userSchema = new Schema(schema, { timestamps: true, versionKey: false });

module.exports = userSchema;
