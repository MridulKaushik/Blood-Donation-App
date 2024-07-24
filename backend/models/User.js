const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: Number, default: 0},
    role: {type: String, default: 'admin'}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);
