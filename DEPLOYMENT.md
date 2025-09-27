🚀 Recipedia 2.0 Deployment Guide
This guide provides comprehensive instructions for deploying the Recipedia 2.0 application to various environments, with a primary focus on Render.com.

📋 Pre-deployment Checklist
Before you begin, ensure you have completed the following steps:

[ ] All necessary environment variables are configured.

[ ] The build process has been tested and runs successfully locally.

[ ] The database connection has been verified.

[ ] All API endpoints have been tested for correct functionality.

[ ] Static assets (images, CSS, etc.) are optimized for production.

[ ] Security headers are correctly configured.

🌐 Render.com Deployment
Frontend Deployment
Create a new Static Site on Render.

Connect your GitHub repository.

Build Command: cd frontend && npm install && npm run build

Publish Directory: frontend/dist

Add Environment Variables:

VITE_API_BASE_URL=https://<your-backend-url>[.onrender.com/api](https://.onrender.com/api)
VITE_NODE_ENV=production

Custom Domain (Optional)

Add your custom domain in the Render dashboard settings.

Configure your DNS provider with the records provided by Render.

Backend Deployment
Create a new Web Service on Render.

Connect your GitHub repository.

Build Command: cd backend && npm install

Start Command: cd backend && npm start

Add Environment Variables:

NODE_ENV=production
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_strong_jwt_secret>
CORS_ORIGIN=https://<your-frontend-url>.onrender.com

🔧 Environment Variables
Production Environment Variables
Frontend (.env.production)
VITE_API_BASE_URL=https://<your-backend-url>[.onrender.com/api](https://.onrender.com/api)
VITE_API_TIMEOUT=15000
VITE_APP_NAME=Recipedia
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true

🗄️ Database Setup
MongoDB Atlas (Recommended)
Create a MongoDB Atlas account and a new cluster.

Create a dedicated database user with strong credentials.

Whitelist IP addresses that need access (use 0.0.0.0/0 for Render services).

Get the connection string and update the MONGODB_URI environment variable.

Local MongoDB (For Development)
# Install on macOS
brew install mongodb-community

# Install on Ubuntu
sudo apt-get install mongodb

# Start the MongoDB service
mongod --dbpath /data/db

🔒 Security Configuration
HTTPS & CORS
Render provides HTTPS by default. Ensure all API calls use the https:// protocol.

Configure CORS to only allow requests from your frontend's domain.

// backend/server.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

Environment Security
Never commit .env files to version control. Use a .env.example file instead.

Use strong, randomly generated secrets for JWTs and other keys.

Rotate secrets and credentials regularly.

📊 Performance Optimization
Frontend
Enable gzip compression on your server.

Use a CDN for static assets.

Optimize images to reduce load times.

Implement browser caching and a service worker for PWA capabilities.

Backend
Use a compression middleware (e.g., compression in Express).

Implement caching strategies for frequently accessed data (e.g., Redis).

Ensure database queries are efficient by using indexing.

🚨 Monitoring & Debugging
Logging & Health Checks
Implement a logging middleware to track requests.

// Add to backend/server.js
const morgan = require('morgan');
app.use(morgan('combined'));

Set up a health check endpoint for uptime monitoring.

// backend/health.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

Error Tracking
Integrate an error tracking service like Sentry to catch and analyze runtime errors.

🔄 CI/CD Pipeline (Optional)
You can automate deployments using GitHub Actions.

# .github/workflows/deploy.yml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Trigger Render Deployment
        run: echo "Deployment triggered via webhook or CLI command"

🐛 Troubleshooting
Common Issues
Build Failures:

Verify your Node.js version matches the one specified in package.json.

Clear your local cache and reinstall dependencies.

npm cache clean --force
rm -rf node_modules package-lock.json
npm install

API/Database Connection Issues:

Double-check that all environment variables are correctly set in the Render dashboard.

Ensure the database IP whitelist includes Render's addresses.

Verify the CORS_ORIGIN variable matches your exact frontend URL.

Debug Commands
# Frontend (local)
npm run build
npm run preview

# Backend (local)
npm run dev
curl http://localhost:5000/health

Happy Deploying! 🚀