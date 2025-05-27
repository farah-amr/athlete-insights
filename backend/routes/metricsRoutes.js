const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new metric
router.post('/', (req, res) => {
  const { athlete_id, video_id, metric_type, value } = req.body;
  const timestamp = new Date().toISOString();

  db.run(
    "INSERT INTO metrics (athlete_id, video_id, metric_type, value, timestamp) VALUES (?, ?, ?, ?, ?)",
    [athlete_id, video_id, metric_type, value, timestamp],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, athlete_id, video_id, metric_type, value, timestamp });
    }
  );
});

// Get all metrics for an athlete
router.get('/athlete/:athleteId', (req, res) => {
  const athleteId = req.params.athleteId;
  db.all(
    "SELECT * FROM metrics WHERE athlete_id = ?",
    [athleteId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

module.exports = router;
