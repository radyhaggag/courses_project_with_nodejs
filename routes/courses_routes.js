const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses_controller");

router.route("/").get(getAllCourses).post(createCourse);

router
  .route("/:courseId")
  .get(getSingleCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
