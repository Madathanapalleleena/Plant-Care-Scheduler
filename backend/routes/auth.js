const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // adjust if different
const router = express.Router();
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;  // keep it secret

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed], (err, result) => {
    if (err) return res.status(500).send('User already exists or DB error');
    res.status(200).send('Registered successfully');
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid credentials');
    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(401).send('Invalid credentials');
    const token = jwt.sign({ userId: results[0].id }, SECRET_KEY);
    res.json({ token });
  });
});

module.exports = router;
