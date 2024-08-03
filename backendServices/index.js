const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./utils/db")
const app = express();
const cron = require("node-cron");

dotenv.config();

// Schedule Tasks
const run = () => { 
    cron.schedule("5 5 * * * ", () => {
      console.log("running a task at 5 5 * * * ");
    });
};

// SERVER CONFIG
const PORT = process.env.PORT || 5001;

app.get("", (req, res, next) => {
  res.send("BackendSerivces is working");
});

run();

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}/`);
  dbConnect();
});

