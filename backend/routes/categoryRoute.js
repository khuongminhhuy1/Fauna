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
import { authorizeRole, verifyToken } from "../middleware/authentication.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

//CRUD
router.get("/", showCategory);
router.get("/:id", showSingleCategory);
router.post("/create", verifyToken, authorizeRole("Admin"), createCategory);
router.put("/:id", verifyToken, authorizeRole("Admin"), updateCategory);
router.delete("/:id", verifyToken, authorizeRole("Admin"), deleteCategory);

export default router;
