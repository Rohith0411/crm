const router = require("express").Router();
const Lead = require("../models/Lead");
const auth = require("../middleware/authMiddleware");

// CREATE LEAD
router.post("/", auth, async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});

// GET LEADS (Pagination + Search + Filter)
router.get("/", auth, async (req, res) => {
  const { page = 1, search = "", status } = req.query;

  const query = {
    isDeleted: false,
    name: { $regex: search, $options: "i" }
  };

  if (status) query.status = status;

  const leads = await Lead.find(query)
    .populate("assignedTo company")
    .skip((page - 1) * 5)
    .limit(5);

  const total = await Lead.countDocuments(query);

  res.json({ leads, total });
});

// UPDATE LEAD
router.put("/:id", auth, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(lead);
});

// SOFT DELETE
router.delete("/:id", auth, async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.json("Deleted");
});

module.exports = router;