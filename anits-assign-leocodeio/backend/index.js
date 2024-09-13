import express from "express";
import {} from "dotenv/config";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import { createAdmin } from "./controller/admin.controller.js";
import Admin from "./model/admin.js";
import resRouter from "./routes/restRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import cors from "cors";


const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));// body parser that parses URL-encoded request bodies (e.g., application/x-www-form-urlencoded)
app.use(cors())

connectDB().then(async () => {
  const adminExists = await Admin.findOne({ uname: "admin" });
  if (!adminExists) {
    await createAdmin();
  } else {
    console.log("Initial admin user already exists.");
  }
});

app.use("/api", resRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`backend running at ${port}`);
});
