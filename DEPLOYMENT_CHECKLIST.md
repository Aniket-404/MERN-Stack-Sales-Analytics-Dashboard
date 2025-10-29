# Render Deployment Checklist

## Pre-Deployment ✅

- [x] Docker configurations created
- [x] Environment variable examples added
- [x] CORS configured for production
- [x] Image proxy configured
- [x] Build tested locally
- [x] All commits pushed to GitHub

## MongoDB Setup

- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create free cluster (M0 tier)
- [ ] Create database user with password
- [ ] Whitelist all IPs: `0.0.0.0/0`
- [ ] Copy connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/mern_coding_challenge`)

## Render Deployment Steps

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Deploy with Blueprint

1. Go to https://dashboard.render.com
2. Sign up/Login (can use GitHub account)
3. Click **"New +"** → **"Blueprint"**
4. **Connect your GitHub repository**: `MERN-Stack-Sales-Analytics-Dashboard`
5. Render will detect `render.yaml` automatically
6. **Review services** (should show 2 services):
   - `mern-sales-dashboard-backend`
   - `mern-sales-dashboard-frontend`

### 3. Configure Environment Variables

**For Backend Service:**
- Click on the backend service
- Add Environment Variable:
  - Key: `MONGO_URI`
  - Value: `mongodb+srv://your-username:your-password@cluster.mongodb.net/mern_coding_challenge`
  
**For Frontend Service:**
- Click on the frontend service
- Add Environment Variable:
  - Key: `REACT_APP_BACKEND_URL`
  - Value: `https://mern-sales-dashboard-backend.onrender.com` (use your actual backend URL)

### 4. Apply and Deploy

1. Click **"Apply"** button
2. Wait for services to build (10-15 minutes for first deploy)
3. Monitor build logs for any errors

## Post-Deployment

### 1. Verify Backend
- [ ] Visit backend URL: `https://your-backend.onrender.com/api/statistics`
- [ ] Should return JSON data (might be empty initially)

### 2. Seed Database
- [ ] Visit: `https://your-backend.onrender.com/api/seed`
- [ ] Wait for "Data seeded successfully" message
- [ ] Should see 60 records added

### 3. Verify Frontend
- [ ] Visit frontend URL: `https://your-frontend.onrender.com`
- [ ] Check if all components load
- [ ] Test month selection
- [ ] Verify charts display data
- [ ] Test dark mode toggle
- [ ] Check transactions table
- [ ] Test search functionality
- [ ] Test pagination

### 4. Update Frontend Environment Variable
- [ ] Go to frontend service settings
- [ ] Update `REACT_APP_BACKEND_URL` with actual backend URL if needed
- [ ] Trigger manual redeploy

## Testing Checklist

- [ ] Homepage loads without errors
- [ ] Statistics cards show correct data
- [ ] Bar chart displays monthly sales
- [ ] Pie chart shows category distribution
- [ ] Transactions table loads with data
- [ ] Search functionality works
- [ ] Pagination works (Previous/Next buttons)
- [ ] Month filter updates all components
- [ ] Dark mode toggle switches theme
- [ ] Images load (or show gradient placeholders)
- [ ] Responsive design works on mobile

## Troubleshooting

### Backend Won't Start
1. Check Render logs
2. Verify `MONGO_URI` is set correctly
3. Check MongoDB Atlas IP whitelist
4. Ensure database user has correct permissions

### Frontend Shows "Network Error"
1. Check `REACT_APP_BACKEND_URL` is correct
2. Ensure backend service is running
3. Check CORS configuration
4. Verify backend URL is accessible

### Database Connection Failed
1. Test connection string locally first
2. Ensure password doesn't contain special characters (or encode them)
3. Verify cluster is running
4. Check network access settings in Atlas

### Images Not Loading
- This is expected if fakestoreapi.com blocks requests
- Gradient placeholders will show instead
- Image proxy is working correctly

## Performance Notes

**Free Tier Limitations:**
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- Limited to 750 hours/month per service

**To Avoid Cold Starts:**
- Upgrade to paid plan ($7/month per service)
- Use external uptime monitoring (like UptimeRobot)

## URLs Reference

After deployment, save your URLs:

```
Backend: https://mern-sales-dashboard-backend-XXXX.onrender.com
Frontend: https://mern-sales-dashboard-frontend-XXXX.onrender.com
MongoDB: mongodb+srv://username:password@cluster.mongodb.net/mern_coding_challenge
```

## Success Indicators

✅ Both services show "Live" status in Render dashboard
✅ Backend API returns JSON data
✅ Frontend loads and displays UI
✅ Data is populated after seeding
✅ All interactive features work

---

**Need Help?**
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
- Review Render logs for errors
- Check GitHub repository issues
- Render Documentation: https://render.com/docs
