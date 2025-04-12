// Configuration Imports
import { constants } from "../config/config";

import {
  // Utilities
  fetchData,
  populateWithFormData,
  filterTruthElements,
  formatUrlQueryObj,

  // Helpers
  formatUserAccCreatedAt$UpdatedAt as formatTime,
} from "../config/exports";

const formatTime_internal = (result) => {
  const { users, user } = result?.result || {};

  if (users) {
    return {
      ...result,
      result: {
        users: users.map((item) => ({
          ...item,
          createdAt: item?.createdAt && formatTime(item.createdAt),
          updatedAt: item?.updatedAt && formatTime(item.updatedAt),
        })),
      },
    };
  }

  if (user) {
    return {
      ...result,
      result: {
        user: {
          ...user,
          createdAt: user?.createdAt && formatTime(user.createdAt),
          updatedAt: user?.updatedAt && formatTime(user.updatedAt),
          blogs: user.blogs
            ? {
                ...user.blogs,
                blogList: user.blogs.blogList.map((blog) => ({
                  ...blog,
                  createdAt: blog?.createdAt && formatTime(blog.createdAt),
                  updatedAt:
                    blog?.updatedAt &&
                    blog?.updatedAt > blog.createdAt &&
                    formatTime(blog.updatedAt),
                })),
              }
            : undefined,
        },
      },
    };
  }

  return result; // Return original result if neither 'users' nor 'user' exist
};

const baseUrl = `${constants.serverUrl}/api/user/`;

const apiCall_internal = async ({
  fetchOptions = {},
  userId = "",
  queries = {},
}) => {
  const formattedQueries = formatUrlQueryObj(filterTruthElements(queries));

  const url = `${baseUrl + userId}${formattedQueries}`;

  const response = await fetchData(url, fetchOptions);

  return response; // { status, message, result: { users/user }, serverError };
};

const getUsers = async () => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({ fetchOptions });
  const timeFormattedResult = formatTime_internal(result);
  return timeFormattedResult;
};

const getUser = async ({ userId, queries }) => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({
    fetchOptions,
    userId,
    queries,
  });

  const timeFormattedResult = formatTime_internal(result);
  return timeFormattedResult;
};

const updateUser = async ({ userId, formData }) => {
  const fetchOptions = {
    method: "PATCH",
    credentials: "include",
    body: populateWithFormData(formData),
  };

  const result = await apiCall_internal({ fetchOptions, userId });
  return result;
};

const deleteUser = async ({ userId }) => {
  const fetchOptions = {
    method: "DELETE",
    credentials: "include",
  };

  const result = await apiCall_internal({ fetchOptions, userId });
  return result;
};

const userApis = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userApis;
