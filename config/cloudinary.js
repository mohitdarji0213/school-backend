const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'lbs-school/gallery', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] }
});

const staffStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'lbs-school/staff', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] }
});

const uploadGallery = multer({ storage: galleryStorage });
const uploadStaff = multer({ storage: staffStorage });

module.exports = { cloudinary, uploadGallery, uploadStaff };
