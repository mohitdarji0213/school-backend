const router = require("express").Router();
const Gallery = require("../models/Gallery");
const { adminOnly } = require("../middleware/auth");
const { uploadGallery, cloudinary } = require("../config/cloudinary");

// Get all gallery images (public)
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (featured) query.featured = true;
    const images = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload image (admin only)
router.post("/", adminOnly, uploadGallery.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });
    const gallery = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      featured: req.body.featured === "true",
      imageUrl: req.file.path,
      publicId: req.file.filename,
      uploadedBy: req.user._id,
    });
    res.status(201).json({ message: "Image uploaded successfully", gallery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update gallery item
router.put("/:id", adminOnly, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Updated successfully", gallery });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete image
router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ message: "Image not found" });
    if (gallery.publicId) {
      await cloudinary.uploader.destroy(gallery.publicId);
    }
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
