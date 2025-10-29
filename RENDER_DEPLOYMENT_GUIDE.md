# 🚀 Render Deployment - Step by Step Guide

## Prerequisites ✅
- [x] GitHub repository pushed with all code
- [x] MongoDB Atlas cluster created and seeded
- [x] Connection string ready: `mongodb+srv://new_user:pass@cluster0.god3gyl.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority&appName=Cluster0`

---

## Step 1: Sign Up / Login to Render

1. **Go to Render:**
   - Visit: https://dashboard.render.com

2. **Sign Up / Login:**
   - Click **"Get Started"** or **"Sign In"**
   - Choose **"Sign in with GitHub"** (Recommended - fastest)
   - Authorize Render to access your GitHub account
   - Allow Render to access your repositories

---

## Step 2: Deploy Using Blueprint

### 2.1 Start Blueprint Deployment

1. **Click "New +"** button (top right)
2. Select **"Blueprint"** from the dropdown

### 2.2 Connect Repository

1. **Select Repository:**
   - Find and click: `MERN-Stack-Sales-Analytics-Dashboard`
   - If you don't see it, click **"Configure account"** and grant access

2. **Blueprint Detected:**
   - Render will automatically detect your `render.yaml` file
   - You'll see a preview of services to be created:
     - ✅ `mern-sales-dashboard-backend` (Web Service)
     - ✅ `mern-sales-dashboard-frontend` (Web Service)

3. **Service Group Name:**
   - Use default or change to: `sales-dashboard`
   - Click **"Apply"**

### 2.3 Wait for Initial Setup

- Render will create both services
- This takes about 30-60 seconds
- You'll see both services listed in your dashboard

---

## Step 3: Configure Backend Service

### 3.1 Access Backend Service

1. Click on **"mern-sales-dashboard-backend"** service
2. Go to **"Environment"** tab (left sidebar)

### 3.2 Add Environment Variables

Click **"Add Environment Variable"** and add:

**Variable 1:**
- Key: `MONGO_URI`
- Value: `mongodb+srv://new_user:pass@cluster0.god3gyl.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority&appName=Cluster0`
- Click **"Save Changes"**

**Note:** The other variables (`PORT`, `NODE_ENV`) are already set in `render.yaml`

### 3.3 Deploy Backend

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Or wait for auto-deploy to start
3. Monitor the **"Logs"** tab to see build progress

**Build will take 5-10 minutes for first deployment**

### 3.4 Get Backend URL

Once deployed successfully:
1. You'll see status change to **"Live"** (green)
2. Copy the backend URL (looks like):
   ```
   https://mern-sales-dashboard-backend-xxxx.onrender.com
   ```
3. **Save this URL** - you'll need it for frontend!

---

## Step 4: Configure Frontend Service

### 4.1 Access Frontend Service

1. Go back to Dashboard
2. Click on **"mern-sales-dashboard-frontend"** service
3. Go to **"Environment"** tab

### 4.2 Add Environment Variable

Click **"Add Environment Variable"**:

**Variable:**
- Key: `REACT_APP_BACKEND_URL`
- Value: `https://mern-sales-dashboard-backend-xxxx.onrender.com` (your actual backend URL from Step 3.4)
- Click **"Save Changes"**

### 4.3 Deploy Frontend

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Monitor the **"Logs"** tab

**Build will take 10-15 minutes (React build takes time)**

### 4.4 Get Frontend URL

Once deployed:
1. Status changes to **"Live"** (green)
2. Your frontend URL:
   ```
   https://mern-sales-dashboard-frontend-xxxx.onrender.com
   ```

---

## Step 5: Update Backend CORS (Important!)

### 5.1 Add Frontend URL to Backend

1. Go back to **backend service**
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**

**Variable:**
- Key: `FRONTEND_URL`
- Value: `https://mern-sales-dashboard-frontend-xxxx.onrender.com` (your frontend URL)
- Click **"Save Changes"**

### 5.2 Redeploy Backend

1. Click **"Manual Deploy"** → **"Deploy latest commit"**
2. Wait for deployment to complete (2-3 minutes)

---

## Step 6: Seed Production Database

### 6.1 Visit Seed Endpoint

1. Open your browser
2. Visit: `https://your-backend-url.onrender.com/api/seed`
3. You should see:
   ```json
   {"message":"Database seeded successfully","count":60}
   ```

### 6.2 Verify Data

