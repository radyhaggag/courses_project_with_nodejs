const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth_controller");
const { body } = require("express-validator");

const multer = require("multer");
const CustomError = require("../utils/custom_error");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user~${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const fileType = file.mimetype.split("/")[0];
  if (fileType !== "image") {
    return cb(new CustomError("Invalid file type", 400), false);
  } else {
    return cb(null, true);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
});

router.route("/register").post(upload.single("avatar"), register);
router
  .route("/login")
  .post(
    [
      body("email").notEmpty().withMessage("Email is required"),
      body("password").notEmpty().withMessage("Password is required"),
    ],
    login
  );

module.exports = router;
