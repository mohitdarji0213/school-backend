// notices.js
const router = require("express").Router();
const Notice = require("../models/Notice");
const { adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { category, targetClass } = req.query;
    let query = {};
    if (category) query.category = category;
    if (targetClass) query.$or = [{ targetClass }, { targetClass: "All" }];
    const notices = await Notice.find(query).sort({
      isImportant: -1,
      createdAt: -1,
    });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const notice = await Notice.create({ ...req.body, postedBy: req.user._id });
    console.log("Notice created:", notice);
    res.status(201).json({ message: "Notice created", notice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Notice updated", notice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
