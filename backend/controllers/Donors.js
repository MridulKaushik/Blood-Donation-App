const Donor = require("../models/Donor");

const registerDonor = async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    const donor = await newDonor.save();
    res.status(201).json(donor);
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
  } catch (error) {
    res.status(500).json(err);
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
    await Donor.findByIdAndDelete(req.params.id, function(err, docs){
        if (err){
            console.log(err);
        }else{
            res.status(201).json('Deleted donor - ', docs);
        }
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDonorStats = async (req, res) => {
    try{
        const stats = await Donor.aggregate([
            {$group: {
              _id: "$bloodGroup",
              count: {$sum: 1},
            }}
        ])
    } catch(error){
        res.status(500).json(error)
    }
};