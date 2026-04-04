const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, required: true },
  publicId: { type: String },
  category: { type: String, enum: ['Annual Function','Sports Day','Republic Day','Independence Day','Science Fair','Cultural','Classroom','Infrastructure','Other'], default: 'Other' },
  featured: { type: Boolean, default: false },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
