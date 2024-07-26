const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// Register the new User
const registerUser = async (req, res) => {
  try{
    const checkUser = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    });

    if (checkUser) {
      res.status(200).json("User already exist. Please go to Login page");
    }
    else{
      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(
          req.body.password, // Actual Password
          process.env.PASS // Secret Key needed to decrypt password on other end
        ).toString(),
      });

      const user = await newUser.save();
      res.status(201).json(user);
    };
  }catch(err){
    res.status(500).json(err);
  }
};

// LoGIN User
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    });
    if (!user) {
      res.status(401).json("You are not registed yet!!!");
    }

    const userPassword = cryptoJs.AES.decrypt(
      user.password,
      process.env.PASS
    ).toString(cryptoJs.enc.Utf8);

    if (userPassword !== req.body.password) {
      res.status(500).json("Wrong Password");
    }

    const { password, ...info } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );
    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { registerUser, login };
