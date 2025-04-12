const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all care logs
router.get('/', (req, res) => {
  console.log('📥 GET request received for care logs');

  db.query('SELECT * FROM care_logs ORDER BY timestamp DESC', (err, results) => {
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

// Add a new care log
router.post('/', (req, res) => {
  const { message } = req.body;
  console.log('📤 POST request to add care log:', message);

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const timestamp = new Date(); // Automatically sets current timestamp

  db.query(
    'INSERT INTO care_logs (message, timestamp) VALUES (?, ?)',
    [message, timestamp],
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
