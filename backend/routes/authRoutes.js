const express = require('express');
const router = express.Router();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
