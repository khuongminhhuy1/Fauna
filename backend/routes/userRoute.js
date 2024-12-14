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
import { constructUrl } from "../urlHelper.js";
import { authenticate } from "../middleware/authentication.js";

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});

//register
router.get("/register", (req, res) => {
  res.render("./user/register");
});
router.post("/register", createUser);

//login
router.get("/login", (req, res) => {
  res.render("./user/login");
});

router.post("/login", loginUser, authenticate);
//Verify
router.get("/verify/:id/:token", verifyEmail);

router.get("/verified", (req, res) => {
  res.render("./user/verify");
});

//CRUD
router.get("/users/:id", getUserById);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;