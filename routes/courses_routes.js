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

const validationSchema = require("../middleware/validation_schema");

router.route("/").get(getAllCourses).post(validationSchema(), createCourse);

router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
