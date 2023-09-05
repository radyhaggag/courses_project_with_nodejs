const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses_controller");

router
  .route("/")
  .get(getAllCourses)
  .post(
    [
      body("name")
        .notEmpty()
        .withMessage("name is required")
        .isLength({ min: 2 })
        .withMessage("name is at least 2 characters"),
      body("price")
        .notEmpty()
        .withMessage("price is required")
        .isInt()
        .withMessage("price must be a number"),
    ],
    createCourse
  );

router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
