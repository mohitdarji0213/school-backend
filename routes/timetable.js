const router = require("express").Router();
const Timetable = require("../models/Timetable");
const { adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const { class: cls, session } = req.query;
    let query = {};
    if (cls) query.class = cls;
    if (session) query.session = session;
    const timetable = await Timetable.find(query).sort({ day: 1 });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const tt = await Timetable.create(req.body);
    res.status(201).json({ message: "Timetable created", tt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const tt = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Timetable updated", tt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Timetable deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
