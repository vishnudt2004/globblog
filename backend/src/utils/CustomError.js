class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.operationalError = true; // Differentiates between operational errors (related to credentials or network) and programming errors (related to code or syntax).
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
