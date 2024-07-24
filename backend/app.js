const express = require('express');
const app = express();


app.get('', (req, res, next) => {

    res.send("App is working");
});


module.exports = app;

// mridulkaushik
// s7JdBlgo8q3dCOLH 