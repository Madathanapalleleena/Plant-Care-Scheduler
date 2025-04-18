// reminder.js
const express = require('express');
const db = require('./db'); // MySQL connection

const router = express.Router();

// Add a reminder
router.post('/add', (req, res) => {
    const { user_id, plant_id, reminder_type, reminder_date } = req.body;
    db.query('INSERT INTO reminders (user_id, plant_id, reminder_type, reminder_date) VALUES (?, ?, ?, ?)', 
        [user_id, plant_id, reminder_type, reminder_date], (err, result) => {
        if (err) return res.status(500).send('Error setting reminder');
        res.status(201).send('Reminder set successfully');
    });
});

// Get reminders for a user
router.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    db.query('SELECT * FROM reminders WHERE user_id = ?', [user_id], (err, result) => {
        if (err) return res.status(500).send('Error fetching reminders');
        res.json(result);
    });
});
// In reminder.js file, when a reminder is due, send an email:
const nodemailer = require('nodemailer');

async function sendReminderEmail(userEmail, reminderType, plantName) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: userEmail,
        subject: `Plant Care Reminder: ${reminderType}`,
        text: `It's time to ${reminderType} your plant: ${plantName}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Error sending reminder email:', error);
    }
}

module.exports = router;
