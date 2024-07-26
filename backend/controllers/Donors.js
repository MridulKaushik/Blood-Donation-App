const Donor = require('../models/Donor');

const registerDonor = async (req, res) => {
    try{
        const newDonor = new Donor(req.body);
        const donor = await newDonor.save();
        res.status(201).json(donor);

    }catch(err){
        res.status(501).json(err);
    }
}


const getAllDonors = async (req, res) => {
    try{
        const donors = await Donor.find({}).sort({created_at:-1});
        res.status(200).json(donors);
    }catch(err){
        res.stauts(500).json(err);
    }
}

const updateDonor = async (req, res) => {
    try {
        const updatedDonor = await Donor.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedDonor);
    } catch (error) {
       res.status(500).json(err);
    }
}

const getADonor = async (req, res) => {
    
    try {
        const donor = await Donor.findById( req.params.id);
    } catch (error) {
        res.status(500).json(err);   
    }

}