// routes/CareLog.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authenticate');  // Import the authentication middleware

// Get all care logs for the logged-in user
router.get('/', authenticate, (req, res) => {
  const userId = req.userId; // Extracted from the JWT token

  console.log('📥 GET request received for care logs');

  db.query('SELECT * FROM care_logs WHERE user_id = ? ORDER BY timestamp DESC', [userId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching care logs:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      console.log('⚠️ No care logs found');
      return res.status(200).json([]); // Return empty array for frontend to handle
    }

    console.log('✅ Care logs fetched:', results);
    res.json(results);
  });
});

// Add a new care log (associated with the logged-in user)
router.post('/', authenticate, (req, res) => {
  const { message } = req.body;
  const userId = req.userId; // Extracted from the JWT token

  console.log('📤 POST request to add care log:', message);

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const timestamp = new Date(); // Automatically sets current timestamp

  db.query(
    'INSERT INTO care_logs (message, timestamp, user_id) VALUES (?, ?, ?)',
    [message, timestamp, userId],
    (err, result) => {
      if (err) {
        console.error('❌ Error adding care log:', err);
        return res.status(500).json({ error: err.message });
      }

      console.log('✅ Care log added:', { id: result.insertId, message, timestamp });
      res.status(201).json({ id: result.insertId, message, timestamp });
    }
  );
});

module.exports = router;
