const User = require("../models/user");
const asyncWrapper = require("../middleware/async_wrapper");
const httpStatusText = require("../utils/http_status_text");
const CustomError = require("../utils/custom_error");

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const queries = req.query;
  const limit = queries.limit || 10;
  const page = queries.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);

  return res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    const error = new CustomError("User not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.json({ status: httpStatusText.SUCCESS, data: { user } });
});

module.exports = {
  getAllUsers,
  getSingleUser,
};
