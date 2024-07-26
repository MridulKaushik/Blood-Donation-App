const { registerUser, login }= require('../controllers/Auth');
const express = require('express');
const router = express.Router();

// Register Router
router.post('/register', registerUser);

// Login Router
router.post('/login', login);

module.exports = router;