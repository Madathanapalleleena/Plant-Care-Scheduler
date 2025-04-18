import React, { useEffect, useState } from "react";
import axios from "axios";

function CareLog() {
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/carelogs")
      .then(res => setLogs(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddLog = () => {
    if (!message) return;
    axios.post("http://localhost:5000/api/carelogs", { message })
      .then(() => {
        setMessage("");
        return axios.get("http://localhost:5000/api/carelogs");
      })
      .then(res => setLogs(res.data));
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">📝 Care Log</h2>
      <div className="mb-4 flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Enter care note (e.g., Watered Hibiscus)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleAddLog}>
          Add Log
        </button>
      </div>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="bg-white p-3 rounded shadow">
            <p>{log.message}</p>
            <span className="text-gray-500 text-sm">{new Date(log.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CareLog;
