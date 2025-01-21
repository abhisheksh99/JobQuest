import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

// Load environment variables from .env file
dotenv.config({});

// Create an Express application
const app = express();

// Connect to the database
connectDB();

// Middleware setup
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({extended:true}));
// Parse cookies
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin:'http://localhost:5173', // Allow requests from this origin
    credentials:true // Allow credentials (cookies, authorization headers, etc.)
}

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT,()=>{
    connectDB(); // Connect to the database again (Note: This might be redundant)
    console.log(`Server running at port ${PORT}`);
})
