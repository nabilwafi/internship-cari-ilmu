const express = require("express");
const router = express.Router();

const userCourse = require("../controllers/userCourseController");

const { runValidation, userCourseValidation } = require("../validations");

router.get("/", userCourse.index);
router.get("/:id", userCourse.show);
router.post("/", userCourseValidation, runValidation, userCourse.store);
router.put("/:id", userCourseValidation, runValidation, userCourse.update);
router.delete("/:id", userCourse.delete);

module.exports = router;
