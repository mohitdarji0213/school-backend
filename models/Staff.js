const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  photoUrl: { type: String, default: '' },
  publicId: { type: String },
  subjects: [{ type: String }],
  classTeacherOf: { type: String, default: '' },
  joiningDate: { type: Date },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
