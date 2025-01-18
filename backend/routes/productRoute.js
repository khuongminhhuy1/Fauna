import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import { constructUrl } from "../urlHelper.js";
import { upload } from "../utils/fileUpload.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} from "../controllers/productController.js";
import { authorizeRole, verifyToken } from "../middleware/authentication.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post(
  "/create",verifyToken , authorizeRole("Admin"),
  upload,
  (err, req, res, next) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(400)
        .json({ error: "File upload failed. " + err.message });
    }
    next();
  },
  createProduct
);
router.delete("/:id", deleteProduct);

export default router;
