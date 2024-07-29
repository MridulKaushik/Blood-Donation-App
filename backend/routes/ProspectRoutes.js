const {
  registerProspect,
  getAllProspects,
  updateProspect,
  getProspect,
  deleteProspect,
  getProspectStats,
} = require("../controllers/Prospects");
const express = require("express");
const router = express.Router();

// Register the Prospect
router.post("/register", registerProspect);

// List all Prospects
router.get("/", getAllProspects);

// Get a Prospect
router.get("/find/:id", getProspect);

// Update Prospect
router.put("/:id", updateProspect);

// Delete a Prospect
router.delete("/:id", deleteProspect);

// Get Prospect Stats
router.get("/stats", getAllProspects);

module.exports = router;
