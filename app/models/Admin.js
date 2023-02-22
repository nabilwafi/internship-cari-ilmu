const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;

let AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name must be fill"],
    },
    email: {
      type: String,
      require: [true, "email must be fill"],
    },
    password: {
      type: String,
      require: [true, "password must be fill"],
    },
  },
  { timestamps: true }
);

AdminSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("admin").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} has registered`
);

AdminSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, SALT);
  next();
});

module.exports = mongoose.model("admin", AdminSchema);
