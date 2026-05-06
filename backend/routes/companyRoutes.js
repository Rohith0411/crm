const express = require("express");
const router = express.Router();

const Company = require("../models/Company");
const Lead = require("../models/Lead");
const auth = require("../middleware/authMiddleware");

//  GET ALL COMPANIES
router.get("/", auth, async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies" });
  }
});

//  GET COMPANY WITH LEADS
router.get("/:id", auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const leads = await Lead.find({
      company: req.params.id,
      isDeleted: false,
    });

    res.json({ company, leads });
  } catch (err) {
    res.status(500).json({ message: "Error fetching company details" });
  }
});

//  CREATE COMPANY
router.post("/", auth, async (req, res) => {
  try {
    const { name, industry, location } = req.body;

    const newCompany = new Company({
      name,
      industry,
      location,
    });

    const saved = await newCompany.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error creating company" });
  }
});

//  UPDATE COMPANY
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating company" });
  }
});

//  DELETE COMPANY
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting company" });
  }
});

module.exports = router;