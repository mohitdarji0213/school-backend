const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  class: { type: String, required: true },
  session: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  admissionFee: { type: Number, default: 0 },
  examFee: { type: Number, default: 0 },
  sportsFee: { type: Number, default: 0 },
  computerFee: { type: Number, default: 0 },
  transportFee: { type: Number, default: 0 },
  totalFee: { type: Number },
  frequency: { type: String, enum: ['Monthly','Quarterly','Half Yearly','Annual'], default: 'Monthly' }
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
