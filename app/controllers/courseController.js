const Course = require("../models/Course");

module.exports = {
  index: async (req, res) => {
    try {
      const { limit } = req.query;

      const courses = await Course.find()
        .populate("course_category_id", "name")
        .limit(limit || 100);

      if (!courses) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "Users not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: courses,
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
      const { title, course_category_id } = req.body;

      const course = new Course({
        title,
        course_category_id,
      });
      await course.save();

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Created Course",
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
      const { title, course_category_id } = req.body;

      await Course.findByIdAndUpdate(
        { _id: id },
        { title, course_category_id }
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Updated Course",
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

      await Course.findOneAndDelete({ _id: id });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully Deleted Course",
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

      const course = await Course.findById({ _id: id }).populate(
        "course_category_id",
        "name"
      );

      if (!course) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "Course not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: course,
      });
    } catch (error) {
      res.status(422).json({
        code: 422,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
};