Visit: `https://your-backend-url.onrender.com/api/statistics`

You should see JSON with sales data for all months.

---

## Step 7: Test Your Application

### 7.1 Open Frontend

1. Visit: `https://your-frontend-url.onrender.com`
2. Application should load with:
   - Statistics cards showing data
   - Bar charts with sales data
   - Pie chart with categories
   - Transactions table with products

### 7.2 Test Features

- [x] Month selector works
- [x] Statistics update when month changes
- [x] Charts display data
- [x] Transactions table shows products
- [x] Search functionality works
- [x] Pagination works
- [x] Dark mode toggle works

---

## Step 8: Troubleshooting Common Issues

### Issue 1: Backend Build Failed

**Check Logs:**
1. Go to backend service → Logs tab
2. Look for error messages

**Common fixes:**
- Ensure all dependencies are in `package.json`
- Check Dockerfile syntax
- Verify Node.js version compatibility

### Issue 2: Frontend Build Failed

**Common fixes:**
- Check if `REACT_APP_BACKEND_URL` is set
- Verify Dockerfile paths are correct
- Check nginx.conf syntax

### Issue 3: "Network Error" in Frontend

**Causes:**
- Backend not running (check backend service status)
- Wrong `REACT_APP_BACKEND_URL`
- CORS issue (add `FRONTEND_URL` to backend)

**Fix:**
1. Verify backend is "Live"
2. Check environment variables are correct
3. Redeploy both services

### Issue 4: Database Connection Error

**Causes:**
- Wrong MongoDB connection string
- MongoDB Atlas IP whitelist not set to `0.0.0.0/0`
- Wrong username/password

**Fix:**
1. Verify `MONGO_URI` in backend environment
2. Check MongoDB Atlas Network Access
3. Test connection string locally first

### Issue 5: Images Not Loading

**This is normal!**
- External CDN (fakestoreapi.com) blocks requests
- Gradient placeholders will show instead
- This is expected behavior

---

## Step 9: Important Notes - Free Tier

### Render Free Tier Limitations:

⚠️ **Services Spin Down After 15 Minutes of Inactivity**
- First request after spin-down takes 30-60 seconds (cold start)
- This is normal for free tier

💡 **To Keep Services Active:**
- Upgrade to paid plan ($7/month per service)
- Use uptime monitoring service (UptimeRobot, etc.)

📊 **Free Tier Includes:**
- 750 hours/month per service
- 512 MB RAM per service
- Shared CPU
- 100 GB bandwidth/month

---

## Step 10: Update GitHub Repository (Optional)

Add deployment URLs to your README:

```markdown
## 🌐 Live Demo

- **Frontend:** https://your-frontend.onrender.com
- **Backend API:** https://your-backend.onrender.com
- **MongoDB:** Atlas Cloud Database
```

---

## Quick Reference

### Your Deployment URLs:
```
Backend:  https://mern-sales-dashboard-backend-xxxx.onrender.com
Frontend: https://mern-sales-dashboard-frontend-xxxx.onrender.com
```

### Environment Variables Summary:

**Backend:**
- `PORT`: 5000 (from render.yaml)
- `MONGO_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: production (from render.yaml)
- `FRONTEND_URL`: Your frontend Render URL

**Frontend:**
- `REACT_APP_BACKEND_URL`: Your backend Render URL

---

## Success Checklist ✅

Before marking deployment as complete:

- [ ] Backend service shows "Live" status
- [ ] Frontend service shows "Live" status
- [ ] Backend environment variables set (MONGO_URI, FRONTEND_URL)
- [ ] Frontend environment variable set (REACT_APP_BACKEND_URL)
- [ ] Database seeded (60 transactions)
- [ ] Frontend loads in browser
- [ ] Statistics cards display data
- [ ] Charts render correctly
- [ ] Transactions table shows products
- [ ] Search works
- [ ] Pagination works
- [ ] Dark mode toggles
- [ ] Month selector updates data
- [ ] No console errors (except image loading - that's normal)

---

## Need Help?

**Render Documentation:**
- https://render.com/docs

**Check Service Logs:**
- Dashboard → Service → Logs tab

**Community Support:**
- Render Community: https://community.render.com/

**GitHub Issues:**
- Create an issue in your repository

---

**Deployment Guide Created:** October 29, 2025  
**For:** MERN Sales Analytics Dashboard  
**Platform:** Render.com with Docker & Blueprint
