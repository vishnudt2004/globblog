// Configuration Imports
import config from "./config";

const { AUTOSAVE_INTERVAL: asInterval, COVERIMAGE_MAXSIZE: ciMaxSize } =
  config.BLOG;

// Static Messages
const messages = {
  UNAUTHORIZED: {
    title: "AUTHORIZATION FAILED",
    detail: "Authorization failed. Please register or log in.",
  },
  UNAVAILABLE: {
    title: "PAGE NOT FOUND | 4O4",
    detail: "The page you are looking for does not exist.",
  },
  BLOG: {
    BLOG_WRITING_TIPS: {
      title: "Blog Writing Tips",
      tips: [
        `Cover Image Selection: A wider image is ideal for the cover to ensure better layout adaptability. The maximum allowed size is ${
          ciMaxSize / (1024 * 1024)
        }MB.`,
        "Edit Anytime: Blogs can be edited anytime after creation.",
        "Image Sizing: Avoid increasing image sizes when resizing to prevent clutter on smaller screens (e.g., mobile, tablets). It's usually best to keep the original image size.",
        "Text Visibility: Be cautious with text color. Black text on a white background (light mode) or white text on a black background (dark mode) can cause confusion during text selection. Finalize these styles after writing the content.",
        "Contrast Across Modes: Default text is black in light mode and white in dark mode. Changing text to white or black may make it invisible in the opposite mode. If you use a colored background for text, ensure the text color contrasts well in both modes for readability.",
        'Auto Expand Editor Issue: If you resize your editor, the "Auto Expand Editor" may stop working due to browser behavior. Refreshing the page is required, but it may result in data loss when creating or updating a blog.',
        `Autosave (New Blog Only): When writing a new blog, all data except the cover image is autosaved to your local storage every ${
          asInterval / 1000 / 60
        } minutes. This data persists only until the blog is published and doesn't apply to blog updates. The "Auto Expand Editor" last state is also stored.`,
      ],
    },
    BLOG_READCOUNT_CALCINFO: {
      title: "How Reads Are Counted",
      additionalTitle:
        'We count a "read" for a blog post based on the following criteria:',
      infos: [
        "Estimated Reading Time: We calculate the total number of words in the content and estimate the reading time based on an average reading speed.",
        "Time Spent: If you spend at least 80% of the estimated reading time on the page, this is marked as time-based engagement.",
        "Scroll Progress: If you scroll through at least 80% of the content, this is marked as scroll-based engagement.",
        'A "read" is counted when both the time spent and scroll progress criteria are met.',
        "Read counts are public for now, with each read counted. However, counting is based on a set time period, so multiple reads within that period count as one.",
      ],
    },
  },
  USER: {
    USER_UPDATE_TIPS: {
      title: "Update Profile Tips",
      tips: [
        "Username & Email: These fields cannot be changed after account creation.",
        "Profile Image: A 500x500px image with JPEG or PNG format at a moderate compression (100-300KB) is ideal - ensuring clarity without unnecessary high file size. Click on your profile image to remove it.",
        "Profile Name: Must be 3-15 characters long, start with a letter, and only include letters, spaces, hyphens, and apostrophes (no consecutive spaces).",
        "About Field: You can write up to 150 characters in the About section. Newline (Enter) characters are allowed.",
        "Social Media Profiles: You can add up to 5 social media profiles. Click the 'Supported Platforms' button to see available options.",
      ],
    },
  },
};

export default messages;
