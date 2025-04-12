// Database Models
const Blog = require("../db/models/Blog");
const User = require("../db/models/User");

// Utility Functions
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");
const { successResponse } = require("../utils/formatResponse");

// Service Functions
const {
  setBlogAsOrphan,
  processUserBlogsOption,
  unnecessaryFieldsPrevention,
  updateImageField,
  formatProfileFields,
  formatSocialMediaProfilesField,
} = require("../services/userServices");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-blogs");

  const response = {
    statusCode: 200,
    message: "Users retrieval successful.",
    result: { usersCount: users.length, users },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const { page, limit, sort, order } = req.query.blogs || {};

  const populateOptions = processUserBlogsOption({ page, limit, sort, order });

  const foundUser = await User.findById(userId)
    .select("-_id")
    .populate(populateOptions)
    .lean();

  if (!foundUser) {
    const error = new CustomError("User not found.", 404);
    return next(error);
  }

  const totalResults = await Blog.countDocuments({ author: userId });

  const response = {
    statusCode: 200,
    message: "User retrieval successful.",
    result: {
      user: {
        ...foundUser,
        blogs: {
          totalResults,
          totalPages: Math.ceil(totalResults / populateOptions.options.limit),
          blogsCount: foundUser.blogs.length,
          blogList: foundUser.blogs,
        },
      },
    },
  };

  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const updateUser = asyncHandler(async (req, res, next) => {
  // fields: name, about, socialMediaProfiles, image
  const { socialMediaProfiles, image, ...fields } = req.body; // 'image' is destructured intentionally to avoid accidental overrides.
  const userId = req.params.id;
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    const error = new CustomError("User not found to update.", 404);
    return next(error);
  }

  if (authorizedUserId !== userId) {
    const error = new CustomError(
      "Access denied. You are not authorized to perform this action.",
      403
    );
    return next(error);
  }

  const unnecessaryFields = unnecessaryFieldsPrevention(fields);

  if (unnecessaryFields) {
    const error = new CustomError(unnecessaryFields, 422);
    return next(error);
  }

  const imageField = await updateImageField(req, foundUser);

  const { formattedProfileFields, emptyProfileFields } =
    await formatProfileFields({ ...fields, ...imageField });

  const {
    formattedSocialMediaProfiles,
    emptySocialMediaProfiles,
    errorWithSocialMediaProfiles,
    statusCode,
  } = await formatSocialMediaProfilesField(socialMediaProfiles);

  if (errorWithSocialMediaProfiles) {
    const error = new CustomError(errorWithSocialMediaProfiles, statusCode);
    return next(error);
  }

  const formattedFieldsToUpdate = {
    $set: { ...formattedProfileFields, ...formattedSocialMediaProfiles },
    $unset: { ...emptyProfileFields, ...emptySocialMediaProfiles },
  };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    formattedFieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  ).select("-_id");

  const response = {
    statusCode: 200,
    message: "User update successful.",
    result: { updatedUser },
  };
  return successResponse(
    res,
    response.statusCode,
    response.message,
    response.result
  );
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const authorizedUserId = req.userId;

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    const error = new CustomError("User not found to delete.", 404);
    return next(error);
  }

  if (authorizedUserId !== userId) {
    const error = new CustomError(
      "Access denied. You are not authorized to perform this action.",
      403
    );
    return next(error);
  }

  await foundUser.deleteOne();

  await setBlogAsOrphan(userId);

  const response = { statusCode: 200, message: "User deletion successful." };
  return successResponse(res, response.statusCode, response.message);
});

module.exports = { getUsers, getUser, updateUser, deleteUser };
