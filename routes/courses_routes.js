const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const userRoles = require("../utils/user_roles");

const {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses_controller");

const validationSchema = require("../middleware/validation_schema");

const allowedTo = require("../middleware/allowed_to");

router.route("/").get(getAllCourses).post(validationSchema(), createCourse);

router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(allowedTo(userRoles.ADMIN), deleteCourse);

module.exports = router;
