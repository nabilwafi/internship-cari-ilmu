const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const {
  runValidation,
  AdminAndUserValidation,
  loginAdminValidation,
} = require("../validations");

router.post(
  "/register",
  AdminAndUserValidation,
  runValidation,
  adminController.register
);
router.post(
  "/login",
  loginAdminValidation,
  runValidation,
  adminController.login
);

module.exports = router;
