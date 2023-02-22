const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  index: async (req, res) => {
    try {
      const { limit } = req.query;

      const users = await User.find().limit(limit || 100);

      users.map((user) => {
        delete user._doc.password;
      });

      if (!users) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "Users not found",
        });
      }

      res.status(200).json({
        code: 200,
        status: "success",
        data: users,
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
      const { name, email, password } = req.body;

      const user = new User({ name, email, password });
      await user.save();

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Created User",
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
      const { name, email, password } = req.body;

      const hashPassword = bcrypt.hashSync(password, 10);
      await User.findByIdAndUpdate(
        { _id: id },
        { name, email, password: hashPassword }
      );

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Updated User",
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

      await User.findOneAndDelete({ _id: id });

      res.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully Deleted User",
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

      const user = await User.findById({ _id: id });

      if (!user) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: "User not found",
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
