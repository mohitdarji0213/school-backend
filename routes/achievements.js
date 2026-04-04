const router = require("express").Router();
const Achievement = require("../models/Achievement");
const { adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured) query.isFeatured = true;
    const achievements = await Achievement.find(query).sort({ date: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const ach = await Achievement.create(req.body);
    res.status(201).json({ message: "Achievement added", ach });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Achievement updated", ach });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
