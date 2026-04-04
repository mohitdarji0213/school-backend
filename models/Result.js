const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  admissionNo: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, default: 'A' },
  session: { type: String, required: true },
  examType: { type: String, enum: ['Half Yearly','Annual','Unit Test 1','Unit Test 2','Pre-Board'], required: true },
  subjects: [{
    name: String,
    maxMarks: Number,
    obtainedMarks: Number,
    grade: String
  }],
  totalMarks: Number,
  obtainedTotal: Number,
  percentage: Number,
  grade: String,
  rank: Number,
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
