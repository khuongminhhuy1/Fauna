import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up CloudinaryStorage with multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name where the images will be stored
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"], // Allowed image formats (corrected spelling)
  },
});

// Use multer with the Cloudinary storage, allowing up to 6 files
export const upload = multer({ storage }).array("images", 6);
