const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");

const { runValidation, AdminAndUserValidation } = require("../validations");

router.get("/", usersController.index);
router.get("/:id", usersController.show);
router.post("/", AdminAndUserValidation, runValidation, usersController.store);
router.put(
  "/:id",
  AdminAndUserValidation,
  runValidation,
  usersController.update
);
router.delete("/:id", usersController.delete);

module.exports = router;
