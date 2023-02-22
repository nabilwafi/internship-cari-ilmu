const express = require("express");
const router = express.Router();

const courses = require("../controllers/courseController");

const { runValidation, courseValidation } = require("../validations");

router.get("/", courses.index);
router.get("/:id", courses.show);
router.post("/", courseValidation, runValidation, courses.store);
router.put("/:id", courseValidation, runValidation, courses.update);
router.delete("/:id", courses.delete);

module.exports = router;
