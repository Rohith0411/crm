const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");


//  GET ALL TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("lead", "name")
      .populate("assignedTo", "name");

    res.json(tasks);

  } catch (err) {
    console.error("GET TASK ERROR:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});


//  CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();

    res.json(task);

  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    res.status(500).json({ message: "Error creating task" });
  }
});


//  UPDATE STATUS (ONLY ASSIGNED USER)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    //  task not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //  assignedTo missing
    if (!task.assignedTo) {
      return res.status(400).json({ message: "No assigned user" });
    }

    //  user not logged in properly
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    //  restriction
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not allowed to update this task"
      });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({ message: "Error updating task" });
  }
});

module.exports = router;