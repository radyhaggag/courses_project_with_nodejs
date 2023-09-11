const User = require("../models/user");
const asyncWrapper = require("../middleware/async_wrapper");
const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/http_status_text");
const CustomError = require("../utils/custom_error");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/jwt_generator");

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    const error = new CustomError(
      "User already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: role,
  });

  await user.save();

  // Generate Token
  const token = generateJWT({ email: user.email, id: user._id, role: role });
  user.token = token;

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user } });
});

const login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new CustomError(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new CustomError(
      "User is not registered",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new CustomError("Invalid password", 400, httpStatusText.FAIL);
    return next(error);
  }

  const token = generateJWT({
    email: user.email,
    id: user._id,
    role: user.role,
  });

  return res.json({
    status: httpStatusText.SUCCESS,
    msg: "User login successful",
    data: {
      token: token,
    },
  });
});

module.exports = {
  register,
  login,
};
