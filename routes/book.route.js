import express from "express";
import {  getBooks, postBook } from "../controllers/book.controller.js";


const router = express.Router();

router.post('/post-book', postBook);

router.get('/get-book', getBooks);


export default router;