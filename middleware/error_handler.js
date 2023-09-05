const httpStatusText = require("./utils/http_status_text");

const errorHandlerMiddleware = app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
  });
});

module.exports = errorHandlerMiddleware;
