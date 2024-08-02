const Prospect = require("../models/Prospect");

const registerProspect = async (req, res) => {
  try {
    const { name, email, bloodGroup, phoneNumber, age } = req.body;
    const checkProspect = await Prospect.findOne({
      name: name,
      email: email,
      bloodGroup: bloodGroup,
      phoneNumber: phoneNumber,
      age: age,
    });

    if (checkProspect) {
      // console.log(checkProspect);
      res.status(409).json("Prospect alredy exist");
    } else {
      const newProspect = new Prospect(req.body);
      const prospect = await newProspect.save();
      res.status(201).json(prospect);
    }
  } catch (err) {
    console.log(err);
    res.status(501).json(err);
  }
};

const getAllProspects = async (req, res) => {
  try {
    const prospects = await Prospect.find({}).sort({ created_at: -1 });
    res.status(200).json(prospects);
  } catch (err) {
    res.stauts(500).json(err);
  }
};

const updateProspect = async (req, res) => {
  try {
    const updatedProspect = await Prospect.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProspect);
  } catch (err) {
    res.status(501).json(err);
  }
};

const getProspect = async (req, res) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
    res.status(200).json(prospect);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};

const deleteProspect = async (req, res) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
  } catch (error) {
    throw new Error("Failed to fetch Prospect");
  }
  try {
    await Prospect.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted Prospect");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getProspectStats = async (req, res) => {
  try {
    const stats = await Prospect.aggregate([
      {
        $group: {
          _id: "$bloodGroup",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerProspect,
  getAllProspects,
  updateProspect,
  getProspect,
  deleteProspect,
  getProspectStats,
};
