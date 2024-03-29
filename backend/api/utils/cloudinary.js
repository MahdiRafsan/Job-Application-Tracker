const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Job-Application-Tracker",
    allowedFormats: ["jpeg", "png", "jpg"],
    transformation: [{ width: 200, height: 200, crop: "fill" }],
  },
});

module.exports = { cloudinary, storage };
