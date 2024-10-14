import express from "express";
import { getCourse } from "../controllers/cousre.controller.js";



const router = express.Router();


router.get('/get-courses', getCourse);


export default router;