const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWTTOKEN } = require("../../config");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const admin = new Admin({ name, email, password });
      await admin.save();

      res.status(201).json({
        code: 201,
        status: "success",
        message: "Successfully Created Admin",
      });
    } catch (error) {
      res.status(422).json({
        code: 422,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    Admin.findOne({ email })
      .then((admin) => {
        if (!admin) {
          return res.status(403).json({
            code: 403,
            status: "error",
            message: "email not found",
          });
        }

        const checkPassword = bcrypt.compareSync(password, admin.password);
        if (!checkPassword) {
          return res.status(403).json({
            code: 403,
            status: "error",
            message: "password invalid",
          });
        }

        const data = {
          id: admin.id,
          name: admin.name,
        };

        const token = jwt.sign({ admin: data }, JWTTOKEN);

        res.status(200).json({
          code: 200,
          status: "success",
          token,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          code: 500,
          status: "error",
          message: err.message || "Internal Server Error",
        });
      });
  },
};
