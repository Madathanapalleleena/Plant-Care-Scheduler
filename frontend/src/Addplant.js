import React, { useState } from 'react';
import axios from 'axios';

const Addplant = () => {
  const [plantName, setPlantName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('');
  const [sunlightRequirement, setSunlightRequirement] = useState('');
  const [fertilizingFrequency, setFertilizingFrequency] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlant = {
      name: plantName,
      watering_frequency: wateringFrequency,
      sunlight_requirement: sunlightRequirement,
      fertilizing_frequency: fertilizingFrequency,
    };

    try {
      await axios.post('http://localhost:5000/api/plants', newPlant);
      alert('Plant added successfully');
      setPlantName('');
      setWateringFrequency('');
      setSunlightRequirement('');
      setFertilizingFrequency('');
    } catch (err) {
      console.error(err);
      alert('Error adding plant');
    }
  };

  return (
    <div>
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Plant Name"
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Watering Frequency"
          value={wateringFrequency}
          onChange={(e) => setWateringFrequency(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sunlight Requirement"
          value={sunlightRequirement}
          onChange={(e) => setSunlightRequirement(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fertilizing Frequency"
          value={fertilizingFrequency}
          onChange={(e) => setFertilizingFrequency(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
};

export default Addplant;
