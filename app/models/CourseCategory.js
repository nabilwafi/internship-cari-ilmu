const mongoose = require("mongoose");

let CourseCategoriesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name must be fill"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course_category", CourseCategoriesSchema);
