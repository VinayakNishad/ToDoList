Full Stack Trello-Style To-Do List

A complete full-stack, single-page application (SPA) built with the MERN stack (MongoDB, Express, React, Node.js) and written entirely in TypeScript. It mimics the core functionality of a Trello board, allowing users to register, log in, and manage their own private tasks in a responsive, card-based layout.

Live Demo: https://doyourproject.netlify.app



Core Features

User Authentication: Full auth flow including register, login, and logout. Passwords are hashed (bcryptjs) and sessions are managed with JSON Web Tokens (JWT).

Private Routes: Users can only view and manage their own tasks. All task-related API routes are protected.

Full CRUD Functionality: Users can Create, Read, Udate, and Delete their own tasks.

Responsive Card Layout: Tasks are displayed in a responsive grid of cards that looks great on all devices, from mobile phones to desktops.

Rich Filtering & Sorting:
Search: Instantly search tasks by description.
Filter: Filter tasks by "All", "Complete", or "Incomplete" status.
Sort: Sort tasks by "Name" or "Status".

Tech Stack

Frontend
React (with Hooks)
Vite (for fast development and bundling)
TypeScript
React Router (for client-side routing)
Axios (for API requests)
CSS Modules (for component-scoped styling)

Backend
Node.js
Express
TypeScript
MongoDB Atlas (Cloud Database)
Mongoose (Object Data Modeling for MongoDB)
JSON Web Tokens (JWT) (for authentication)
bcryptjs (for password hashing)
CORS (for cross-origin requests)
dotenv (for environment variables)

Hosting & Deployment

This project is a "monorepo" and is deployed as two separate, communicating services.

1. Backend (on Render)

The Node.js/Express API server is hosted on Render.

Service: Web Service
Root Directory: server
Build Command: npm install && npm run build
Start Command: npm run start

Configuration: The server's server.ts file includes a CORS whitelist to specifically allow requests from the deployed Netlify URL and localhost for development.

2. Frontend (on Netlify)

The React/Vite client-side application is hosted on Netlify.

Service: Static Site

Base directory: client

Build command: npm run build

Publish directory: client/dist

Configuration: Netlify is configured with an environment variable VITE_API_URL that points to the live Render backend URL . This tells the React app where to send its API requests in production.