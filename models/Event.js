const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date },
  venue: { type: String, default: 'School Campus' },
  category: { type: String, enum: ['Academic','Sports','Cultural','Meeting','Holiday','Exam','Other'], default: 'Other' },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
