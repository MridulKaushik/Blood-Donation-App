const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const createTransporter = (config) => {
    const transporter = nodemailer.createTransport(config);
    return transporter;
};

let configurations = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    // port: 465, // if using secure connection options
    port:587, // if using smtp meaning no secure 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
}   