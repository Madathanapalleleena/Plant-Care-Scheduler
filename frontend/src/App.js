import React, { useState, useEffect } from "react";
import axios from "axios";

// PlantForm Component
const PlantForm = ({ formData, setFormData, onSubmit }) => (
  <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
    <input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Plant Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
    />
    <input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Watering Frequency"
      value={formData.watering_frequency}
      onChange={(e) => setFormData({ ...formData, watering_frequency: e.target.value })}
      required
    />
    <input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Sunlight Requirement"
      value={formData.sunlight_requirement}
      onChange={(e) => setFormData({ ...formData, sunlight_requirement: e.target.value })}
      required
    />
    <input
      className="w-full p-2 border border-gray-300 rounded"
      type="text"
      placeholder="Fertilizing Frequency"
      value={formData.fertilizing_frequency}
      onChange={(e) => setFormData({ ...formData, fertilizing_frequency: e.target.value })}
      required
    />
    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
      Add Plant
    </button>
  </form>
);

// PlantList Component
const PlantList = ({ plants }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
    {plants.map((plant) => (
      <div key={plant.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-400">
        <h2 className="text-xl font-semibold text-green-800">{plant.name}</h2>
        <p><strong>💧 Water:</strong> {plant.watering_frequency}</p>
        <p><strong>☀️ Sunlight:</strong> {plant.sunlight_requirement}</p>
        <p><strong>🌱 Fertilize:</strong> {plant.fertilizing_frequency}</p>
      </div>
    ))}
  </div>
);

// CareLog Component (now logs to MySQL care_logs table)
const CareLog = () => {
  const [logs, setLogs] = useState([]);
  const [logMessage, setLogMessage] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    axios
      .get("http://localhost:5000/api/carelogs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Error fetching logs:", err));
  };

  const handleLogSubmit = (e) => {
    e.preventDefault();
    if (!logMessage.trim()) return;

    axios
      .post("http://localhost:5000/api/carelogs", { message: logMessage })
      .then(() => {
        setLogMessage("");
        fetchLogs();
      })
      .catch((err) => console.error("Error adding log:", err));
  };

  return (
    <div className="mt-12 bg-green-100 p-6 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">🌿 Care Log</h2>
      <form onSubmit={handleLogSubmit} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Log a care action (e.g., Watered Tulsi)"
          value={logMessage}
          onChange={(e) => setLogMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Log</button>
      </form>
      <ul className="space-y-3">
        {logs.map((log) => (
          <li key={log.id} className="border-b pb-2">
            <p className="text-gray-800">{log.message}</p>
            <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    watering_frequency: "",
    sunlight_requirement: "",
    fertilizing_frequency: "",
  });

  // Fetch the list of plants on initial load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/plants")
      .then((res) => setPlants(res.data))
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  // Handle plant form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit new plant data
    axios
      .post("http://localhost:5000/api/plants", formData)
      .then(() => {
        setFormData({
          name: "",
          watering_frequency: "",
          sunlight_requirement: "",
          fertilizing_frequency: "",
        });
        return axios.get("http://localhost:5000/api/plants");
      })
      .then((res) => setPlants(res.data))
      .catch((err) => console.error("Error adding plant:", err));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-8">🌱 Plant Care Scheduler</h1>

      {/* Plant Form */}
      <PlantForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />

      {/* Plant List */}
      <PlantList plants={plants} />

      {/* Care Log */}
      <CareLog />
    </div>
  );
}

export default App;

