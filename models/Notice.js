const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['General','Exam','Holiday','Fee','Admission','Sports','Cultural','Emergency'], default: 'General' },
  targetClass: { type: String, default: 'All' },
  isImportant: { type: Boolean, default: false },
  attachmentUrl: { type: String },
  expiresAt: { type: Date },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
