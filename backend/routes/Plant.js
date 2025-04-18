const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authenticate');

// ✅ Get all plants for the logged-in user
// Fetch all plants for the user
router.get('/', authenticate, (req, res) => {
  const userId = req.userId;

  console.log('📥 GET request received for plants');

  db.query('SELECT * FROM plants WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching plants:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log('✅ Plants fetched:', results);
    res.json(results);
  });
});

// ✅ Add a new plant for the user
router.post('/', authenticate, (req, res) => {
  const { name, watering_frequency, sunlight_requirement, fertilizing_frequency } = req.body;
  const userId = req.userId;

  if (!name || !watering_frequency || !sunlight_requirement || !fertilizing_frequency) {
    return res.status(400).json({ message: "All fields are required" });
  }

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

// Fetch reminders for watering and fertilizing
router.get('/reminders', authenticate, (req, res) => {
  const userId = req.userId;
  console.log('📥 Received request for reminders for userId:', userId);

  db.query(
    `SELECT id, name, last_watered, watering_frequency, last_fertilized, fertilizing_frequency 
     FROM plants WHERE user_id = ?`, 
    [userId],
    (err, results) => {
      if (err) {
        console.error('❌ Error fetching reminders:', err);
        return res.status(500).json({ message: 'Error fetching reminders' });
      }

      console.log('✅ Fetched reminders:', results);
      const now = new Date();

      // Function to parse frequency like '1 day', '2 weeks'
      const parseFrequency = (freq) => {
        if (!freq) return null;
        const parts = freq.toLowerCase().split(' ');
        const num = parseInt(parts[0]);
        if (isNaN(num)) return null;

        if (parts[1].startsWith('day')) return num;
        if (parts[1].startsWith('week')) return num * 7; // Convert to days
        if (parts[1].startsWith('month')) return num * 30; // Convert to days
        return null;
      };

      // Check if the plant is due for watering or fertilizing
      const isDue = (lastDate, freqDays) => {
        if (!lastDate) return true; // If no last date, consider it as due
        const last = new Date(lastDate);
        const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24)); // Convert to days
        return diffDays >= freqDays;
      };

      const duePlants = [];

      results.forEach((plant) => {
        const waterFreqDays = parseFrequency(plant.watering_frequency);
        const fertFreqDays = parseFrequency(plant.fertilizing_frequency);

        // Check if the plant needs watering or fertilizing
        const needsWater = waterFreqDays !== null && isDue(plant.last_watered, waterFreqDays);
        const needsFertilizer = fertFreqDays !== null && isDue(plant.last_fertilized, fertFreqDays);

        // If the plant needs watering or fertilizing, add it to the duePlants list
        if (needsWater || needsFertilizer) {
          duePlants.push({
            id: plant.id,
            name: plant.name,
            needsWater,
            needsFertilizer
          });

          // Automatically update last watered and fertilized dates when due
          if (needsWater) {
            db.query(
              'UPDATE plants SET last_watered = ? WHERE id = ?',
              [now, plant.id],
              (err) => {
                if (err) {
                  console.error('❌ Error updating last watered:', err);
                } else {
                  console.log(`✅ Updated last watered for ${plant.name}`);
                }
              }
            );
          }

          if (needsFertilizer) {
            db.query(
              'UPDATE plants SET last_fertilized = ? WHERE id = ?',
              [now, plant.id],
              (err) => {
                if (err) {
                  console.error('❌ Error updating last fertilized:', err);
                } else {
                  console.log(`✅ Updated last fertilized for ${plant.name}`);
                }
              }
            );
          }
        }
      });

      res.status(200).json(duePlants);
    }
  );
});


module.exports = router;
