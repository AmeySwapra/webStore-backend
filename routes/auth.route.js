import express from "express";
import { login, logout, resgiter } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', resgiter)
router.post('/login', login);
router.post('/logout', logout);


export default router;