import express from "express";
const router = express.Router();
import cors from "cors";
import { constructUrl } from "../urlHelper.js";
import {
  createCategory,
  deleteCategory,
  showCategory,
  showSingleCategory,
  updateCategory,
} from "../controllers/categoryController.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

//CRUD
router.get("/", showCategory);
router.get("/:id", showSingleCategory);
router.post("/create", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
