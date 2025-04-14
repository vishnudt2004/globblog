// Configuration Imports
import config, { constants } from "@/config/config";

const { POSTS_CREATEDAT$UPDATEDAT_FORMATOPTIONS: postsDatesOptions } =
  config.UI_ELEMENTS.BLOG;
const { ACCS_CREATEDAT$UPDATEDAT_FORMATOPTIONS: accountsDatesOptions } =
  config.UI_ELEMENTS.USER;

// User

const formatUserProfileImageUrl = (image) => {
  if (image) {
    if (image.startsWith("http") || image.startsWith("https")) return image;
    else return `${constants.userProfileImageBaseUrl}/${image}`;
  } else return null;
};

const formatUserAccCreatedAt$UpdatedAt = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", accountsDatesOptions);
};

// Blog

const formatBlogCoverImageUrl = (image) =>
  image ? `${constants.blogCoverImageBaseUrl}/${image}` : null;

const formatBlogCreatedAt$UpdatedAt = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-GB", postsDatesOptions);
};

export {
  formatUserProfileImageUrl,
  formatBlogCoverImageUrl,
  formatBlogCreatedAt$UpdatedAt,
  formatUserAccCreatedAt$UpdatedAt,
};
