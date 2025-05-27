const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const athleteRoutes = require('./routes/athleteRoutes');
app.use('/api/athletes', athleteRoutes);

const videoRoutes = require('./routes/videoRoutes');
app.use('/api/videos', videoRoutes);

const metricsRoutes = require('./routes/metricsRoutes');
app.use('/api/metrics', metricsRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
