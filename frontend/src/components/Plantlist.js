import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Plantlist() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/plants')
      .then(res => setPlants(res.data));
  }, []);
  const today = new Date();

{plants.map((plant) => {
  const needsWater = new Date(plant.next_watering) <= today;
  const needsFertilizer = new Date(plant.next_fertilizing) <= today;

  return (
    <div key={plant.id} className="relative bg-green-100 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-green-800">{plant.name}</h3>
      <p><strong>Water:</strong> {plant.watering_frequency}</p>
      <p><strong>Sunlight:</strong> {plant.sunlight_requirement}</p>
      <p><strong>Fertilizer:</strong> {plant.fertilizing_frequency}</p>

      {needsWater && (
        <p className="text-red-500 mt-2">🚨 Needs Watering Today!</p>
      )}
      {needsFertilizer && (
        <p className="text-yellow-600">🌱 Fertilizer Due!</p>
      )}
    </div>
  );
})}

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">🌼 Plant List</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {plants.map((plant) => (
          <div key={plant.id} className="bg-green-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-bold text-green-800">{plant.name}</h3>
            <p><strong>Water:</strong> {plant.watering_frequency}</p>
            <p><strong>Sunlight:</strong> {plant.sunlight_requirement}</p>
            <p><strong>Fertilizer:</strong> {plant.fertilizing_frequency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plantlist;
