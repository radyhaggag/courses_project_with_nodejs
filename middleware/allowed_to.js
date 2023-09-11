const CustomError = require("../utils/custom_error");
const userRoles = require("../utils/user_roles");

const httpStatusText = require("../utils/http_status_text");

const allowedTo = (...roles) => {
  return (req, res, next) => {
    const role = req.currentUser.role;
    if (!roles.includes(role)) {
      const error = new CustomError(
        "This role is not authorized",
        401,
        httpStatusText.FAIL
      );
      return next(error);
    }
    next();
  };
};

module.exports = allowedTo;
