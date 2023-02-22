const mongoose = require("mongoose");
const { DBLINK } = require("../../config");

mongoose.set("strictQuery", false);
mongoose.connect(DBLINK);

const db = mongoose.connection;

module.exports = db;
