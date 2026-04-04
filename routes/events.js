const router = require("express").Router();
const Event = require("../models/Event");
const { adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "Event created", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
