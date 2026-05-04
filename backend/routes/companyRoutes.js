const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const Lead = require("../models/Lead");
const auth = require("../middleware/authMiddleware");

// ✅ GET ALL COMPANIES
router.get("/", auth, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies" });
  }
});

// ✅ GET COMPANY WITH LEADS
router.get("/:id", auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const leads = await Lead.find({
      company: req.params.id,
      isDeleted: false   // 🔥 soft delete filter
    });

    res.json({ company, leads });

  } catch (err) {
    res.status(500).json({ message: "Error fetching company details" });
  }
});

module.exports = router;