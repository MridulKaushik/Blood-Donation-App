const {
  registerDonor,
  getAllDonors,
  updateDonor,
  getDonor,
  deleteDonor,
  getDonorStats,
} = require("../controllers/Donors");
const express = require("express");
const router = express.Router();

// Register the donor
router.post("/register", registerDonor);

// List all donors
router.get("/", getAllDonors);

// Get a donor
router.get("/:id", getDonor);

// Update Donor
router.put("/update/:id", updateDonor);

// Delete a donor
router.delete("/delete/:id", deleteDonor);

// Get Donor Stats
router.get("/stats", getAllDonors);

module.exports = router;
