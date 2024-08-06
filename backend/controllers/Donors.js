const Donor = require("../models/Donor");

const registerDonor = async (req, res) => {
  try {
    const { name, email, bloodGroup, phoneNumber, age } = req.body;
    const checkDonor = await Donor.findOne({
      name: name,
      email: email,
      bloodGroup: bloodGroup,
      phoneNumber: phoneNumber,
      age: age,
    });

    if (checkDonor) {
      console.log(checkDonor._id);
      res.status(409).json("Donor alredy exist");
    } else {
      const newDonor = new Donor(req.body);
      const donor = await newDonor.save();
      // console.log(donor.domain); // Trying the vitruals function of mongoose
      res.status(201).json({ success: true, data: donor });
    }
  } catch (err) {
    res.status(501).json(err);
  }
};

const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({}).sort({ created_at: -1 });
    res.status(200).json(donors);
  } catch (err) {
    res.stauts(500).json(err);
  }
};

const updateDonor = async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDonor);
  } catch (err) {
    res.status(501).json(err);
  }
};

const getDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json(err);
  }
};

const deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
  } catch (error) {
    throw new Error("Failed to fetch donor");
  }
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Donor");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getDonorStats = async (req, res) => {
  try {
    const stats = await Donor.aggregate([
      {
        //     $group: {
        //       _id: "$bloodGroup",
        //       count: { $sum: 1 },
        //     },
        //   },
        // ]);
        $group: {
          _id: "$date",
          donorIds: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          _id: 0,
          donorIds: 1,
          count: 1,
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerDonor,
  getAllDonors,
  updateDonor,
  getDonor,
  deleteDonor,
  getDonorStats,
};
