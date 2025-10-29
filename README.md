# MERN Stack Sales Analytics Dashboard 🚀

A modern, full-stack sales analytics dashboard with stunning UI, dark mode, and comprehensive data visualization.

## ✨ Features

- **🎨 Modern UI**: Glassmorphism design with gradient accents and smooth animations
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📊 Interactive Charts**: Bar charts and pie charts with Chart.js
- **📱 Responsive Design**: Works perfectly on all devices
- **🔍 Search & Filter**: Search transactions and filter by month
- **📦 Image Proxy**: Handles external CDN images seamlessly
- **💾 MongoDB Integration**: Efficient data storage and retrieval
- **🚀 Fast Performance**: Optimized build with lazy loading

## 🛠️ Tech Stack

**Frontend:**
- React 18.3.1
- Chart.js 4.4.4
- Axios 1.7.7
- CSS3 with glassmorphism effects

**Backend:**
- Node.js with Express 4.21.0
- MongoDB with Mongoose 8.7.0
- Axios for image proxying
- CORS enabled

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aniket-404/MERN-Stack-Sales-Analytics-Dashboard.git
cd MERN-Stack-Sales-Analytics-Dashboard
```

2. **Setup Backend**
```bash
cd mern-coding-challenge-backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm start
```

3. **Setup Frontend**
```bash
cd ../mern-coding-challenge-frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm start
```

4. **Seed Database**
Visit: `http://localhost:5000/api/seed`

5. **Access Application**
Open: `http://localhost:3000`

## 🌐 Deployment

### Deploy to Render (Recommended)

This project is configured for easy deployment to Render using Docker and Blueprint.

**Quick Deploy:**
1. Push to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Blueprint"
4. Connect your repository
5. Set environment variables:
   - Backend: `MONGO_URI` (your MongoDB connection string)
   - Frontend: `REACT_APP_BACKEND_URL` (your backend URL)
6. Click "Apply"

**Detailed Instructions:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_coding_challenge
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

## 📦 Project Structure

```
MERN-Stack-Sales-Analytics-Dashboard/
├── mern-coding-challenge-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── Dockerfile
│   └── server.js
├── mern-coding-challenge-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── App.css
│   ├── Dockerfile
│   └── nginx.conf
├── render.yaml
├── DEPLOYMENT.md
└── README.md
```

## 🎯 API Endpoints

- `GET /api/transactions` - Get paginated transactions
- `GET /api/statistics` - Get sales statistics
- `GET /api/bar-chart` - Get bar chart data
- `GET /api/pie-chart` - Get category distribution
- `GET /api/seed` - Seed database with initial data
- `GET /api/image-proxy` - Proxy external images

## 🎨 UI Features

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradients**: Purple, pink, and blue gradient themes
- **Animations**: Smooth transitions and hover effects
- **Dark Mode**: System-aware theme switching
- **Loading States**: Skeleton loaders and spinners
- **Responsive**: Mobile-first design approach

## � Screenshots

![stat table](https://github.com/user-attachments/assets/a8f29ccb-59a2-4d6b-8940-21330e0650a6)

## Transactions Table

![transa](https://github.com/user-attachments/assets/acb17bc8-b1a7-43fa-bfa8-30028dff1001)

## Sales Statistic Graph

![bar](https://github.com/user-attachments/assets/9d523f69-2c1d-438f-a164-d50bc23c2ca7)
