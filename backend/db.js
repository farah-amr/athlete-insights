const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./athlete.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS athletes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      sport TEXT,
      age INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      file_path TEXT,
      upload_date TEXT,
      status TEXT,
      duration TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS athlete_videos (
      athlete_id INTEGER,
      video_id INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      athlete_id INTEGER,
      video_id INTEGER,
      metric_type TEXT,
      value TEXT,
      timestamp TEXT
    )
  `);
});

module.exports = db;
