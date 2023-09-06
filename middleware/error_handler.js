const httpStatusText = require("../utils/http_status_text");

const errorHandlerMiddleware = (error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
  });
};

module.exports = errorHandlerMiddleware;
