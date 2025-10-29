# Render Deployment Guide

This guide will help you deploy the MERN Sales Analytics Dashboard to Render using Docker and Blueprint.

## Prerequisites

1. GitHub account with this repository pushed
2. Render account (free tier available at https://render.com)
3. MongoDB Atlas account (for production database) OR use Render's MongoDB

## Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Set Up MongoDB Atlas (Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority
   ```

### Step 3: Deploy to Render using Blueprint

#### Option A: Using render.yaml (Blueprint) - RECOMMENDED

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Set the following environment variables:
   - For **backend service**:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `FRONTEND_URL`: Will be auto-set after frontend deploys
   - For **frontend service**:
     - `REACT_APP_BACKEND_URL`: Will be auto-set to backend URL
6. Click "Apply" to deploy all services

#### Option B: Manual Setup (Alternative)

If blueprint doesn't work, deploy each service manually:

**Backend:**
1. New Web Service → Connect Repository
2. Settings:
   - Name: `mern-sales-dashboard-backend`
   - Environment: `Docker`
   - Dockerfile Path: `./mern-coding-challenge-backend/Dockerfile`
   - Docker Context: `./mern-coding-challenge-backend`
   - Add Environment Variables:
     ```
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     NODE_ENV=production
     ```

**Frontend:**
1. New Web Service → Connect Repository
2. Settings:
   - Name: `mern-sales-dashboard-frontend`
   - Environment: `Docker`
   - Dockerfile Path: `./mern-coding-challenge-frontend/Dockerfile`
   - Docker Context: `./mern-coding-challenge-frontend`
   - Add Environment Variables:
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
     ```

### Step 4: Seed the Database

After deployment, seed your production database:

1. Go to your backend service URL
2. Visit: `https://your-backend-url.onrender.com/api/seed`
3. Wait for the response confirming data seeded

### Step 5: Access Your Application

- Frontend: `https://your-frontend-name.onrender.com`
- Backend API: `https://your-backend-name.onrender.com`

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_coding_challenge
NODE_ENV=production
FRONTEND_URL=https://your-frontend-name.onrender.com
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend-name.onrender.com
```

## Troubleshooting

### Build Fails
- Check Docker logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Dockerfile paths are correct

### Database Connection Issues
- Verify MongoDB connection string
- Check MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- Ensure database user has proper permissions

### CORS Errors
- Update `FRONTEND_URL` environment variable in backend
- Backend is configured to accept Render domains automatically

### Images Not Loading
- The app uses an image proxy to bypass CDN restrictions
- Placeholder images will show if external images fail

## Free Tier Limitations

Render free tier:
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- 750 hours/month of running time per service

## Upgrading to Paid Plan

For production use without spin-down:
- Upgrade to Starter plan ($7/month per service)
- Better performance and always-on availability

## Support

For issues, check:
- Render logs: Dashboard → Service → Logs
- GitHub Issues: Create an issue in the repository
- Render Docs: https://render.com/docs

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set correctly
- [ ] Both services deployed successfully
- [ ] Database seeded with initial data
- [ ] Application accessible via URL
- [ ] Dark mode toggle working
- [ ] Charts displaying data
- [ ] Transactions table showing records
- [ ] Search and pagination working

---

**Deployment Date:** October 29, 2025
**Version:** 1.0.0
