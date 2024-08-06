const mongoose = require("mongoose");

const defaultDob = function () {
  let date = new Date();
  date.setFullYear(date.getFullYear() - this.age);
  return date;
};

const defaultDate = function () {
  let now = new Date();

  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  let finalDate = new Date(year, month, date).toLocaleDateString();
  return finalDate;
};

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, default: "" },
    bloodGroup: { type: String, required: true },
    bloodPressure: { type: String, default: "80-120" },
    phoneNumber: { type: String, required: true },
    diseases: { type: [String] },
    height: { type: Number },
    weight: { type: Number },
    date: { type: String, default: defaultDate },
    dob: { type: Date, default: defaultDob },
    status: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Trying the vitruals function of mongoose
// DonorSchema.virtual('domain').get(function(){
//   return this.email.slice(this.email.indexOf('@')+1);
// })

module.exports = mongoose.model("Donor", DonorSchema);
