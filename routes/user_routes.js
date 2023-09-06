const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const {
  getAllUsers,
  getSingleUser,
} = require("../controllers/users_controller");

router.route("/").get(getAllUsers);

router.route("/:userId").get(getSingleUser);

module.exports = router;
