const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth_controller");
const { body } = require("express-validator");

router.route("/register").post(register);
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
