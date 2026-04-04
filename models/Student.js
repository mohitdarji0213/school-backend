const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  applyingClass: { type: String, required: true, enum: ['Nursery','KG','1st','2nd','3rd','4th','5th','6th','7th','8th'] },
  previousSchool: { type: String, default: 'N/A' },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  parentPhone: { type: String, required: true },
  parentEmail: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  admissionNumber: { type: String, unique: true, sparse: true },
  remarks: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
