import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//VIEWS SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//CORS
app.use(
  cors({ origin: "http://localhost:5173", credentials: true, origin: true })
);

//ROUTES SETUP
app.use("/", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);

//START SERVER
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));
