import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/plants/reminders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReminders(res.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error('Error fetching reminders:', err);
        setError('Failed to load reminders. Please try again later.');
        setLoading(false); // Set loading to false even when there's an error
      }
    };

    fetchReminders();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading reminders...</p>; // Loading state
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🌿 Reminders</h2>
      {error ? (
        <p className="text-red-500">{error}</p> // Show error message if any
      ) : reminders.length === 0 ? (
        <p className="text-gray-600">No reminders at the moment!</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((plant) => (
            <li
              key={plant.id}
              className="border border-green-300 p-4 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold text-green-800">{plant.name}</h3>
              <ul className="list-disc ml-6 mt-2 text-green-600">
                {plant.needsWater && <li>💧 Needs watering</li>}
                {plant.needsFertilizer && <li>🌱 Needs fertilizing</li>}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminder;
