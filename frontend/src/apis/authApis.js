// Configuration Imports
import { constants } from "@/config/config";

import { fetchData } from "@/utils/jsUtils";

const baseUrl = `${constants.serverUrl}/api/auth/`;

const apiCall_internal = async ({ apiPath, fetchOptions = {} }) => {
  const url = baseUrl + apiPath;

  const response = await fetchData(url, fetchOptions);

  return response; // { status, message, serverError };
};

const register = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({ apiPath: "register", fetchOptions });
  return result;
};

const login = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({ apiPath: "login", fetchOptions });
  return result;
};

const logout = async () => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({ apiPath: "logout", fetchOptions });
  return result;
};

const emailVerification = async ({ userId, token }) => {
  const result = await apiCall_internal({
    apiPath: `email-verification/${userId}/${token}`,
  });
  return result;
};

const passwordResetRequest = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({
    apiPath: "password-reset/request",
    fetchOptions,
  });
  return result;
};

const passwordReset = async ({ userId, token, formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({
    apiPath: `password-reset/${userId}/${token}`,
    fetchOptions,
  });
  return result;
};

const googleOAuth20 = async () => {
  const url = baseUrl + "google";
  open(url, "_self");
};

const authApis = {
  register,
  login,
  logout,
  emailVerification,
  passwordResetRequest,
  passwordReset,
  googleOAuth20,
};

export default authApis;
