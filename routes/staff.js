const router = require("express").Router();
const Staff = require("../models/Staff");
const { adminOnly } = require("../middleware/auth");
const { uploadStaff, cloudinary } = require("../config/cloudinary");

// Get all staff (public)
router.get("/", async (req, res) => {
  try {
    const { department, isActive } = req.query;
    let query = { isActive: true };
    if (department) query.department = department;
    if (isActive === "false") query.isActive = false;
    const staff = await Staff.find(query).sort({ order: 1, createdAt: 1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add staff (admin)
router.post("/", adminOnly, uploadStaff.single("photo"), async (req, res) => {
  try {
    const staffData = { ...req.body };
    if (req.file) {
      staffData.photoUrl = req.file.path;
      staffData.publicId = req.file.filename;
    }
    if (typeof staffData.subjects === "string") {
      staffData.subjects = staffData.subjects.split(",").map((s) => s.trim());
    }
    const staff = await Staff.create(staffData);
    res.status(201).json({ message: "Staff added successfully", staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update staff
router.put("/:id", adminOnly, uploadStaff.single("photo"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      // Delete old image from Cloudinary
      const existing = await Staff.findById(req.params.id);
      if (existing?.publicId)
        await cloudinary.uploader.destroy(existing.publicId);
      updateData.photoUrl = req.file.path;
      updateData.publicId = req.file.filename;
    }
    const staff = await Staff.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json({ message: "Staff updated successfully", staff });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete staff
router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (staff?.publicId) await cloudinary.uploader.destroy(staff.publicId);
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
