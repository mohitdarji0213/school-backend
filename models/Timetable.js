const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  class: { type: String, required: true },
  section: { type: String, default: 'A' },
  day: { type: String, required: true, enum: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
  periods: [{
    periodNo: Number,
    subject: String,
    teacher: String,
    startTime: String,
    endTime: String
  }],
  session: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
