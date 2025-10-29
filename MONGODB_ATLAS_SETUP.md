# Complete MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. **Visit MongoDB Atlas:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click **"Try Free"** or **"Start Free"** button

2. **Sign Up Options:**
   - **Option A:** Sign up with Google (Fastest)
   - **Option B:** Sign up with email
     - Enter your email address
     - Create a strong password
     - Click "Create your Atlas account"

3. **Verify Email:**
   - Check your email inbox
   - Click the verification link
   - You'll be redirected to Atlas dashboard

## Step 2: Create Your First Cluster

1. **Welcome Screen:**
   - You'll see "Create a deployment" or "Build your first database"
   - Click **"Create"** or **"Build a database"**

2. **Choose Deployment Type:**
   - Select **"M0 FREE"** (Shared cluster)
   - This gives you:
     - 512 MB Storage
     - Shared RAM
     - Free forever
     - Perfect for development

3. **Select Cloud Provider & Region:**
   - **Provider:** Choose any (AWS, Google Cloud, or Azure)
   - **Region:** Choose closest to you or choose a region with "FREE TIER AVAILABLE" badge
   - Recommended regions:
     - US: `us-east-1` (N. Virginia)
     - Europe: `eu-west-1` (Ireland)
     - Asia: `ap-south-1` (Mumbai)
   - Click **"Create Deployment"** or **"Create Cluster"**

4. **Security Setup (Username & Password):**
   - A popup will appear for security setup
   - **Create Database User:**
     - Username: `admin` (or any name you prefer)
     - Password: Click "Autogenerate Secure Password" or create your own
     - **IMPORTANT:** Copy and save this password somewhere safe!
     - Example: `admin123` (use something more secure)
   - Click **"Create Database User"**

5. **Network Access:**
   - In the same popup or next step:
   - **Add entries to your IP Access List:**
     - Choose **"My Local Environment"**
     - It will show your current IP
     - **IMPORTANT:** Change this to `0.0.0.0/0` (Allow access from anywhere)
     - This is needed for Render to connect
     - Description: "Allow from anywhere"
   - Click **"Add Entry"**
   - Click **"Finish and Close"**

6. **Wait for Cluster Creation:**
   - You'll see "Creating your cluster..."
   - This takes 1-3 minutes
   - Status will change to "Active" when ready

## Step 3: Configure Network Access (If not done in Step 2)

1. **Navigate to Network Access:**
   - On left sidebar, click **"Network Access"** (under SECURITY)

2. **Add IP Address:**
   - Click **"+ ADD IP ADDRESS"** button
   - Choose **"ALLOW ACCESS FROM ANYWHERE"**
   - This automatically fills: `0.0.0.0/0`
   - Comment: "Render deployment access"
   - Click **"Confirm"**

3. **Verify:**
   - You should see `0.0.0.0/0` in the list with "Active" status

## Step 4: Create Database User (If not done in Step 2)

1. **Navigate to Database Access:**
   - On left sidebar, click **"Database Access"** (under SECURITY)

2. **Add New Database User:**
   - Click **"+ ADD NEW DATABASE USER"**
   
3. **User Details:**
   - **Authentication Method:** Password
   - **Username:** `admin` (or your preferred name)
   - **Password:** 
     - Click "Autogenerate Secure Password" or
     - Enter custom password (min 8 characters)
     - **SAVE THIS PASSWORD!** You'll need it for connection string
   
4. **Database User Privileges:**
   - Select **"Built-in Role"**
   - Choose **"Read and write to any database"**
   - (Or use "Atlas admin" for full access)

5. **Additional Settings:**
   - Leave "Restrict Access to Specific Clusters/Federated Database Instances" unchecked
   - Leave "Temporary User" unchecked
   - Click **"Add User"**

## Step 5: Get Connection String

1. **Navigate to Database:**
   - On left sidebar, click **"Database"** (under DEPLOYMENT)
   - You'll see your cluster (usually named Cluster0)

2. **Connect to Cluster:**
   - Click **"Connect"** button on your cluster

3. **Choose Connection Method:**
   - Select **"Drivers"** (for application connection)

