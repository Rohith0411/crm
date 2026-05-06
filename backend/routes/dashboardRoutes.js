const express = require("express");
const router = express.Router();

const Lead = require("../models/Lead"); 
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.get("/stats", auth, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments({ isDeleted: false });

    const qualifiedLeads = await Lead.countDocuments({
      status: "Qualified",
      isDeleted: false
    });

    const tasksDueToday = await Task.countDocuments({
      dueDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999)
      }
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed"
    });

    res.json({
      totalLeads,
      qualifiedLeads,
      tasksDueToday,
      completedTasks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;