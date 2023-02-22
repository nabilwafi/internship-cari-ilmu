const CourseCategories = require("../models/CourseCategory");

module.exports = {
  index: async (req, res) => {
    try {
      const { limit } = req.query;

      const courseCategories = await CourseCategories.find().limit(
        limit || 100
      );

      courseCategories.map((user) => {
        delete user._doc.password;
      });

      if (!courseCategories) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "Users not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: courseCategories,
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
      const { name } = req.body;

      const courseCategory = new CourseCategories({ name });
      await courseCategory.save();

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Created Course Category",
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
      const { name } = req.body;

      await CourseCategories.findByIdAndUpdate({ _id: id }, { name });

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Updated Course Category",
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

      await CourseCategories.findOneAndDelete({ _id: id });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully Deleted Course Category",
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

      const courseCategory = await CourseCategories.findById({ _id: id });

      if (!courseCategory) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "Course Category not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: courseCategory,
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