4. **Select Driver & Version:**
   - Driver: **Node.js**
   - Version: **5.5 or later** (or latest)

5. **Copy Connection String:**
   - You'll see a connection string like:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Modify Connection String:**
   - Replace `<password>` with your actual password
   - Add database name before the `?`
   - Final format:
   ```
   mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority
   ```

   **Example:**
   ```
   mongodb+srv://admin:admin123@cluster0.ab1cd.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority
   ```

7. **Save This String:**
   - Copy it to a text file
   - You'll need it for Render deployment

## Step 6: Test Connection (Optional but Recommended)

1. **Update Local .env File:**
   ```bash
   cd "d:\Projects\MERN Stack Sales Analytics Dashboard\mern-coding-challenge-backend"
   ```

2. **Edit .env file** (create if it doesn't exist):
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

3. **Test Backend Connection:**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   Server running on port 5000
   MongoDB connected
   ```

4. **Seed the Database:**
   - Open browser: http://localhost:5000/api/seed
   - You should see: "Data seeded successfully"

5. **Verify Data in Atlas:**
   - Go back to Atlas dashboard
   - Click "Database" → "Browse Collections"
   - You should see:
     - Database: `mern_coding_challenge`
     - Collection: `transactions`
     - 60 documents

## Step 7: Troubleshooting

### Issue: "Authentication failed"
**Solution:**
- Verify username and password are correct
- Check if password contains special characters (encode them in URL)
- Example: `@` becomes `%40`, `#` becomes `%23`

### Issue: "IP not whitelisted"
**Solution:**
- Go to Network Access
- Ensure `0.0.0.0/0` is in the list and "Active"

### Issue: "Unable to connect to server"
**Solution:**
- Check your internet connection
- Verify cluster is "Active" status
- Try a different region when creating cluster

### Issue: "Database not found"
**Solution:**
- The database is created automatically on first connection
- Just make sure database name is in connection string

## Your MongoDB Atlas Checklist

Before proceeding to Render deployment, ensure:

- [ ] MongoDB Atlas account created
- [ ] M0 Free cluster deployed and "Active"
- [ ] Database user created with username and password
- [ ] Password saved securely
- [ ] Network access set to `0.0.0.0/0`
- [ ] Connection string copied and modified with:
  - [ ] Actual password (replaced `<password>`)
  - [ ] Database name added (`mern_coding_challenge`)
- [ ] Connection tested locally (optional)
- [ ] Database seeded with sample data (optional)

## Connection String Format Reference

**Template:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?retryWrites=true&w=majority
```

**Your String (example):**
```
mongodb+srv://admin:admin123@cluster0.ab1cd.mongodb.net/mern_coding_challenge?retryWrites=true&w=majority
```

**Parts Explained:**
- `admin` - Your username
- `admin123` - Your password
- `cluster0.ab1cd.mongodb.net` - Your cluster URL (auto-generated)
- `mern_coding_challenge` - Your database name

## Special Characters in Password

If your password contains special characters, encode them:

| Character | Encoded |
|-----------|---------|
| @         | %40     |
| :         | %3A     |
| /         | %2F     |
| #         | %23     |
| ?         | %3F     |
| &         | %26     |
| =         | %3D     |

**Example:**
- Password: `myPass@123#`
- Encoded: `myPass%40123%23`

## Next Steps

Once you have your MongoDB connection string:

1. ✅ MongoDB Atlas is ready
2. 🚀 Proceed to Render deployment
3. 📝 Use the connection string as `MONGO_URI` environment variable in Render

---

## Quick Command Reference

### Start Backend Locally
```bash
cd "d:\Projects\MERN Stack Sales Analytics Dashboard\mern-coding-challenge-backend"
npm start
```

### Seed Database
```bash
# Visit in browser:
http://localhost:5000/api/seed
```

### Check Statistics
```bash
# Visit in browser:
http://localhost:5000/api/statistics
```

---

**Need Help?**
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Support: https://support.mongodb.com/
- Connection String Guide: https://docs.mongodb.com/manual/reference/connection-string/

---

**Created:** October 29, 2025
**For:** MERN Sales Analytics Dashboard Deployment
