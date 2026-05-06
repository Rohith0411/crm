const express = require("express");
const router = express.Router();
const User = require("../models/User");

//  GET ALL USERS (for dropdown)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;