const mongoose = require('mongoose');

const DonorSchema  = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    age:{type: Number, required: true},
    address:{type: String},
    bloodGroup:{type: String, required: true},
    bloodPressure: {type: Number},
    phoneNumber: {type: String}, 
    diseases: {type:[String]},
    height: {type:Number},
    weight: {type:Number},
    date: {type: Date},
    status:{type: Number, default: 0},
});


module.exports = mongoose.model("Donor", DonorSchema);