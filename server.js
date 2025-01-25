import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes.js';  // Explicitly include the file extension
import connectDB from './db.js'; // Import the database connection file
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { signup, login } from './authcontroller.js';  // Import the signup and login controllers

dotenv.config(); // Load environment variables from .env file

const app = express();

// Security Middleware
app.use(helmet());

// CORS Middleware
app.use(cors());

// Request Logging Middleware
app.use(morgan('dev'));

// JSON Parsing Middleware
app.use(json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', router);


// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Health Check Route (Optional)
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running smoothly!' });
});

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
