const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  SERVERNAME: process.env.SERVERNAME,
  DBLINK: process.env.DBLINK,
  JWTTOKEN: process.env.JWTTOKEN
};
