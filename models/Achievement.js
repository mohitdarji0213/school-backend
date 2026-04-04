const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  studentName: { type: String },
  class: { type: String },
  category: { type: String, enum: ['Academic','Sports','Cultural','National','State','District','School'], default: 'School' },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
