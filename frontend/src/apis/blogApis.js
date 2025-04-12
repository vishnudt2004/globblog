// Configuration Imports
import { constants } from "../config/config";

import {
  // Utilities
  fetchData,
  populateWithFormData,
  filterTruthElements,
  formatUrlQueryObj,

  // Helpers
  formatBlogCreatedAt$UpdatedAt as formatTime,
} from "../config/exports";

const formatTime_internal = (result) => {
  const { blogs, blog } = result?.result || {};

  if (blogs) {
    return {
      ...result,
      result: {
        ...result?.result,
        blogs: blogs.map((item) => ({
          ...item,
          createdAt: item?.createdAt && formatTime(item.createdAt),
          updatedAt:
            item?.updatedAt &&
            item.updatedAt > item.createdAt &&
            formatTime(item.updatedAt),
        })),
      },
    };
  }

  if (blog) {
    return {
      ...result,
      result: {
        ...result?.result,
        blog: {
          ...blog,
          createdAt: blog?.createdAt && formatTime(blog.createdAt),
          updatedAt: blog?.updatedAt && formatTime(blog.updatedAt),
        },
      },
    };
  }

  return result; // Return original result if neither 'blogs' nor 'blog' exist
};

const baseUrl = `${constants.serverUrl}/api/blog/`;

const apiCall_internal = async ({
  fetchOptions = {},
  blogId = "",
  queries = {},
}) => {
  const formattedQueries = formatUrlQueryObj(filterTruthElements(queries));

  const url = `${baseUrl + blogId}${formattedQueries}`;

  const response = await fetchData(url, fetchOptions);

  return response; // { status, message, result: { blogs/blog }, serverError };
};

const getBlogs = async ({
  queries, // { filterType: "latest | trending | search", page, limit, dateRange: "startDate_endDate"[Date obj], sortBy, order, fields, search },
}) => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({ fetchOptions, queries });

  const timeFormattedResult = formatTime_internal(result);
  return timeFormattedResult;
};

const getBlog = async ({
  blogId,
  queries, // { readCompleted }
}) => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({ fetchOptions, blogId, queries });

  const timeFormattedResult = formatTime_internal(result);
  return timeFormattedResult;
};

const createBlog = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    credentials: "include",
    body: populateWithFormData(formData),
  };

  const result = await apiCall_internal({ fetchOptions });
  return result;
};

const updateBlog = async ({ blogId, formData }) => {
  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: populateWithFormData(formData),
  };

  const result = await apiCall_internal({ fetchOptions, blogId });
  return result;
};

const deleteBlog = async ({ blogId }) => {
  const fetchOptions = {
    method: "DELETE",
    credentials: "include",
  };

  const result = await apiCall_internal({ fetchOptions, blogId });
  return result;
};

const updateReadCount = async ({ blogId }) => {
  const fetchOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ countRead: true }),
  };

  const result = await apiCall_internal({
    fetchOptions,
    blogId: `read-count/${blogId}`,
  });
  return result;
};

const blogApis = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  updateReadCount,
};

export default blogApis;
