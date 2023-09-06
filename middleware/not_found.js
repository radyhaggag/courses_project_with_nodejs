const httpStatusText = require("../utils/http_status_text");

const notFoundMiddleware = (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "This Resource is not available",
  });
};

module.exports = notFoundMiddleware;
