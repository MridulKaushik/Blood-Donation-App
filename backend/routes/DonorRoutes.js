const { registerDonor, getAllDonors, updateDonor, getDonor, deleteDonor, getDonorStats } = require("../controllers/Donors");
const VerifyToken = require("../middlewares/verifyToken");

const express = require("express");
const router = express.Router();

// Register the donor
router.post("/register", VerifyToken, registerDonor);

// List all donors
router.get("/", getAllDonors);

// Get a donor
router.get("/find/:id", getDonor);

// Update Donor
router.put("/:id", updateDonor);

// Delete a donor
router.delete("/:id", deleteDonor);

// Get Donor Stats
router.get("/stats", getDonorStats);

module.exports = router;
