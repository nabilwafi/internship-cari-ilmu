const mongoose = require("mongoose");

let CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title must be fill"],
    },
    course_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_category",
      require: [true, "course category must be fill"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", CourseSchema);
