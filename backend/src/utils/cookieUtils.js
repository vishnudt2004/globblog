const getCookie = async (req, cookieName) => req.cookies[cookieName];

const setCookie = async (res, cookieName, value, options = undefined) => {
  return res.cookie(cookieName, value, options);
};

const clearCookie = (res, cookieName, options = undefined) => {
  return res.clearCookie(cookieName, options);
};

module.exports = { getCookie, setCookie, clearCookie };
