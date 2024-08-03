const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const DB = process.env.DB;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB).then(() => {
      console.log("Connection Established");
    });
  } catch (err) {
    console.log(err);
    setTimeout(dbConnect, 6001);
  }
};

module.exports = dbConnect;
