import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
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