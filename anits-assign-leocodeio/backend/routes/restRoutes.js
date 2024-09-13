import express from "express";
import {
  addReview,
  filterRest,
  getRest,
  getRestById,
  getTotalPages,
  serchByNameAndDesc,
  uploadCSV,
} from "../controller/rest.controller.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/get-rest-by-id/:id", getRestById);
router.post("/get-rest", getRest);
router.get("/get-total-pages", getTotalPages);
router.post("/adv/searchByNameAndDesc", serchByNameAndDesc);
router.post("/adv/filter", filterRest);
router.post("/review/:id",addReview);
export default router;
