const { body } = require("express-validator");

const validationSchema = () => {
  return [
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
  ];
};

module.exports = validationSchema;
