const express = require('express');
const multer = require('multer');
const db = require('../db');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Upload video and tag athletes
router.post('/upload', upload.single('video'), (req, res) => {
  const filePath = req.file.path;
  const { athleteIds } = req.body; // Expect comma-separated list: "1,2,3"
  const uploadDate = new Date().toISOString();
  const status = "Processing";
  const duration = "00:45"; // mock duration value

  // Insert video with mock duration
  db.run(
    "INSERT INTO videos (file_path, upload_date, status, duration) VALUES (?, ?, ?, ?)",
    [filePath, uploadDate, status, duration],
    function (err) {
      if (err) return res.status(500).json(err);

      const videoId = this.lastID;
      const athleteIdArray = athleteIds.split(',').map(id => parseInt(id.trim()));

      // Link video to each athlete
      athleteIdArray.forEach((athleteId) => {
        db.run("INSERT INTO athlete_videos (athlete_id, video_id) VALUES (?, ?)", [athleteId, videoId]);
      });

      // Respond immediately
      res.json({ videoId, filePath, status, duration, taggedAthletes: athleteIdArray });

      // Simulate background processing: update status to "Complete" after 10 sec
      setTimeout(() => {
        db.run("UPDATE videos SET status = 'Complete' WHERE id = ?", [videoId], (err) => {
          if (err) {
            console.error("Failed to update status for video:", videoId);
          } else {
            console.log(`Video ID ${videoId} marked as Complete.`);
          }
        });
      }, 10000); // 10 seconds
    }
  );
});

module.exports = router;
