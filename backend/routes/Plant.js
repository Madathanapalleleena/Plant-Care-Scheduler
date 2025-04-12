// routes/Plant.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all plants
router.get('/', (req, res) => {
  console.log('📥 GET request received for plants');

  db.query('SELECT * FROM plants', (err, results) => {
    if (err) {
      console.error('❌ Error fetching plants:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log('✅ Plants fetched:', results);
    res.json(results); // Send the result as a response
  });
});

router.post('/', (req, res) => {
    const { name, watering_frequency, sunlight_requirement, fertilizing_frequency } = req.body;
  
    // Insert the new plant data into the database
    db.query(
      'INSERT INTO plants (name, watering_frequency, sunlight_requirement, fertilizing_frequency) VALUES (?, ?, ?, ?)',
      [name, watering_frequency, sunlight_requirement, fertilizing_frequency],
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
