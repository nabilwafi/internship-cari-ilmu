const { check, validationResult } = require("express-validator");

const Course = require("../models/Course");
const CourseCategories = require("../models/CourseCategory");
const UserCourse = require("../models/UserCourse");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: errors.array()[0].msg,
    });
  }

  next();
};

exports.AdminAndUserValidation = [
  check("name", "name required").notEmpty(),
  check("email", "email required")
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("email must with @"),
  check("password", "password required")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password must be at least 6"),
];

exports.loginAdminValidation = [
  check("email", "email required").notEmpty(),
  check("password", "password required").notEmpty(),
];

exports.courseCategoryValidation = [check("name", "name required").notEmpty()];

exports.courseValidation = [
  check("title", "title required").notEmpty(),
  check("course_category_id", "course category is required")
    .notEmpty()
    .custom(async (value) => {
      return await CourseCategories.findById({ _id: value }).then(
        (courseCategory) => {
          if (!courseCategory) {
            throw new Error("Course Category not found");
          }
        }
      );
    }),
];

exports.userCourseValidation = [
  check("users_id", "user required")
    .notEmpty()
    .custom(async (value) => {
      return await UserCourse.findById({ _id: value }).then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
      });
    }),
  check("course_id", "course required")
    .notEmpty()
    .custom(async (value) => {
      return await Course.findById({ _id: value }).then((course) => {
        if (!course) {
          throw new Error("Course not found");
        }
      });
    }),
];
