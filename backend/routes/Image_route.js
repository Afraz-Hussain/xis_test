import express from "express";
const router=express.Router()
import upload from "../middleware/ImageUpload.js";
import {uploadImage} from "../controller/Image.js";
import authMiddleware from "../middleware/authMiddleware.js";
router.post("/upload",authMiddleware, upload.single("image"), uploadImage);
export default router
