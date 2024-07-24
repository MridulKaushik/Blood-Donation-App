const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

// Register the new User
const registerUser = async (req, res) => {
    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(
            req.body.password, // Actual Password
            process.env.PASS // Secret Key needed to decrypt password on other end
        ).toString(),
    });

    try{
        const user = await newUser();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }

};

// LoGIN User
const login = () => {

};