import express from "express";
const router = express.Router();
import cors from "cors";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
  verifyEmail,
} from "../controllers/userController.js";
import {
  saveUserInformation,
  deleteUserInformation,
  getUserInformation,
} from "../controllers/userInfoController.js";
import { constructUrl } from "../urlHelper.js";
import {
  authenticate,
  authorizeRole,
  verifyToken,
} from "../middleware/authentication.js";
import { searchProducts } from "../controllers/productController.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

//register
router.post("/register", createUser);
//login
router.post("/login", loginUser, authenticate);
//Verify
router.get("/user/verify/:id/:token", verifyEmail);

//CRUD
router.get("/user/:id", getUserById);
router.get("/users", getAllUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", verifyToken, authorizeRole("Admin"), deleteUser);
//Information
router.get("/user/:userId/user-information", getUserInformation);
router.post("/user/:id/user-information", saveUserInformation);
router.put("/user/:id/user-information", saveUserInformation);
router.delete("/user/:id/user-information", deleteUserInformation);
//Search
router.get("/search", searchProducts);
export default router;
