import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Validate Cloudinary credentials
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_API_KEY ||
  !process.env.CLOUD_API_SECRET
) {
  throw new Error(
    "Cloudinary configuration is missing in environment variables."
  );
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // You can dynamically set folders based on req.user, etc.
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Allowed formats
  },
});

// Set up multer with Cloudinary storage and size limits
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB each
}).array("images", 6); // Allow up to 6 files

// Middleware for handling multer errors
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }
  next();
};
