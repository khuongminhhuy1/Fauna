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
import { saveUserInformation } from "../controllers/userInfoController.js";
import { constructUrl } from "../urlHelper.js";
import { authenticate } from "../middleware/authentication.js";

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
router.delete("/user/:id", deleteUser);
//Information
router.post("/user/:id/user-information", saveUserInformation);
export default router;
