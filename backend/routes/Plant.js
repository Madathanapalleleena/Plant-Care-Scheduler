// routes/Plant.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authenticate');  // Import the authentication middleware

// Get all plants for the logged-in user
router.get('/', authenticate, (req, res) => {
  const userId = req.userId; // Extracted from the JWT token

  console.log('📥 GET request received for plants');

  db.query('SELECT * FROM plants WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching plants:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log('✅ Plants fetched:', results);
    res.json(results); // Send the result as a response
  });
});

// Add a new plant (associated with the logged-in user)
router.post('/', authenticate, (req, res) => {
  const { name, watering_frequency, sunlight_requirement, fertilizing_frequency } = req.body;
  const userId = req.userId; // Extracted from the JWT token

  // Validate the required fields
  if (!name || !watering_frequency || !sunlight_requirement || !fertilizing_frequency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Insert the new plant data into the database with the user_id
  db.query(
    'INSERT INTO plants (name, watering_frequency, sunlight_requirement, fertilizing_frequency, user_id) VALUES (?, ?, ?, ?, ?)',
    [name, watering_frequency, sunlight_requirement, fertilizing_frequency, userId],
    (err, result) => {
      if (err) {
        console.error('❌ Error adding plant:', err);
        return res.status(500).json({ error: err.message });
      }

      console.log('✅ Plant added:', result);
      res.status(201).json({ message: 'Plant added successfully' });
    }
  );
});

module.exports = router;
