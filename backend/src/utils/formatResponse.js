const successResponse = (
  res,
  statusCode = 200,
  message,
  result = undefined // { dataCount, data }
) => {
  res.status(statusCode).json({ status: "success", message, result });
};

const errorResponse = (
  res,
  statusCode = 500,
  message,
  details = undefined // { detail, documentationLink }
) => {
  res.status(statusCode).json({ status: "error", message, details });
};

const customResponse = (res, statusCode, responseObject) => {
  res.status(statusCode).json(responseObject);
};

const redirectResponse = (res, statusCode = 302, url, result = null) => {
  const status = encodeURIComponent(result.status);
  const message = encodeURIComponent(result.message);
  const redirect = `${url}${
    result ? `?status=${status}&message=${message}` : ""
  }`;

  res.status(statusCode).redirect(redirect);
};

module.exports = {
  successResponse,
  errorResponse,
  customResponse,
  redirectResponse,
};
