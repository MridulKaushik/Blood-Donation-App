const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const DB = process.env.DB;

const dbConnection = async () => {
  try {
    await mongoose.connect(DB).then(() => {
      console.log("Connection Established");
    });
  } catch (err) {
    console.log(err);
    setTimeout(dbConnection, 6001);
  }
};

module.exports = dbConnection;
