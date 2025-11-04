import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors'; // Import CorsOptions
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// --- 1. SET UP A CORS WHITELIST ---
// This tells your server to ONLY allow requests from these origins.
const whitelist = [
  'https://doyourproject.netlify.app', // Your deployed frontend
  'http://localhost:5173',             // Your local frontend for development
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in our whitelist or if it's an undefined origin (e.g., Postman)
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (!origin) {
      // Allow requests with no origin (like server-to-server or tools)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// --- 2. USE THE NEW CORS OPTIONS ---
// Instead of app.use(cors()), use your new options.
app.use(cors(corsOptions));
// --- END OF CORS CHANGES ---

// Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: false }));

// A simple test route
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running in TypeScript on http://localhost:${port}`);
});

