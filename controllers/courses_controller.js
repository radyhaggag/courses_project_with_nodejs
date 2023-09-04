const Course = require("../models/course");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    res.json({ error });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    res.json({ course });
  } catch (error) {
    res.json({ error });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body });
    res.json({
      msg: "Course created Successfully",
      course: course,
    });
  } catch (error) {
    res.json({ error });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { ...req.body },
      { new: true }
    );
    res.json({
      msg: "Course Updated Successfully",
      course: course,
    });
  } catch (error) {
    res.json({ error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByIdAndDelete(courseId);
    res.json({
      msg: "Course Deleted Successfully",
      course: course,
    });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
