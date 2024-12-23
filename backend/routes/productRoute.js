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

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/create", upload, createProduct);
router.delete("/:id", deleteProduct);

export default router;
