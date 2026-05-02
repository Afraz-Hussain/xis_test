import express from "express";
const router=express.Router()
import upload from "../middleware/ImageUpload.js";
import {filterImages, filterImagesByLabel, groupByLabel, perDay, uploadImage} from "../controller/Image.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {countImages} from "../controller/Image.js";

//to upload images
router.post("/upload",authMiddleware, upload.single("image"), uploadImage);

//to count images uploaded by user
router.get("/count",authMiddleware, countImages);
router.get("/filterimgs",authMiddleware, filterImages);// filtered by date
//filter by label
router.get("/filterbyLabel",authMiddleware, filterImagesByLabel);
//group by label
router.get('/groupbylabel', authMiddleware, groupByLabel)
//COUNT PER DAY...
router.get('/perday', authMiddleware, perDay)
export default router
