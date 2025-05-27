const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const { sport, startDate, endDate } = req.query;

  let athleteQuery = "SELECT * FROM athletes";
  const athleteParams = [];

  if (sport) {
    athleteQuery += " WHERE sport = ?";
    athleteParams.push(sport);
  }

  db.all(athleteQuery, athleteParams, (err, athletes) => {
    if (err) return res.status(500).json(err);

    const results = [];
    let count = 0;

    if (athletes.length === 0) return res.json([]);

    athletes.forEach((athlete) => {
      db.all(
        `SELECT v.*, m.metric_type, m.value, m.timestamp
         FROM videos v
         JOIN athlete_videos av ON v.id = av.video_id
         LEFT JOIN metrics m ON v.id = m.video_id AND av.athlete_id = m.athlete_id
         WHERE av.athlete_id = ?`,
        [athlete.id],
        (err2, rows) => {
          if (err2) return res.status(500).json(err2);

          const videosMap = {};
          rows.forEach((row) => {
            const videoDate = new Date(row.upload_date);
            const inDateRange =
              (!startDate || videoDate >= new Date(startDate)) &&
              (!endDate || videoDate <= new Date(endDate));

            if (!inDateRange) return;

            if (!videosMap[row.id]) {
              videosMap[row.id] = {
                id: row.id,
                file_path: row.file_path,
                upload_date: row.upload_date,
                status: row.status,
                metrics: []
              };
            }

            if (row.metric_type) {
              videosMap[row.id].metrics.push({
                metric_type: row.metric_type,
                value: row.value,
                timestamp: row.timestamp
              });
            }
          });

          results.push({
            athlete: athlete,
            videos: Object.values(videosMap)
          });

          count++;
          if (count === athletes.length) {
            res.json(results);
          }
        }
      );
    });
  });
});

module.exports = router;
