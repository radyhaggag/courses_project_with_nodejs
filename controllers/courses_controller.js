const Course = require("../models/course");
const { validationResult } = require("express-validator");

const httpStatusText = require("../utils/http_status_text");

const asyncWrapper = require("../middleware/async_wrapper");

const CustomError = require("../utils/custom_error");

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const queries = req.query;
  const limit = queries.limit || 10;
  const page = queries.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);

  return res.json({ status: httpStatusText.SUCCESS, data: { courses } });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);

  if (!course) {
    const error = new CustomError("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const createCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new CustomError(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const course = await Course.create({ ...req.body });
  return res.json({
    status: httpStatusText.SUCCESS,
    data: { course },
  });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findByIdAndUpdate(
    courseId,
    { ...req.body },
    { new: true }
  );

  if (!course) {
    const error = new CustomError("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findByIdAndDelete(courseId);
  if (!course) {
    const error = new CustomError("Course not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
