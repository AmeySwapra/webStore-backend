import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';
import courseRoutes from './routes/course.route.js';

const app = express();

console.log("Testing the server in a good environment");

app.use(express.json());
app.use(cookieParser());


const corsOptions = {
    origin: ['http://localhost:5173', 'https://swapra-bookstore.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true, 
};


app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/courses', courseRoutes);

app.listen(5000, () => {
    console.log('Server is running fine..!!');
});
