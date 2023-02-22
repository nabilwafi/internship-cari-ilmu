const express = require("express");
const router = express.Router();

const courseCategories = require("../controllers/courseCategoriesController");

const { runValidation, courseCategoryValidation } = require("../validations");

router.get("/", courseCategories.index);
router.get("/:id", courseCategories.show);
router.post(
  "/",
  courseCategoryValidation,
  runValidation,
  courseCategories.store
);
router.put(
  "/:id",
  courseCategoryValidation,
  runValidation,
  courseCategories.update
);
router.delete("/:id", courseCategories.delete);

module.exports = router;
