const jwt = require("jsonwebtoken");
const CustomError = require("../utils/custom_error");

const httpStatusText = require("../utils/http_status_text");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return next(
      new CustomError("Token is required", 401, httpStatusText.ERROR)
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    return next(new CustomError("Invalid token", 401, httpStatusText.ERROR));
  }
};

module.exports = verifyToken;
