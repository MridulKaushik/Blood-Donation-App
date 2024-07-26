const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require('./routes/Authorize');

module.exports = app;

// Cors
app.use(cors());

// JSON
app.use(express.json());

app.get("", (req, res, next) => {
  res.send("App is working");
});

app.get("/api/auth/get", (req, res)=>{
  
  res.send("Go to /api/auth/register ");
})


// Routes
app.use('/api/auth/', authRoutes);