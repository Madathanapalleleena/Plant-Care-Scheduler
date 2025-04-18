// Reminder.js
import { useState } from 'react';

function Reminder({ userId }) {
    const [plantId, setPlantId] = useState('');
    const [reminderType, setReminderType] = useState('');
    const [reminderDate, setReminderDate] = useState('');

    const handleAddReminder = async () => {
        const response = await fetch('http://localhost:5000/api/reminders/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, plant_id: plantId, reminder_type: reminderType, reminder_date: reminderDate })
        });
        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <input type="number" value={plantId} onChange={(e) => setPlantId(e.target.value)} placeholder="Plant ID" />
            <select onChange={(e) => setReminderType(e.target.value)}>
                <option value="watering">Watering</option>
                <option value="fertilizing">Fertilizing</option>
            </select>
            <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
            <button onClick={handleAddReminder}>Set Reminder</button>
        </div>
    );
}

export default Reminder;
