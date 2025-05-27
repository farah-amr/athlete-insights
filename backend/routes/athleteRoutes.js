const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all athletes
router.get('/', (req, res) => {
  db.all("SELECT * FROM athletes", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Add new athlete
router.post('/', (req, res) => {
  const { name, sport, age } = req.body;
  db.run(
    "INSERT INTO athletes (name, sport, age) VALUES (?, ?, ?)",
    [name, sport, age],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, name, sport, age });
    }
  );
});
// Update athlete by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, sport, age } = req.body;

  db.run(
    "UPDATE athletes SET name = ?, sport = ?, age = ? WHERE id = ?",
    [name, sport, age, id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes > 0 });
    }
  );
});

// Delete athlete by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM athletes WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes > 0 });
  });
});

module.exports = router;
