import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Carelog = () => {
  const [careLogs, setCareLogs] = useState([]);
  const [logMessage, setLogMessage] = useState('');

  useEffect(() => {
    const fetchCareLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carelog');
        setCareLogs(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCareLogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const log = { message: logMessage };

    try {
      await axios.post('http://localhost:5000/api/carelog', log);
      setLogMessage('');
      alert('Log added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding log');
    }
  };

  return (
    <div>
      <h2>Plant Care Log</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={logMessage}
          onChange={(e) => setLogMessage(e.target.value)}
          placeholder="Enter care log"
        />
        <button type="submit">Add Log</button>
      </form>
      <ul>
        {careLogs.map((log, index) => (
          <li key={index}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Carelog;
