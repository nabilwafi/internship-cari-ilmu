const express = require("express");
const router = express();

const adminsRouter = require("../app/routes/admins");
const usersRouter = require("../app/routes/users");
const courseCategoriesRouter = require("../app/routes/courseCategories");
const coursesRouter = require("../app/routes/courses");
const userCoursesRouter = require("../app/routes/userCourse");

router.use("/auth", adminsRouter);
router.use("/users", usersRouter);
router.use("/course-categories", courseCategoriesRouter);
router.use("/courses", coursesRouter);
router.use("/user-courses", userCoursesRouter)

module.exports = router;
