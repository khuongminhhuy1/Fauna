import express from "express";
const router = express.Router();
import cors from "cors";
import { constructUrl } from "../urlHelper.js";
import { Checkout, GetOrders } from "../controllers/orderController.js";

router.use((req, res, next) => {
  res.locals.url = constructUrl(req);
  next();
});
router.get("/", GetOrders);
router.post("/checkout", Checkout);

export default router;
