import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Plantlist = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/plants');
        setPlants(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h2>Plant List</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            {plant.name} - Watering: {plant.watering_frequency}, Sunlight: {plant.sunlight_requirement}, Fertilizing: {plant.fertilizing_frequency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plantlist;
