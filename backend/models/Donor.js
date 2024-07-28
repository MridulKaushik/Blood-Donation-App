const mongoose = require("mongoose");

const defaultDob = function () {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
};

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, default: " " },
    bloodGroup: { type: String, required: true },
    bloodPressure: { type: String, default: "90-120" },
    phoneNumber: { type: String, required: true },
    diseases: { type: [String] },
    height: { type: Number },
    weight: { type: Number },
    date: { type: Date, default: Date.now() },
    dob: { type: Date, default: defaultDob },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donor", DonorSchema);
