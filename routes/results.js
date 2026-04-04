const router = require("express").Router();
const Result = require("../models/Result");
const { adminOnly } = require("../middleware/auth");

router.get("/check", async (req, res) => {
  try {
    const { admissionNo, session, examType } = req.query;
    if (!admissionNo || !session || !examType)
      return res.status(400).json({ message: "Please provide all fields" });
    const result = await Result.findOne({ admissionNo, session, examType });
    if (!result)
      return res
        .status(404)
        .json({ message: "Result not found. Please contact school." });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({ message: "Result added", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", adminOnly, async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
