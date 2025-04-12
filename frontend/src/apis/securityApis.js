// Configuration Imports
import { constants } from "../config/config";

import {
  // Utilities
  fetchData,
} from "../config/exports";

const baseUrl = `${constants.serverUrl}/api/security/`;

const apiCall_internal = async ({ apiPath, fetchOptions = {} }) => {
  const url = baseUrl + apiPath;

  const response = await fetchData(url, fetchOptions);

  return response; // { status, message, result: { currentUser }, serverError };
};

const getCurrentUser = async () => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({
    apiPath: "current-user",
    fetchOptions,
  });
  return result;
};

const validatePassword = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({
    apiPath: "validate-password",
    fetchOptions,
  });
  return result;
};

const getOTP = async () => {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };

  const result = await apiCall_internal({ apiPath: "get-otp", fetchOptions });
  return result;
};

const verifyOTP = async ({ formData }) => {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  };

  const result = await apiCall_internal({
    apiPath: "verify-otp",
    fetchOptions,
  });
  return result;
};

const securityApis = {
  getCurrentUser,
  validatePassword,
  getOTP,
  verifyOTP,
};

export default securityApis;
