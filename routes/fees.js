const router = require("express").Router();
const Fee = require("../models/Fee");
const { adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const fees = await Fee.find().sort({ class: 1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const data = req.body;
    data.totalFee =
      (+data.tuitionFee || 0) +
      (+data.admissionFee || 0) +
      (+data.examFee || 0) +
      (+data.sportsFee || 0) +
      (+data.computerFee || 0) +
      (+data.transportFee || 0);
    const fee = await Fee.create(data);
    res.status(201).json({ message: "Fee structure created", fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", adminOnly, async (req, res) => {
  try {
    const data = req.body;
    data.totalFee =
      (data.tuitionFee || 0) +
      (data.admissionFee || 0) +
      (data.examFee || 0) +
      (data.sportsFee || 0) +
      (data.computerFee || 0) +
      (data.transportFee || 0);
    const fee = await Fee.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ message: "Fee updated", fee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
    res.json({ message: "Fee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
