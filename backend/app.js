const express = require('express');
const cors = require('cors');
const app = express();

// Cors
app.use(cors());

// JSON
app.use(express.json());

app.get('', (req, res, next) => {
    res.send("App is working");
});


module.exports = app;