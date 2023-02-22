const UserCourse = require("../models/UserCourse");

module.exports = {
  index: async (req, res) => {
    try {
      const { limit } = req.query;

      const userCourses = await UserCourse.find()
        .populate("users_id", "name")
        .populate({
          path: "course_id",
          populate: {
            path: "course_category_id",
            select: "name",
          },
        })
        .limit(limit || 100);

      if (!userCourses) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "User Courses not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: userCourses,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
  store: async (req, res) => {
    try {
      const { users_id, course_id } = req.body;

      const userCourse = new UserCourse({ users_id, course_id });
      await userCourse.save();

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Created User Course",
      });
    } catch (error) {
      res.status(422).json({
        code: 422,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { users_id, course_id } = req.body;

      await UserCourse.findByIdAndUpdate({ _id: id }, { users_id, course_id });

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Updated User Course",
      });
    } catch (error) {
      res.status(422).json({
        code: 422,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      await UserCourse.findOneAndDelete({ _id: id });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully Deleted User Course",
      });
    } catch (error) {
      res.status(422).json({
        code: 422,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await UserCourse.findById({ _id: id })
        .populate("users_id", "name")
        .populate({
          path: "course_id",
          populate: {
            path: "course_category_id",
            select: "name",
          },
        });

      if (!user) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "User Course not found",
        });
      }

      delete user._doc.password;

      res.status(200).json({
        code: 200,
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
};
