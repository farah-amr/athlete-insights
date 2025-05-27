# Athlete Performance Tracker

A full-stack web application for managing athletes, uploading training videos, and tracking performance metrics. Built with React, Node.js, Express, and SQLite.

## Features

### Athlete Management
- Create, update, delete athletes (name, sport, age, unique ID)
- List all athletes with basic stats

### Video Upload & Tagging
- Upload .mp4 or .mov files
- Tag athletes to each video
- Store metadata: upload date, duration, status
- Simulate status: "Processing" → "Complete" after 10 seconds
- View embedded video previews

### Performance Metrics
- Add metrics like "Sprint Time", "Jump Height" per athlete/video
- Show metrics with timestamp and video context

### Dashboard View
- See all athletes with recent videos and metrics
- Filter by sport or date range

### Admin Authentication
- Simple login system using hardcoded credentials
- Only logged-in admins can access app features

## Tech Stack

**Frontend:**
- React
- React Router DOM
- Material UI

**Backend:**
- Node.js with Express
- SQLite
- Multer for file uploads

## Folder Structure

<pre>
athlete-insights/
├── backend/
│   ├── app.js
│   ├── db.js
│   └── routes/
│       ├── athleteRoutes.js
│       ├── videoRoutes.js
│       ├── metricsRoutes.js
│       ├── dashboardRoutes.js
│       └── authRoutes.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── AthleteForm.jsx
│       │   ├── VideoUpload.jsx
│       │   ├── MetricsForm.jsx
│       │   ├── Dashboard.jsx
│       │   └── Login.jsx
│       └── App.js
</pre>

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/athlete-insights.git
cd athlete-insights


### 2. Run the Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Run the Frontend

```bash
cd frontend
npm install
npm start
```

### 4. Admin Credentials
Username: admin
Password: admin123

## Notes

- Videos are stored locally in `backend/uploads/`
- The video status is simulated to change from "Processing" to "Complete" after 10 seconds
- Authentication is handled via localStorage
- You can access the dashboard at `http://localhost:3000`

## Developed By

Farah Amr Abdalla
