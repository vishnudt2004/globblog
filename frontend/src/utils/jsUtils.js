import {
  // Utilities
  eventBus,
} from "../config/exports";

const fetchData = async (
  url = "", // url
  options = {} // {options}
) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // !error: Cause for unnecessary error messages.
    // if (result?.status === "error")
    //   eventBus.emit("serverError", {
    //     type: "error",
    //     message: result?.message,
    //   });

    return result;
  } catch (error) {
    eventBus.emit("serverError", {
      type: "error",
      message: "Unable to connect to the server. Please try again leter.",
    });

    return {
      status: "error",
      message: "Unable to connect to the server. Please try again leter.",
      serverError: true,
    };
  }
};

const populateWithFormData = (data, type = "set") => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value && (value.constructor === Object || Array.isArray(value))) {
      if (type === "append") formData.append(key, JSON.stringify(value));
      else formData.set(key, JSON.stringify(value));
    } else {
      if (type === "append") formData.append(key, value);
      else formData.set(key, value);
    }
  });

  return formData;
};

const filterTruthElements = (obj) =>
  Array.isArray(obj)
    ? obj.filter((el) => el)
    : Object.fromEntries(Object.entries(obj).filter(([, value]) => value));

const removeElements = (obj, keys) => {
  if (Array.isArray(obj))
    return obj.filter((element) => !keys.includes(element));
  else {
    const alteredObj = { ...obj };
    keys.forEach((key) => {
      delete alteredObj[key];
    });
    return alteredObj;
  }
};

function clipText(text = "", maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  const ellipsis = "...";
  const clipLength = maxLength - ellipsis.length;

  return text.substring(0, clipLength) + ellipsis;
}

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const chooseRandom = (input) => {
  if (Array.isArray(input)) {
    return input[Math.floor(Math.random() * input.length)];
  } else if (typeof input === "object" && input !== null) {
    const keys = Object.keys(input);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return input[randomKey];
  }
  throw new Error("Input must be an array or object");
};

const formatUrlQueryObj = (queryObj) => {
  return `?${Object.entries(queryObj)
    .map(([qKey, qVal]) => {
      if (typeof qVal === "object") {
        return Object.entries(qVal)
          .map(([nestedKey, nestedVal]) => `${qKey}[${nestedKey}]=${nestedVal}`)
          .join("&");
      }
      return `${qKey}=${qVal}`;
    })
    .join("&")}`;
};

function setCookie(name, value, expirationMs) {
  let expires = "";
  if (expirationMs) {
    const date = new Date();
    date.setTime(date.getTime() + expirationMs);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}; path=/` + expires;
}

const getCookie = (name) => {
  // only for non "httpOnly" cookies
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

export {
  fetchData,
  populateWithFormData,
  filterTruthElements,
  removeElements,
  clipText,
  capitalize,
  chooseRandom,
  formatUrlQueryObj,
  setCookie,
  getCookie,
};
