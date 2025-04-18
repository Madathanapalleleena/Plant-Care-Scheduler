// routes/Plant.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all plants
router.get('/', (req, res) => {
  db.query('SELECT * FROM plants', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const updated = results.map(plant => {
      const now = new Date();
      const lastWatered = new Date(plant.last_watered || now); // optional column
      const nextWater = new Date(lastWatered);
      nextWater.setDate(nextWater.getDate() + parseInt(plant.watering_frequency));

      const nextFertilizer = new Date(lastWatered);
      nextFertilizer.setDate(nextFertilizer.getDate() + parseInt(plant.fertilizing_frequency));

      return {
        ...plant,
        next_watering: nextWater,
        next_fertilizing: nextFertilizer
      };
    });

    res.json(updated);
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
