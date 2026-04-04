const router = require("express").Router();
const Student = require("../models/Student");
const { adminOnly } = require("../middleware/auth");
const { sendAdminNotification } = require("../config/mailer");

// Register student (public) - sends email to admin
router.post("/register", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    // Send Gmail notification to admin
    await sendAdminNotification({
      subject: `🎓 New Student Registration - ${student.studentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #1a5276; border-radius: 10px;">
          <div style="background: #1a5276; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2>🏫 Lal Bahadur Shastri School</h2>
            <h3>New Student Registration Alert</h3>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; color: #1a5276;">Student Name:</td><td style="padding: 8px;">${student.studentName}</td></tr>
              <tr style="background: #e8f4f8;"><td style="padding: 8px; font-weight: bold; color: #1a5276;">Applying For Class:</td><td style="padding: 8px;">${student.applyingClass}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1a5276;">Date of Birth:</td><td style="padding: 8px;">${new Date(student.dateOfBirth).toLocaleDateString("en-IN")}</td></tr>
              <tr style="background: #e8f4f8;"><td style="padding: 8px; font-weight: bold; color: #1a5276;">Father's Name:</td><td style="padding: 8px;">${student.fatherName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1a5276;">Mother's Name:</td><td style="padding: 8px;">${student.motherName}</td></tr>
              <tr style="background: #e8f4f8;"><td style="padding: 8px; font-weight: bold; color: #1a5276;">Parent Phone:</td><td style="padding: 8px;">${student.parentPhone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1a5276;">Parent Email:</td><td style="padding: 8px;">${student.parentEmail}</td></tr>
              <tr style="background: #e8f4f8;"><td style="padding: 8px; font-weight: bold; color: #1a5276;">Address:</td><td style="padding: 8px;">${student.address}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #1a5276;">Previous School:</td><td style="padding: 8px;">${student.previousSchool}</td></tr>
              <tr style="background: #e8f4f8;"><td style="padding: 8px; font-weight: bold; color: #1a5276;">Registration Time:</td><td style="padding: 8px;">${new Date().toLocaleString("en-IN")}</td></tr>
            </table>
          </div>
          <div style="background: #1a5276; color: white; padding: 10px; text-align: center; border-radius: 0 0 8px 8px;">
            <p>Please login to Admin Panel to review this application.</p>
            <p style="font-size: 12px;">© Lal Bahadur Shastri School Management System</p>
          </div>
        </div>
      `,
      text: `New Registration: ${student.studentName} for Class ${student.applyingClass}. Parent: ${student.fatherName}, Phone: ${student.parentPhone}`,
    });

    res
      .status(201)
      .json({
        message: "Registration successful! We will contact you soon.",
        student,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all students (admin only)
router.get("/", adminOnly, async (req, res) => {
  try {
    const { status, class: cls, search } = req.query;
    let query = {};
    if (status) query.status = status;
    if (cls) query.applyingClass = cls;
    if (search)
      query.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { parentPhone: { $regex: search, $options: "i" } },
        { admissionNumber: { $regex: search, $options: "i" } },
      ];
    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single student
router.get("/:id", adminOnly, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student status
router.put("/:id", adminOnly, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated successfully", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete student
router.delete("/:id", adminOnly, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
