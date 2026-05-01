import express from "express";
const router=express.Router()
import {registeruser,loginuser} from "../controller/auth.js"
router.post("/register",registeruser);
router.post("/login",loginuser)
export default router


