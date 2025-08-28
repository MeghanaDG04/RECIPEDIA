// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const errorHandler = require('./middlewares/errorhandler.middleware');

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const recipeRoutes = require('./routes/recipe.routes'); // ensure file name matches exactly

const app = express();

// ----- CORS -----
const defaultAllowedOrigins = ['http://localhost:3001'];
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [])
    .map(s => s.trim())
    .filter(Boolean)
    .concat(defaultAllowedOrigins)
);

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser requests or those from allowed origins
    if (!origin || allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// Parse JSON
app.use(express.json());

// (Optional) if behind a proxy like Render
app.set('trust proxy', 1);

// ----- Routes -----
app.get('/', (req, res) => res.send('Welcome to RECIPEDIA'));
app.get('/healthz', (req, res) => res.status(200).send('ok'));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);

// ----- Error handler (keep after routes) -----
app.use(errorHandler);

// ----- DB + Server start -----
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI env var. Set it in Render → Environment.');
  // Start server anyway to expose healthz (optional)
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP server listening on ${PORT} (no DB)`);
  });
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP server listening on ${PORT}`);
      });
    })
    .catch(err => {
      console.error('DB Connection Error:', err);
      // Optionally still start server so Render detects a port:
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP server listening on ${PORT} (DB connect failed)`);
      });
    });
}