// Node module Imports
const path = require("path");

// Configuration Imports
const config = require("../config/config");

// Database Models
const Blog = require("../db/models/Blog");

// Database Functions
const userImmutableFields = require("../db/functions/userImmutableFields");
const formatObjectData = require("../db/functions/formatObjectData");
const { validateSocialMediaProfiles } = require("../db/functions/validators");

// Utility Functions
const { hashPW } = require("../utils/bcryptUtils");
const { deleteFile } = require("../utils/fileUtils");

const processUserBlogsOption = (queries) => {
  const {
    sort = "createdAt", // Comparable Fields - readsCount | createdAt
    order = "desc", // asc | desc
    page = 1,
    limit = 5,
  } = queries || {};

  return {
    path: "blogs",
    select: "-author -content",
    options: {
      sort: sort
        ? { [sort]: order === "asc" ? 1 : order === "desc" && -1 }
        : { createdAt: -1 },
      skip: (page - 1) * limit,
      limit,
    },
  };
};

const setBlogAsOrphan = async (user_id) => {
  if (!user_id) return;
  await Blog.updateMany(
    { author: user_id },
    { orphan: true, $unset: { author: "" } }
  );
  return;
};

const hashPasswords = async (users) => {
  for (const user of users) {
    const { password } = user;
    const hashedPW = await hashPW(password);
    user.password = hashedPW;
  }
  return users;
};

const setBlogsAsOrphans = async (users) => {
  for (const { _id } of users) {
    await setBlogAsOrphan(_id);
  }
};

const unnecessaryFieldsPrevention = (fields) => {
  const { blogs, postsCount, readsCount } = fields;

  return userImmutableFields([
    { field: blogs, name: "blogs" },
    { field: postsCount, name: "postsCount" },
    { field: readsCount, name: "readsCount" },
  ]);
};

const formatProfileFields = async (fields) => {
  const {
    formattedObject: formattedProfileFields,
    emptyFieldsObject: emptyProfileFields,
  } = await formatObjectData("profile", fields);

  return {
    formattedProfileFields,
    emptyProfileFields,
  };
};

const formatSocialMediaProfilesField = async (newSocialMediaProfiles) => {
  const { SOCIALMEDIAPROFILES_MAXCOUNT } = config.USER;

  if (!newSocialMediaProfiles || newSocialMediaProfiles === "{}") return {};

  const parsedSMP = JSON.parse(newSocialMediaProfiles);

  const {
    formattedObject: formattedSocialMediaProfiles,
    emptyFieldsObject: emptySocialMediaProfiles,
  } = await formatObjectData("profile.socialMediaProfiles", parsedSMP);

  if (
    Object.keys(formattedSocialMediaProfiles).length >
    SOCIALMEDIAPROFILES_MAXCOUNT
  ) {
    return {
      errorWithSocialMediaProfiles: `Up to ${SOCIALMEDIAPROFILES_MAXCOUNT} social media profile links are allowed.`,
      statusCode: 400,
    };
  }

  const invalidProfileLinks = await Promise.all(
    Object.entries(formattedSocialMediaProfiles).map(async ([key, value]) => {
      const isValid = validateSocialMediaProfiles(value);
      return isValid ? null : key.split(".").pop();
    })
  ).then((results) => results.filter(Boolean));

  if (invalidProfileLinks.length) {
    return {
      errorWithSocialMediaProfiles: `Invalid link detected for the following fields: ${invalidProfileLinks.join(
        ", "
      )}`,
      statusCode: 422,
    };
  }

  return { formattedSocialMediaProfiles, emptySocialMediaProfiles };
};

const updateImageField = async (req, foundUser) => {
  const { PROFILEIMAGE_LOCATION } = config.USER;

  const bodyField = req.body?.image;
  const fileField = req?.file?.filename;
  const existDocField = foundUser?.profile?.image;

  const existFile =
    existDocField && path.join(PROFILEIMAGE_LOCATION, existDocField);

  if (bodyField && path.basename(bodyField) === existDocField) {
    return {};
  } else if (!!fileField) {
    // delete old image & update image field with new one.

    existFile && deleteFile(existFile);
    return { image: fileField };
  } else if (!bodyField && !fileField && existFile) {
    // delete image & remove image field.
    deleteFile(existFile);
    return { image: "" };
  }
};

module.exports = {
  processUserBlogsOption,
  setBlogAsOrphan,
  hashPasswords,
  setBlogsAsOrphans,
  unnecessaryFieldsPrevention,
  formatProfileFields,
  formatSocialMediaProfilesField,
  updateImageField,
};
