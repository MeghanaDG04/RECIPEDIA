# 🚀 Deployment Guide

This guide covers deploying Recipedia 2.0 to various platforms.

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Build process tested locally
- [ ] Database connection verified
- [ ] API endpoints tested
- [ ] Static assets optimized
- [ ] Security headers configured

## 🌐 Render.com Deployment

### Frontend Deployment

1. **Create a new Static Site**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`
   - Add environment variables:
     ```
     VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
     VITE_NODE_ENV=production
     ```

2. **Custom Domain (Optional)**
   - Add your custom domain in Render dashboard
   - Configure DNS settings

### Backend Deployment

1. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables:
     ```
     NODE_ENV=production
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CORS_ORIGIN=https://your-frontend-url.onrender.com
     ```

## 🔧 Environment Variables

### Production Environment Variables

#### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
VITE_API_TIMEOUT=15000
VITE_APP_NAME=Recipedia
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipedia
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-url.onrender.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
2. **Create a new cluster**
3. **Create database user**
4. **Whitelist IP addresses**
5. **Get connection string**
6. **Update MONGODB_URI in environment variables**

### Local MongoDB

```bash
# Install MongoDB
brew install mongodb-community  # macOS
# or
sudo apt-get install mongodb   # Ubuntu

# Start MongoDB
mongod --dbpath /data/db
```

## 🔒 Security Configuration

### HTTPS Setup
- Render.com provides HTTPS by default
- Ensure all API calls use HTTPS
- Set secure cookies in production

### CORS Configuration
```javascript
// backend/server.js
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Environment Security
- Never commit `.env` files
- Use strong JWT secrets
- Rotate secrets regularly
- Use environment-specific configurations

## 📊 Performance Optimization

### Frontend Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement service worker (PWA)
- Optimize images
- Enable browser caching

### Backend Optimization
- Enable compression middleware
- Implement caching strategies
- Use database indexing
- Optimize API responses
- Monitor performance metrics

## 🚨 Monitoring & Debugging

### Logging
```javascript
// Add to backend
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Error Tracking
- Set up Sentry for error tracking
- Monitor API response times
- Track user interactions

### Health Checks
```javascript
// backend/health.js
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
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
      - name: Deploy to Render
        run: echo "Deployment triggered"
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check Node.js version
   node --version
   
   # Clear cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API Connection Issues**
   - Check CORS configuration
   - Verify environment variables
   - Test API endpoints manually
   - Check network connectivity

3. **Database Connection Issues**
   - Verify MongoDB URI
   - Check IP whitelist
   - Test database connectivity
   - Check authentication credentials

### Debug Commands
```bash
# Frontend debugging
npm run build
npm run preview

# Backend debugging
npm run dev
curl http://localhost:5000/health
```

## 📈 Post-deployment

### Testing Checklist
- [ ] All routes work correctly
- [ ] Authentication flows properly
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] Static assets load
- [ ] Mobile responsiveness
- [ ] Performance metrics

### Monitoring Setup
- Set up uptime monitoring
- Configure error alerts
- Monitor performance metrics
- Track user analytics

## 🎯 Best Practices

1. **Version Control**
   - Tag releases
   - Keep commit history clean
   - Use semantic versioning

2. **Environment Management**
   - Separate dev/staging/prod environments
   - Use environment-specific configurations
   - Document all environment variables

3. **Security**
   - Regular security audits
   - Keep dependencies updated
   - Use HTTPS everywhere
   - Implement rate limiting

4. **Performance**
   - Monitor bundle sizes
   - Optimize images
   - Use CDN for static assets
   - Implement caching strategies

---

**Happy Deploying! 🚀**
