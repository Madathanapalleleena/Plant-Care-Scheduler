import React, { useState } from 'react';
import axios from 'axios';

function Addplant() {
  const [form, setForm] = useState({
    name: '',
    watering_frequency: '',
    sunlight_requirement: '',
    fertilizing_frequency: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/plants', form)
      .then(() => {
        alert('🌿 Plant added successfully!');
        setForm({
          name: '',
          watering_frequency: '',
          sunlight_requirement: '',
          fertilizing_frequency: '',
        });
      });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Add a New Plant</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {['name', 'watering_frequency', 'sunlight_requirement', 'fertilizing_frequency'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2"
            required
          />
        ))}
        <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Add Plant
        </button>
      </form>
    </div>
  );
}

export default Addplant;
