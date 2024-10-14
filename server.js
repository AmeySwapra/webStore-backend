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

// CORS options
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/courses', courseRoutes);

app.listen(5000, () => {
    console.log('Server is running fine..!!');
});
