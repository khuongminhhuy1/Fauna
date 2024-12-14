import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import userRoute from "./routes/userRoute.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

//VIEWS SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


//CORS
app.use(cors({ credentials: true, origin: true }));

//ROUTES SETUP
app.use("/user", userRoute);

//START SERVER
const port = process.env.PORT || 5555;
app.listen(port, () => console.log(`Listening on port ${port}`));