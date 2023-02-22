const mongoose = require("mongoose");

let UserCourseSchema = mongoose.Schema(
  {
    users_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: [true, "user must be fill"],
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      require: [true, "course must be fill"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_course", UserCourseSchema);
