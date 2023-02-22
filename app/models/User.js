const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT = 10;

let UserSchema = mongoose.Schema(
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

UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("user").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} has registered`
);

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, SALT);
  next();
});

module.exports = mongoose.model("user", UserSchema);
